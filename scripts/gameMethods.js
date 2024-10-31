import Globals from "./globals.js";
import Color from "./utilities/color.js";
import Coroutine from "./utilities/coroutine.js";

let count = 0;
let counter = null;

let digits = [0, 0, 0, 0, 0, 0];
let previous = [0, 0, 0, 0, 0, 0];

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
		
	// Check for 10s
	if (digits[4] > previous[4])
	{
		console.log("ten!");
		new Coroutine(assembleTen(runtime), "ten");
	}
	
	// Check for 100s
	if (digits[3] > previous[3])
	{
		console.log("hundred!");
		//new Coroutine(assembleTen(runtime), "ten");
	}
		
	// Store digits
	for (let i = 0; i < digits.length; i++)
	{
		previous[i] = digits[i];
	}
}

function* assembleTen(runtime)
{
	const singles = runtime.objects.Single.getAllInstances();
	console.log(singles);
	
	const time = 0.25;
	
	let y = center.y;
	let x = center.x - 4.5 * size;
	for (let i = 0; i < 10; i++)
	{
		singles[i].behaviors.Physics.isEnabled = false;
		singles[i].behaviors.Tween.startTween("position", [x, y], time, "linear");
		x += size;
	}
	yield Coroutine.Wait(time);
	
	x = center.x;
	for (let i = 0; i < 10; i++)
	{
		singles[i].destroy();
	}
	const ten = runtime.objects.Ten.createInstance("Balls", x, y);
	ten.colorRgb = Color.RGB(colors[1]);
	
	return;
}