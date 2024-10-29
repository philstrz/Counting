
// Import any other script files here, e.g.:
// import * as myModule from "./mymodule.js";
import Globals from "./globals.js";

runOnStartup(async runtime =>
{
	// Code to run on the loading screen.
	// Note layouts, objects etc. are not yet available.
	
	// Disabled for now
	//runtime.addEventListener("beforeprojectstart", () => OnBeforeProjectStart(runtime));
	
	// Add viewport dimensions to globals
	Globals.viewport.width = runtime.viewportWidth;
	Globals.viewport.height = runtime.viewportHeight;
	
	// Stop the browser from scrolling away
	window.addEventListener("keydown", function(e) { if(["Space","ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) { e.preventDefault(); } }, false); 
});

async function OnBeforeProjectStart(runtime)
{
	// Code to run just before 'On start of layout' on
	// the first layout. Loading has finished and initial
	// instances are created and available to use here.
	runtime.addEventListener("tick", () => Tick(runtime));
	
	// Get all layouts
	for (const layout of runtime.getAllLayouts())
	{
		// Skip the Loader and Title layout
		if (layout.name === "Loader") continue;
		if (layout.name === "Title") continue;
		
		// Add a function before every layout starts
		layout.addEventListener("beforelayoutstart", ()=> OnBeforeLayoutStart(runtime));

		// Add a function at the start of every layout
		layout.addEventListener("afterlayoutstart", ()=> OnLayoutStart(runtime));	

	}
	
}

// Every tick
function Tick(runtime)
{
	
}

// Before the layout starts
function OnBeforeLayoutStart(runtime)
{
	
}

// When layout starts
function OnLayoutStart(runtime)
{
	
}