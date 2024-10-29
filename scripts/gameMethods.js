import Globals from "./globals.js";

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

export function increment(runtime)
{
	count += 1;
	
	
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
	console.log(digits, places);
	
	
	
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
	
	if (!counter) counter = runtime.objects.SpriteFont.getFirstInstance();
	
	
	let string = "";
	for (let i = 0; i < places; i++)
	{
		string = "[/color]" + string;
		string = String( digits[digits.length - i - 1] ) + string;
		string = "[color=" + colors[i] + "]" + string;
	}
	counter.text = string;
	
	previous = digits;
}