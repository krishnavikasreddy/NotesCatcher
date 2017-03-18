// Note - each note in a webpage
import defaultNoteStyle from './configs/notes';

class Note {
  constructor() {
    this.textRanges = [];
    this.style = defaultNoteStyle;
    // this.spanElement.setAttribute('style', textGreen.toString());
  }
  static saveRangeAttributes(selection) {
    const { anchorNode,
            focusNode,
            anchorOffset,
            focusOffset } = selection;
    return {
      anchorNode,
      focusNode,
      anchorOffset,
      focusOffset };
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
  changeStyle(style) {
    this.style = style;
  }
  addRange(noteRange) {
    this.textRanges.push(noteRange);
  }
  getText() {
    return this.noteText;
  }
  colorRanges() {
    this.textRanges.forEach((range) => {
      range.surroundContents(Note.getColoringDOMElement());
    });
  }
  static getColoringDOMElement() {
    const spanElement = document.createElement('span');
    // TODO: convert this into a config
    spanElement.setAttribute('style', 'background:green;coloqr:white;');
    return spanElement;
  }
}

export default Note;
