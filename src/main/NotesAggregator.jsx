import React, { Component } from 'react';
import PropTypes from 'prop-types';


class NotesAggregator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: props.show,
    };
  }
  render() {
    return (
      <div>
        <div>Fast/Previous</div>
        <div>Agrregator Icon</div>
      </div>
    );
  }
}

NotesAggregator.propTypes = {
  show: PropTypes.bool,
};

NotesAggregator.defaultProps = {
  show: false,
};


export default NotesAggregator;
