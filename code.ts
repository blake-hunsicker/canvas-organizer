if (figma.editorType === 'figma') {
  
  figma.showUI(__html__, { themeColors: true, width: 480, height: 270 });

  // Send my current selection to the UI

  figma.on('selectionchange', () => {

    let selection = []

    for (const node of figma.currentPage.selection) {
      selection.push(node);
    }

    figma.ui.postMessage({selection})

  })

  // figma.closePlugin();

} else {
  
  figma.showUI(__html__, { themeColors: true, width: 240, height: 400 })
  
  // figma.closePlugin();
};
