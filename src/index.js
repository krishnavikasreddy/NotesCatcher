import NotesContainer from './NotesContainer';

// TODO: this should be imported from config file
const MIN_SELCTION_SIZE = 3;
const notesContainer = new NotesContainer();
const onTextSelect = (event) => {
  event.preventDefault();
  const selection = window.getSelection();
  if (selection.toString().length > MIN_SELCTION_SIZE) {
    notesContainer.onTextSelectEnd(selection);
  }
  selection.empty();
};


document.addEventListener('mouseup', onTextSelect, false);