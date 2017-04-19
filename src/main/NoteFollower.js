import * as DOM from 'utils/DOMUtils';
import { defaultFollowerStyle } from 'configs/notes';

const followerHtml = `
      <div>
      <span>color</span>
      <span>share</span>
      <span>delete</span>
      </div>`;

class NotesFollower {
  constructor() {
    this.follower = NotesFollower.createFollower();
    this.mouseOverSeamaphore = false;
    this.mouseLeaveSeamaphore = false;
    this.mouseOverTimer = false;
    this.mouseLeaveTimer = false;
    this.currentParent = undefined;
  }
  insertContentsIntoFollower(contents) {
    this.follower.innerHTML = contents;
  }

  onMoseOver(event) {
    if (event.target !== this.currentParent) {
      this.currentParent = event.target;
      DOM.hideElement(this.follower);
      this.mouseOverTimer = false;
    }
    if (DOM.isHidden(this.follower) && !this.mouseOverTimer) {
      setTimeout(() => {
        if (!this.mouseLeaveSeamaphore &&
            (this.currentParent === event.target)) {
          DOM.changeElementStyle(this.follower, { top: event.clientY, left: event.clientX });
          DOM.showElement(this.follower);
        }
        this.mouseOverTimer = false;
      }, 500);
      this.mouseOverTimer = true;
    }
    this.mouseOverSeamaphore = true;
    this.mouseLeaveSeamaphore = false;
  }

  onMouseLeave() {
    if (!this.mouseLeaveTimer) {
      setTimeout(() => {
        if (!this.mouseOverSeamaphore) {
          DOM.hideElement(this.follower);
        }
        this.mouseLeaveTimer = false;
      }, 500);
      this.mouseLeaveTimer = true;
    }
    this.mouseLeaveSeamaphore = true;
    this.mouseOverSeamaphore = false;
  }
  static createFollower() {
    const element = DOM.createElement('div');
    DOM.changeElementStyle(element, defaultFollowerStyle);
    element.innerHTML = followerHtml;
    DOM.insertElementInBody(element);
    return element;
  }
}
export default NotesFollower;
