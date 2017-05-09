import React, { Component } from 'react';

import Follower from 'main/Follower';

class NotesFollower extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hide: true,
      style: {},
      cursorIn: false,
      currentNoteMouseLeave: () => {},
      currentNote: {},
    };
  }

  onMouseEnter = () => {
    this.setState({ cursorIn: true });
  }

  onMouseLeave = () => {
    this.setState({ cursorIn: false });
    this.state.currentNoteMouseLeave();
  }

  setStyle = (style) => {
    this.setState({ style });
  }

  setMouseLeave = (currentNoteMouseLeave) => {
    this.setState({ currentNoteMouseLeave });
  }

  setCurrentNote = (currentNote) => {
    this.setState({ currentNote });
  }

  isMouseIn = () => this.state.cursorIn;
  isHidden = () => this.state.hide;

  hideFollower = () => {
    this.setState({ hide: true });
  }

  showFollower = () => {
    this.setState({ hide: false });
  }

  render() {
    return (
      <Follower
        hide={this.state.hide}
        style={this.state.style}
        onMouseEnter={this.onMouseEnter}
        onMouseLeave={this.onMouseLeave}
        currentNote={this.state.currentNote}
      />
    );
  }
}

export default NotesFollower;
