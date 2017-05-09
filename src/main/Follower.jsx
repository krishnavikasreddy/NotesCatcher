import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { defaultFollowerStyle } from 'configs/notes';
import ColorChanger from 'follower/ColorChanger';


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

  render() {
    return (
      <div
        style={Object.assign({}, defaultFollowerStyle, this.state.visibility,
        this.props.style)}
        onMouseLeave={this.props.onMouseLeave}
        onMouseEnter={this.props.onMouseEnter}
      >
        <ColorChanger
          hide={this.props.hide}
          currentNote={this.props.currentNote}
        />
        <span>share</span>
        <span>delete</span>
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
};

Follower.defaultProps = {
  style: {},
  currentNote: {},
};

export default Follower;
