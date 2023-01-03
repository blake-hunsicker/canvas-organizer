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
    
    figma.ui.postMessage({selection})

  })

  // Receive message from plugin
  figma.ui.onmessage = msg => {
  
    console.log('message received: ', msg)
    
    let i
    for (i = 0; i <= msg.length - 1; i++) {
      const node = msg[i]
      const nodeID = msg[i].nodeID
      const nodeToMove = figma.getNodeById(nodeID)!
      console.log('node to move: ', nodeToMove)
      if (nodeToMove.type === 'DOCUMENT' || nodeToMove.type === 'PAGE') { return }

      // Set all nodes' Y coordinates (for v1, they are all the same)
      nodeToMove.y = 0

      // Set every node's X coordinate, depending on order
      if (i === 0) {
        // If it's the first node, set its X to 0 or whatever the user chooses
        nodeToMove.x = 0
      } else {
        // If its not the first node, then treat it normally
        const prevNumber = i - 1
        const prevNodeCount = msg[prevNumber]
        const prevNodeID = msg[prevNumber].nodeID
        const prevNode = figma.getNodeById(prevNodeID)!

        if (prevNode.type === 'DOCUMENT' || prevNode.type === 'PAGE') { return }

        nodeToMove.x = prevNode.x + prevNode.width + msg[i-1].space

      }
    }

  }

  // figma.closePlugin();

} else {
  
  figma.showUI(__html__, { themeColors: true, width: 240, height: 400 })
  
  // figma.closePlugin();
};
