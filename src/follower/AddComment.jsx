import React from 'react';
import PropTypes from 'prop-types';
// import Comment from 'follower/comment/Comment';

import AddButton from 'data/images/add-note/web/ic_note_add_black_24dp_1x.png';

const styles = {
  addButton: {
    height: 24,
    width: 24,
    padding: 0,
    margin: 0,
    border: 0,
    background: `url(${AddButton})`,
  },
};

const AddComment = props => (
  <button
    style={
      Object.assign({},
                    styles.addButton,
                    props.style)
    }
    onClick={props.onClick}
  />
);

AddComment.propTypes = {
  style: PropTypes.object, // eslint-disable-line
  onClick: PropTypes.func.isRequired,
};

AddComment.defaultProps = {
  style: {},
};

export default AddComment;
