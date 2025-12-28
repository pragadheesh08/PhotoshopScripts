const front_selection = [
    [UnitValue(14, "px"), UnitValue(1946, "px")],   // top-left
    [UnitValue(1064, "px"), UnitValue(1946, "px")], // top-right
    [UnitValue(1064, "px"), UnitValue(2615, "px")], // bottom-right
    [UnitValue(14, "px"), UnitValue(2615, "px")]    // bottom-left
];

const back_selection = [
    [UnitValue(1107, "px"), UnitValue(1946, "px")],   // top-left
    [UnitValue(2157, "px"), UnitValue(1946, "px")], // top-right
    [UnitValue(2157, "px"), UnitValue(2615, "px")], // bottom-right
    [UnitValue(1107, "px"), UnitValue(2615, "px")]    // bottom-left
];

// Get the current script folder
var currentFolder = new File($.fileName).parent;

var utilsScript = new File(currentFolder.fsName + "/../utils/selection.jsx");
// Run it
if (utilsScript.exists) {
    $.evalFile(utilsScript);
} else {
    alert("Script not found: " + utilsScript.fsName);
}

function crop_eaadhar(doc){
    // Define the selection bounds as corner points: [top-left, top-right, bottom-right, bottom-left]
    var bgLayer = doc.activeLayer;
    
    selectionBounds = front_selection;
    frontLayer = crop_selection_to_layer(doc, selectionBounds);
    frontLayer.name = "CARD_FRONT";
    doc.activeLayer = bgLayer;
    
    var selectionBounds = back_selection;
    backLayer = crop_selection_to_layer(doc, selectionBounds);
    backLayer.name = "CARD_BACK";
    doc.activeLayer = bgLayer;
}

if (typeof runTaskCaller === "undefined") {
    // Ensure a document is open
    if (app.documents.length === 0) {
        alert("No document open.");
    } else {
        var doc = app.activeDocument;
        crop_eaadhar(doc);
        alert("Done!");
    }
}