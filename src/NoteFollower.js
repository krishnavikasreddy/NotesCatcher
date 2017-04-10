import * as DOM from './utils/DOMUtils';

const defaultStyle = {
  position: 'absolute',
  top: '0px',
  left: '0px',
  color: 'red',
  background: 'black',
};
const followerHtml = `
      <div>
      <span>color</span>
      <span>share</span>
      <span>delete</span>
      </div>`;

class NotesFollower {
  constructor() {
    this.follower = NotesFollower.createFollower();
    this.mouseOverSeamaphore = true;
    this.mouseLeaveSeamaphore = true;
  }
  insertContentsIntoFollower(contents) {
    this.follower.innerHTML = contents;
  }

  onMoseOver(event) {
    setTimeout(() => {
      if (DOM.isHidden(this.follower) && !this.mouseLeaveSeamaphore) {
        DOM.changeElementStyle(this.follower, { top: event.clientY, left: event.clientX });
        DOM.showElement(this.follower);
      }
    }, 1000);
    this.mouseOverSeamaphore = true;
    this.mouseLeaveSeamaphore = false;
  }
  onMouseLeave() {
    setTimeout(() => {
      if (!this.mouseOverSeamaphore) {
        DOM.hideElement(this.follower);
      }
    }, 1000);
    this.mouseLeaveSeamaphore = true;
    this.mouseOverSeamaphore = false;
  }
  static createFollower() {
    const element = DOM.createElement('div');
    DOM.changeElementStyle(element, defaultStyle);
    element.innerHTML = followerHtml;
    DOM.insertElementInBody(element);
    return element;
  }
}
export default NotesFollower;
