// Note - each note in a webpage
import { defaultNoteStyle } from './configs/notes';

class Note {
  constructor(noteRange) {
    this.noteRange = noteRange;
    this.style = defaultNoteStyle;
  }
  changeStyle(style) {
    this.style = style;
  }
  getText() {
    return this.noteText;
  }
}

export default Note;
