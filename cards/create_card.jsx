function centerLayer(doc, layer, top) {


    var layerWidth = layer.bounds[2].as("px") - layer.bounds[0].as("px"); // right - left
    var docWidth = doc.width.as("px");

    // Current position
    var currentTop = layer.bounds[1].as("px");
    var currentLeft = layer.bounds[0].as("px");

    // Target positions
    var targetX = (docWidth - layerWidth) / 2 - currentLeft; // horizontal offset
    var targetY = top.as("px") - currentTop; 

    // Move the layer
    var originalUnits = app.preferences.rulerUnits;
    app.preferences.rulerUnits = Units.PIXELS;
    layer.translate(targetX, targetY);
    app.preferences.rulerUnits = originalUnits;
}

function resize(doc, layer, width, height){
    // Assume 'layer' is your layer variable
    // targetWidth and targetHeight are in pixels

    // Get current layer size
    var layerWidth  = layer.bounds[2].as("px") - layer.bounds[0].as("px");
    var layerHeight = layer.bounds[3].as("px") - layer.bounds[1].as("px");

    // Calculate scale in percent
    var scaleX = (width.as("px")  / layerWidth)  * 100;
    var scaleY = (height.as("px") / layerHeight) * 100;


    // Resize layer
    layer.resize(scaleX, scaleY); // width %, height %
}

function loadScript(script){
    // Get the current script folder
    var currentFolder = new File($.fileName).parent;

    var scriptPath = new File(currentFolder.fsName + "/" + script);
    // Run it
    if (scriptPath.exists) {
        return scriptPath;
    } else {
        alert("Script not found: " + scriptPath.fsName);
    }
}

function create_card_layout(doc, name, front, back, width, height, top, pDoc){
    if(pDoc === undefined){
        
        $.global.runTaskCaller = true;
        $.evalFile(loadScript("../misc/create_photostd.jsx"));
        delete $.global.runTaskCaller;
        
        pdoc = create_doc(doc.name + "-Card");
    }

    
    // Duplicate layer into destination document
    app.activeDocument = doc;
    doc.activeLayer = back;
    dupBackLayer = back.duplicate(pdoc, ElementPlacement.PLACEATBEGINNING);

    app.activeDocument = doc;
    doc.activeLayer = front;
    dupFrontLayer = front.duplicate(pdoc, ElementPlacement.PLACEATBEGINNING);    

    app.activeDocument = pdoc;
    resize(pdoc, dupFrontLayer, width, height);
    centerLayer(pdoc, dupFrontLayer, top);

    resize(pdoc, dupBackLayer, width, height);
    centerLayer(pdoc, dupBackLayer, top);

    // Create a new group (LayerSet)
    var group = pdoc.layerSets.add();
    group.name = name;

    return pdoc;
}

// // Only run automatically if not included as a function
// if (typeof runTaskCaller === "undefined") {
//     try {
//         var frontLayer = doc.artLayers.getByName("CARD_FRONT");
//         var backLayer = doc.backLayers.getByName("CARD_BACK");
        
//         create_card_layout(app.activeDocument, frontLayer, backLayer); // Default: run directly
//         alert("New document created:\n" +
//             paperWidthMM + "x" + paperHeightMM + " mm\n" +
//             "Resolution: " + resolutionPPI + " PPI\n" +
//             "Center guides added.");
//     } catch (e) {
//         alert("Layer(s) not found, name: CARD_FRONT; CARD_BACK");
//     }
// }

