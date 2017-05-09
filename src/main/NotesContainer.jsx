import Note from 'main/Note';
import NotesFollower from 'main/NoteFollower';

import React from 'react';
import ReactDom from 'react-dom';

const entryElement = () => {
  const element = document.createElement('div');
  element.setAttribute('id', 'note-catcher');
  document.getElementsByTagName('body')[0].appendChild(element);
};

export default class NotesContainer {
  constructor() {
    this.Notes = [];
    entryElement();
    this.notesFollower =
      ReactDom.render(
        <NotesFollower
          onNoteRemove={this.noteRemove}
        />,
        document.getElementById('note-catcher'));
  }

  static onTextSelectStart() {
    // Should Some thing come up
  }

  doesSelectionCollides(selection) {
    const givenRange = selection.getRangeAt(0);
    const collision = (note) => {
      const noteRange = note.getRange();
      const startToStart = givenRange.compareBoundaryPoints(
        Range.START_TO_START, noteRange);
      const endToEnd = givenRange.compareBoundaryPoints(
        Range.END_TO_END, noteRange);
      const startToEnd = givenRange.compareBoundaryPoints(
        Range.START_TO_END, noteRange);
      const endToStart = givenRange.compareBoundaryPoints(
        Range.END_TO_START, noteRange);
      // Array.some evaluates for truthy condition
      // In this case we need to know if any one of them is failing
      // so reverse the boolean
      return !(startToStart === startToEnd
               && endToStart === endToEnd
               && startToStart === endToStart
               && startToEnd === endToEnd);
    };
    if (this.Notes.length > 0) {
      return !this.Notes.some(collision);
    }
    return true;
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
    const note = new Note(this.Notes.length,
                          this.notesFollower,
                          selection);
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
    if (this.doesSelectionCollides(selection)) {
      this.assignRangesToSelectedNodes(
        this.constructor.extractAllSelectedNodes(selection), selection);
    }
  }

  removeNote = (noteId) => {
    delete this.Notes[noteId];
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
