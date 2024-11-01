import Globals from "./globals.js";
import Color from "./utilities/color.js";
import Coroutine from "./utilities/coroutine.js";

let count = 0;
let counter = null;

let digits = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
let previous = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

const size = 16;

const center = 
{
	x: 640,
	y: 640,
}

let colors = [
	"#2e4272",
	"#aa7d39",
	"#549431",
	"#4f2c73",
	"#aa3939",
	"#aaaa39",
	"#061539",
	"#553300",
	"#1a4a00",
	"#1f0439",
	"#550000",
	"#555500",
];

export function add(runtime, n=1)
{
	if (n > 0)
	{
		for (let i = 0; i < n; i++)
		{
			increment(runtime);
		}
	}
	// else if n < 0 decrement
}

function addBall(runtime)
{
	count += 1;
	const ball = runtime.objects.Single.createInstance("Balls", 640, 640);
	
	ball.setSize(0, 0);
	ball.behaviors.Tween.startTween("size", [size, size], 0.5, "out-sine");
	ball.colorRgb = Color.RGB(colors[0]);
}

function increment(runtime)
{
	addBall(runtime);
	
	checkDigits(runtime);
}

function checkDigits(runtime)
{
	// Convert the number into an array of digits
	let places = 0;
	let comparison = 1;
	let number = count;
	for (let i = digits.length - 1; i >= 0; i--)
	{
		if (count >= comparison)
		{
			places += 1;
			comparison *= 10;
			
			digits[i] = number % 10;
			number = Math.floor(number / 10);
		}
		else
		{
			break;
		}
	}
	console.log(digits, places, previous);
	
	// Update the counter
	if (!counter) counter = runtime.objects.SpriteFont.getFirstInstance();
	
	let string = "";
	for (let i = 0; i < places; i++)
	{
		string = "[/color]" + string;
		string = String( digits[digits.length - i - 1] ) + string;
		string = "[color=" + colors[i] + "]" + string;
	}
	counter.text = string;
	
	// Check for powers of 10
	let power = 0;
	for (let i = digits.length - 2; i >=0; i--)
	{
		power++;
		if (digits[i] > previous[i])
		{			
			new Coroutine(assembleTen(runtime, power));
		}
	}
	
		
	// Store digits
	for (let i = 0; i < digits.length; i++)
	{
		previous[i] = digits[i];
	}
}

function* assembleTen(runtime, power) 
{
	// How long the assembly takes
	const time = 0.1;
	
	// Built out of singles
	const singles = runtime.objects.Single.getAllInstances();
	
	// Which objects to assemble
	//const n = digits[i];
	const n = count;
	
	let interval = 1;
	for (let i = 0; i < power; i++) { interval *= 10};
	
	const first = n - interval;
	const last = n - 1;
			
	// How to assemble them
	const r = Math.floor(power / 2);
	const c = r + (power % 2);
	
	let rows = 1, cols = 1;
	for (let i = 0; i < r; i++) rows *= 10;
	for (let i = 0; i < c; i++) cols *= 10;
	
	let y = center.y - (rows/2 - 0.5) * size;
	let x = center.x - (cols/2 - 0.5) * size;
	
	for (let i = 0; i < rows; i++)
	{
		x = center.x - (cols/2 - 0.5) * size;
		for (let j = 0; j < cols; j++)
		{
			const index = i * 10 + j + first;
			singles[index].behaviors.Physics.isEnabled = false;
			singles[index].behaviors.Tween.startTween("position", [x, y], time, "linear");
			x += size;
		}
		y += size;
	}
	
	yield Coroutine.Wait(time);
		
	for (let i = first; i <= last; i++)
	{
		singles[i].behaviors.Physics.isEnabled = true;
		singles[i].colorRgb = Color.RGB(colors[power]);
	}
	
	return;
}