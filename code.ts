if (figma.editorType === 'figma') {
  
  figma.showUI(__html__, { themeColors: true, width: 480, height: 270 });

  // Send my current selection to the UI

  figma.on('selectionchange', () => {

    let selection = []

    for (const node of figma.currentPage.selection) {
      selection.push(node.name);
      console.log('from code.ts, node from for statement ', node)
    }

    console.log('from code.ts, selection array ', selection[0])

    figma.ui.postMessage({selection})

  })

  // figma.closePlugin();

} else {
  
  figma.showUI(__html__, { themeColors: true, width: 240, height: 400 })
  
  // figma.closePlugin();
};
