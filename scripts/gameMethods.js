import Globals from "./globals.js";
import Color from "./utilities/color.js";

let count = 0;
let counter = null;

let digits = [0, 0, 0, 0, 0, 0];
let previous = [0, 0, 0, 0, 0, 0];

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
	ball.behaviors.Tween.startTween("size", [16, 16], 0.5, "out-sine");
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
	
	
	
	// TODO check for tens etc.
	
	// check for tens
	if (digits[4] > previous[4])
	{
		console.log("ten!");
		assembleTen(runtime);
	}
	
	
	// Store digits
	for (let i = 0; i < digits.length; i++)
	{
		previous[i] = digits[i];
	}
	
	/*
	if (count % 10 == 0)
	{
		const tens = Math.floor(count / 10) - 1;
		
		const balls = runtime.objects.Ball.getAllInstances();
		for (let i = 0; i < 9; i++)
		{
			balls[i + tens*10].setPosition(300+Globals.size*i, 100);
			balls[i + tens*10 + 1].setPosition(300+Globals.size*(i+1), 100);
			balls[i + tens*10].behaviors.Physics.createDistanceJoint(-1, balls[i + tens*10 + 1], -1, 1, 100);
		}
		//balls[tens*10].setPosition(300+Globals.size, 100);
		//balls[9 + tens*10].setPosition(300+Globals.size, 100+Globals.size);
		//balls[tens*10].behaviors.Physics.createDistanceJoint(-1, balls[9 + tens*10], -1, 1, 100);
	}
	
	
	*/
}

function assembleTen(runtime)
{
	
}