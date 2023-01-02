interface SelectedNodeData {
  id: string;
  type: string;
  name: string;
  height: number;
  width: number;
  x: number;
  y: number;
}

if (figma.editorType === 'figma') {
  
  figma.showUI(__html__, { themeColors: true, width: 960, height: 540 });

  // Send my current selection to the UI

  figma.on('selectionchange', () => {

    let selection = []
    

    for (const node of figma.currentPage.selection) {
      console.log('from code.ts we have ', node)
      let selectedNode: SelectedNodeData = {
        id: node.id,
        type: node.type,
        name: node.name,
        height: node.height,
        width: node.width,
        x: node.x,
        y: node.y,
      }

      selection.push(selectedNode);
    }

    // console.log('from code.ts, selection array ', selection[0])

    figma.ui.postMessage({selection})

  })

  // figma.closePlugin();

} else {
  
  figma.showUI(__html__, { themeColors: true, width: 240, height: 400 })
  
  // figma.closePlugin();
};
