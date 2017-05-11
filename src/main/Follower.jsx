import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { defaultFollowerStyle } from 'configs/notes';
import ColorChanger from 'follower/ColorChanger';
import DeleteNote from 'follower/DeleteNote';

class Follower extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: { visibility: 'visible' },
    };
  }

  componentWillReceiveProps(nextprops) {
    if (!nextprops.hide) {
      this.setState({ visibility: { visibility: 'visible' } });
    } else {
      this.setState({ visibility: { visibility: 'hidden' } });
    }
  }

  onNoteDelete = () => {
    this.props.currentNote.unColorRanges();
    this.props.onNoteRemove(this.props.currentNote.noteId);
    this.setState({ visibility: { visibility: 'hidden' } });
  }

  render() {
    return (
      <div
        style={Object.assign({},
                             defaultFollowerStyle,
                             this.state.visibility,
                             this.props.style,
        )}
        onMouseLeave={this.props.onMouseLeave}
        onMouseEnter={this.props.onMouseEnter}
      >
        <ColorChanger
          hide={this.props.hide}
          currentNote={this.props.currentNote}
        />
        <DeleteNote
          onClick={this.onNoteDelete}
        />
      </div>
    );
  }
}

Follower.propTypes = {
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
  hide: PropTypes.bool.isRequired,
  style: PropTypes.object, // eslint-disable-line
  currentNote: PropTypes.object, // eslint-disable-line
  onNoteRemove: PropTypes.func.isRequired,
};

Follower.defaultProps = {
  style: {},
  currentNote: {},
};

export default Follower;
