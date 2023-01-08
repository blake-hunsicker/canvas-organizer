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

    const mapConfig = msg.mapConfig
    const nodesAndSpaces = msg.nodesAndSpaces
    
    let i
    for (i = 0; i <= nodesAndSpaces.length - 1; i++) {
      const node = nodesAndSpaces[i]
      const nodeID = nodesAndSpaces[i].nodeID
      const nodeToMove = figma.getNodeById(nodeID)!
      console.log('node to move: ', nodeToMove)
      
      if (nodeToMove.type === 'DOCUMENT' || nodeToMove.type === 'PAGE') { return }

      if (mapConfig.flowDirection === 'row') {

        // 🗺 If direction = row

        // Set all nodes' Y coordinates (for v1, they are all the same)
        nodeToMove.y = mapConfig.yCoordinate

        // Set every node's X coordinate, depending on order
        if (i === 0) {
          // If it's the first node, set its X to 0 or whatever the user chooses
          nodeToMove.x = mapConfig.xCoordinate
        } else {
          // If its not the first node, then treat it normally
          const prevNumber = i - 1
          const prevNodeCount = nodesAndSpaces[prevNumber]
          const prevNodeID = nodesAndSpaces[prevNumber].nodeID
          const prevNode = figma.getNodeById(prevNodeID)!

          if (prevNode.type === 'DOCUMENT' || prevNode.type === 'PAGE') { return }

          nodeToMove.x = prevNode.x + prevNode.width + nodesAndSpaces[i-1].space

        }
      } else {
        
        // 🗺 if direction = column

        // Set all nodes' X coordinates (for v1, they are all the same)
        nodeToMove.x = mapConfig.xCoordinate

        // Set every node's X coordinate, depending on order
        if (i === 0) {
          // If it's the first node, set its X to 0 or whatever the user chooses
          nodeToMove.y = mapConfig.yCoordinate
        } else {
          // If its not the first node, then treat it normally
          const prevNumber = i - 1
          const prevNodeCount = nodesAndSpaces[prevNumber]
          const prevNodeID = nodesAndSpaces[prevNumber].nodeID
          const prevNode = figma.getNodeById(prevNodeID)!

          if (prevNode.type === 'DOCUMENT' || prevNode.type === 'PAGE') { return }

          nodeToMove.y = prevNode.y + prevNode.height + nodesAndSpaces[i-1].space

        }

      }
    }

  }

  // figma.closePlugin();

} else {
  
  figma.showUI(__html__, { themeColors: true, width: 240, height: 400 })
  
  // figma.closePlugin();
};
