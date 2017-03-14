import { Note } from './Note';

export default class NotesContainer {
  constructor() {
    this.Notes = [];
  }

  static onTextSelectStart() {
    // Should Some thing come up
  }

  // Start from the anchorNode
  // Recurse till the focusNode
  // While identifying all the textNodes in the process
  static extractAllSelectedNodes(selection) {
    const { anchorNode,
            focusNode } = selection;
    let currentNode = anchorNode;
    const selectedNodes = [anchorNode];
    while (currentNode !== focusNode) {
      console.log(currentNode);
      currentNode = currentNode.nextSibling;
      selectedNodes.push(currentNode);
    }
    return selectedNodes;
  }

  assignRangesToSelectedNodes(selectedNodes, selection) {
    const { anchorNode,
            focusNode,
            anchorOffset,
            focusOffset } = selection;
    selectedNodes.forEach((node) => {
      const range = document.createRange();
      if (node === anchorNode && node === focusNode) {
        range.setStart(anchorOffset);
        range.setEnd(focusOffset);
      } else if (node === anchorNode) {
        range.setStart(anchorOffset);
        range.setEnd(node.length);
      } else if (node === focusNode) {
        range.setStart(1);
        range.setEnd(focusOffset);
      } else {
        range.setStart(1);
        range.setEnd(node.length);
      }
      this.Notes.push(new Note(range));
    });
  }

  static onTextSelectEnd(selection) {
    this.assignRangesToSelectedNodes(this.extractAllSelectedNodes(selection), selection);
    console.log(this.Notes);
  }
}
