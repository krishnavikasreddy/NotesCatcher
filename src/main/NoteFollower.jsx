import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import Follower from 'main/Follower';
import CommentModal from 'follower/comment/CommentModal';

class NotesFollower extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hide: true,
      style: {},
      cursorIn: false,
      currentNoteMouseLeave: () => {},
      currentNote: {},
      showCommentModal: true,
    };
  }

  onMouseEnter = (event) => {
    this.setState({
      cursorIn: true,
      top: event.clientY,
      left: event.clientX,
    });
  }

  onMouseLeave = () => {
    this.setState({ cursorIn: false });
    this.state.currentNoteMouseLeave();
  }

  onCommentSubmit = (text) => {
    console.log(text);
  }

  onCommentCancel = () => {
    this.setState({
      showCommentModal: false,
    });
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

  showCommentModal = () => {
    this.setState({
      showCommentModal: true,
    });
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <div >
          <Follower
            hide={this.state.hide}
            style={this.state.style}
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}
            currentNote={this.state.currentNote}
            onNoteRemove={this.props.onNoteRemove}
            showCommentModal={this.showCommentModal}
          />
          <CommentModal
            show={this.state.showCommentModal}
            onSave={this.onCommentSubmit}
            onCancel={this.onCommentCancel}
            top={this.state.top}
            left={this.state.left}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

NotesFollower.propTypes = {
  onNoteRemove: PropTypes.func.isRequired,
};

export default NotesFollower;
