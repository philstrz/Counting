

export default class Color
{
	// Convert 6-digit hexadecimal string to 3 numbers in [0,1]
	static RGB(string)
	{
		let r = string.slice(1, 3);
		let g = string.slice(3, 5);
		let b = string.slice(5, 7);

		r = parseInt(r, 16);
		g = parseInt(g, 16);
		b = parseInt(b, 16);

		r /= 255;
		g /= 255;
		b /= 255;

		return [r, g, b];
	}
}