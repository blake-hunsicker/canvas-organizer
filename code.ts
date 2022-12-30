interface SelectedNodeData {
  id: string;
  name: string;
  height: number;
  width: number;
  x: number;
  y: number;
}

if (figma.editorType === 'figma') {
  
  figma.showUI(__html__, { themeColors: true, width: 480, height: 270 });

  // Send my current selection to the UI

  figma.on('selectionchange', () => {

    let selection = []
    

    for (const node of figma.currentPage.selection) {
      let selectedNode: SelectedNodeData = {
        id: node.id,
        name: node.name,
        height: node.height,
        width: node.width,
        x: node.x,
        y: node.y,
      }

      selection.push(selectedNode);
      console.log('from code.ts, selectedNode from for statement ', selectedNode)
    }

    // console.log('from code.ts, selection array ', selection[0])

    figma.ui.postMessage({selection})

  })

  // figma.closePlugin();

} else {
  
  figma.showUI(__html__, { themeColors: true, width: 240, height: 400 })
  
  // figma.closePlugin();
};
