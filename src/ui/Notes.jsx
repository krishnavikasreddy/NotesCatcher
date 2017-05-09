import React, { PropTypes, Component } from 'react';


class Note extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rangeAttributes: {},
      textRanges: [],
      follower: props.follower,
    };
  }
}

Note.propTypes = {
  follower: PropTypes.element.isRequired,
};


export default Note;
