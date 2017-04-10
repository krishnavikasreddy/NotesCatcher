// Note - each note in a webpage
import defaultNoteStyle from './configs/notes';
import * as DOM from './utils/DOMUtils';

class Note {
  constructor(follower, selection) {
    this.rangeAttributes = Note.saveRangeAttributes(selection);
    this.textRanges = [];
    this.style = defaultNoteStyle;
    this.follower = follower;
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
    // TODO : Test this in IE, for I doubt if polyfill supports this
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
  getColoringDOMElement(elementType) {
    const spanElement = DOM.createElement(elementType);
    DOM.changeElementStyle(spanElement, defaultNoteStyle);
    this.getText();
    DOM.addEvent(spanElement,
                 'mouseenter',
                 event => this.follower.onMoseOver(event, spanElement.getClientRects()), false);
    DOM.addEvent(spanElement,
                 'mouseleave',
                 event => this.follower.onMouseLeave(event, spanElement.getClientRects()), false);
    return spanElement;
  }
}

export default Note;

