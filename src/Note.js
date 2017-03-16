// Note - each note in a webpage
import defaultNoteStyle from './configs/notes';

class Note {
  constructor() {
    this.noteRange = [];
    this.style = defaultNoteStyle;
    // this.spanElement.setAttribute('style', textGreen.toString());
  }
  changeStyle(style) {
    this.style = style;
  }
  addRange(noteRange) {
    this.noteRange.push(noteRange);
  }
  getText() {
    return this.noteText;
  }
  colorRanges() {
    this.noteRange.forEach((range) => {
      range.surroundContents(Note.getColoringDOMElement());
    });
  }
  static getColoringDOMElement() {
    const spanElement = document.createElement('span');
    // TODO: convert this into a config
    spanElement.setAttribute('style', 'background:green;color:white;');
    return spanElement;
  }
}

export default Note;
