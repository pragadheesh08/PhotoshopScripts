
// Card size in millimeters (4x6 inch paper)
const cardWidthMM = 82.04;   // Width in mm
const cardHeightMM = 52.4;  // Height in mm

const topCardY = 140;  // Height in px
const bottomCardY = 1000;  // Height in px

const resolutionPPI = 300;

// Conversions

function mmToPx(mm, ppi) {
    return mm * (ppi / 25.4);
}

const widthPx = mmToPx(cardWidthMM, resolutionPPI);
const heightPx = mmToPx(cardHeightMM, resolutionPPI);


/**
 * MAIN
 */

$.evalFile(new File($.fileName).parent + "/crop_eaadhar.jsx");

$.evalFile(new File($.fileName).parent + "/create_card.jsx");
doc = app.activeDocument;
crop_eaadhar(doc);

var frontLayer = doc.artLayers.getByName("CARD_FRONT");
var backLayer = doc.artLayers.getByName("CARD_BACK");

var pdoc = create_card_layout(
    doc, 
    "EAADHAR-1",
    frontLayer,
    backLayer,
    UnitValue(widthPx, "px"),
    UnitValue(heightPx, "px"),
    UnitValue(topCardY, "px"),
);

create_card_layout(
    doc, 
    "EAADHAR-2",
    frontLayer,
    backLayer,
    UnitValue(widthPx, "px"),
    UnitValue(widthPx, "px"),
    UnitValue(bottomCardY, "px"),
    pdoc,
);
