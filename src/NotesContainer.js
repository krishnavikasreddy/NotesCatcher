import Note from './Note';

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
    let endNode = focusNode;
    if (NotesContainer.isSelectionBackward(selection)) {
      currentNode = focusNode;
      endNode = anchorNode;
    }
    const selectedNodes = [];
    while (currentNode !== endNode) {
      if (currentNode.nodeType === 3 && currentNode.nodeValue.trim() !== '') {
        selectedNodes.push(currentNode);
      }
      if (currentNode.firstChild) {
        currentNode = currentNode.firstChild;
      } else if (currentNode.nextSibling) {
        currentNode = currentNode.nextSibling;
      } else {
        currentNode = currentNode.parentElement.nextSibling;
      }
    }
    selectedNodes.push(endNode);
    return selectedNodes;
  }

  assignRangesToSelectedNodes(selectedNodes, selection) {
    const { anchorNode,
            focusNode,
            anchorOffset,
            focusOffset } = selection;
    const note = new Note();
    const isSelectionBackward = NotesContainer.isSelectionBackward(selection);
    selectedNodes.forEach((node) => {
      const range = document.createRange();
      if (node === anchorNode && node === focusNode) {
        if (isSelectionBackward) {
          range.setStart(node, focusOffset);
          range.setEnd(node, anchorOffset);
        } else {
          range.setStart(node, anchorOffset);
          range.setEnd(node, focusOffset);
        }
      } else if (node === anchorNode) {
        if (isSelectionBackward) {
          range.setStart(node, 1);
          range.setEnd(node, anchorOffset);
        } else {
          range.setStart(node, anchorOffset);
          range.setEnd(node, node.length);
        }
      } else if (node === focusNode) {
        if (isSelectionBackward) {
          range.setStart(node, focusOffset);
          range.setEnd(node, node.length);
        } else {
          range.setStart(node, 1);
          range.setEnd(node, focusOffset);
        }
      } else {
        range.setStart(node, 1);
        range.setEnd(node, node.length);
      }
      note.addRange(range);
    });
    note.colorRanges();
    this.Notes.push(note);
  }

  onTextSelectEnd(selection) {
    this.assignRangesToSelectedNodes(
      this.constructor.extractAllSelectedNodes(selection), selection);
  }
  static isSelectionBackward(selection) {
    const comparedPosition = selection.anchorNode
          .compareDocumentPosition(selection.focusNode);
    if (comparedPosition === 2) {
      return true;
    } else if (comparedPosition === 0) {
      return selection.anchorOffset > selection.focusOffset;
    }
    return false;
  }
}
