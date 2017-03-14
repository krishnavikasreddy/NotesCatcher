import NotesContainer from './NotesContainer';

// TODO: this should be imported from config file
const MIN_SELCTION_SIZE = 3;

const onTextSelect = (event) => {
  event.preventDefault();
  const selection = window.getSelection();
  if (selection.toString().length > MIN_SELCTION_SIZE) {
    NotesContainer.onTextSelectEnd(selection);
  }
};


document.addEventListener('mouseup', onTextSelect, false);
