// Note - each note in a webpage
import { defaultNoteStyle } from 'configs/notes';
import * as DOM from 'utils/DOMUtils';

const noteText = 'notes_';

const styles = {
  red: {
    background: 'red',
    color: '#ffffff',
  },
  green: {
    background: 'green',
    color: '#ffffff',
  },
  blue: {
    background: 'blue',
    color: '#ffffff',
  },
  yellow: {
    background: 'yellow',
    color: '#000000',
  },
};

class Note {

  constructor(noteId, noteFollower, selection) {
    this.noteId = noteId;
    this.rangeAttributes = Note.saveRangeAttributes(selection);
    this.textRanges = [];
    this.style = defaultNoteStyle;
    this.noteFollower = noteFollower;
    this.follower = noteFollower.follower;
    this.mouseOverSeamaphore = false;
    this.mouseLeaveSeamaphore = false;
    this.mouseOverTimer = false;
    this.mouseLeaveTimer = false;
    this.currentColor = 'green';
  }

  static saveRangeAttributes(selection) {
    const { anchorNode,
            focusNode,
            anchorOffset,
            focusOffset } = selection;
    const clientRect = selection.getRangeAt(0).getBoundingClientRect();
    return {
      anchorNode,
      focusNode,
      anchorOffset,
      focusOffset,
      clientRect,
    };
  }

  getRange() {
    if (this.textRanges.length === 0) {
      return undefined;
    } else if (this.textRanges.length === 1) {
      return this.textRanges[0];
    }
    const range = document.createRange();
    range.setStart(this.textRanges[0].startContainer,
                   this.textRanges[0].startOffset);
    range.setEnd(this.textRanges[this.textRanges.length - 1].endContainer,
                 this.textRanges[this.textRanges.length - 1].endOffset);
    return range;
  }

  static changeStyle(element, style) {
    Object.assign(element.style, style);
  }

  addRange(noteRange) {
    this.textRanges.push(noteRange);
  }

  getText() {
    return this.noteText;
  }

  colorRanges() {
    this.textRanges.forEach((range) => {
      range.surroundContents(this.getColoringDOMElement('span'));
    });
  }

  unColorRanges() {
    this.textRanges.forEach((range) => {
      const textNode = range.extractContents().childNode.childNode;
      range.insertNode(textNode);
    });
  }

  changeColor = (color) => {
    const elements = document.getElementsByClassName(noteText + this.noteId);
    for (let i = 0; i < elements.length; i += 1) {
      Object.assign(elements[i].style, styles[color]);
    }
    this.currentColor = color;
  }

  // these needs some refactoring
  onMouseEnter = (event) => {
    if (!this.mouseOverTimer) {
      setTimeout(() => {
        if (!this.mouseLeaveSeamaphore && this.noteFollower.isHidden()) {
          this.noteFollower.setCurrentNote(this);
          this.noteFollower.setStyle({ top: event.clientY, left: event.clientX });
          this.noteFollower.showFollower();
        }
        this.mouseOverTimer = false;
      }, 500);
      this.mouseOverTimer = true;
    }
    this.mouseOverSeamaphore = true;
    this.mouseLeaveSeamaphore = false;
  }

  onMouseLeave = () => {
    if (!this.mouseLeaveTimer) {
      setTimeout(() => {
        if (!this.mouseOverSeamaphore && !this.noteFollower.isMouseIn()) {
          this.noteFollower.hideFollower();
        } else if (this.noteFollower.isMouseIn()) {
          this.noteFollower.setMouseLeave(this.onMouseLeave);
        }
        this.mouseLeaveTimer = false;
      }, 500);
      this.mouseLeaveTimer = true;
    }
    this.mouseLeaveSeamaphore = true;
    this.mouseOverSeamaphore = false;
  }

  getColoringDOMElement(elementType) {
    const spanElement = DOM.createElement(elementType);
    spanElement.setAttribute('class', noteText + this.noteId);
    DOM.changeElementStyle(spanElement, defaultNoteStyle);
    DOM.addEvent(spanElement, 'mouseenter', this.onMouseEnter);
    DOM.addEvent(spanElement, 'mouseleave', this.onMouseLeave);
    return spanElement;
  }
}

export default Note;
