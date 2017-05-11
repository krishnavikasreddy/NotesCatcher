import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

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
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <Follower
          hide={this.state.hide}
          style={this.state.style}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          currentNote={this.state.currentNote}
          onNoteRemove={this.props.onNoteRemove}
        />
      </MuiThemeProvider>
    );
  }
}

NotesFollower.propTypes = {
  onNoteRemove: PropTypes.func.isRequired,
};

export default NotesFollower;
