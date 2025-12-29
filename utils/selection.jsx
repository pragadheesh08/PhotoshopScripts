function crop_selection_to_layer(doc, selectionBounds) {
    doc.selection.deselect();
    
    // Select the area
    app.activeDocument.selection.select(selectionBounds);
    
    // Make the selection
    doc.selection.select(selectionBounds);
    
    // Cut the selection0
    doc.selection.cut();
    
    // Paste as a new layer
    newLayer = doc.paste();
    
    // Optional: clear selection
    doc.selection.deselect();
    
    return newLayer;
}