// === CONFIGURATION ===
// Paper size in millimeters (4x6 inch paper)
const paperWidthMM = 101.6;   // Width in mm
const paperHeightMM = 152.4;  // Height in mm
const resolutionPPI = 300;  // Print resolution (high-quality)

// Color mode for printing
// Options: NewDocumentMode.RGB, CMYK, GRAYSCALE
const colorMode = NewDocumentMode.CMYK;

// Background contents: TRANSPARENT, WHITE, BACKGROUNDCOLOR
const bgContents = DocumentFill.WHITE;

// === CONVERSION ===
// Convert mm to pixels based on resolution
function mmToPx(mm, ppi) {
    return mm * (ppi / 25.4);
}

const widthPx = mmToPx(paperWidthMM, resolutionPPI);
const heightPx = mmToPx(paperHeightMM, resolutionPPI);

// === CREATE NEW DOCUMENT ===

function create_doc(name){
    var doc = app.documents.add(
        new UnitValue(widthPx, "px"),          // Width in pixels
        new UnitValue(heightPx, "px"),         // Height in pixels
        resolutionPPI,    // Resolution
        name, // Name
        colorMode,
        bgContents
    );
    
    // === SETUP RULERS & GUIDES ===
    var originalUnits = app.preferences.rulerUnits;

    // Set ruler units to millimeters
    app.preferences.rulerUnits = Units.PIXELS;

    // Add horizontal and vertical center guides
    doc.guides.add(Direction.HORIZONTAL, new UnitValue(heightPx / 2, "px"));
    guide = doc.guides.add(Direction.VERTICAL, new UnitValue(widthPx / 2, "px"));

    //revert
    app.preferences.rulerUnits = originalUnits;

    return doc;
}

// Only run automatically if not included as a function
if (typeof runTaskCaller === "undefined") {
    create_doc("Untitled-P1"); // Default: run directly
    alert("New document created:\n" +
        paperWidthMM + "x" + paperHeightMM + " mm\n" +
        "Resolution: " + resolutionPPI + " PPI\n" +
        "Center guides added.");        
}