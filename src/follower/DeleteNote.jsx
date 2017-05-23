import React from 'react';
import PropTypes from 'prop-types';

import Delete from
'data/images/delete/web/ic_delete_forever_black_24dp_1x.png';

const styles = {
  delete: {
    height: 24,
    width: 24,
    margin: 0,
    padding: 0,
    border: '0px solid',
    background: `url(${Delete}) transparent no-repeat`,
  },
};

const DeleteNote = props => (
  <button
    style={Object.assign({},
                         styles.delete,
                         props.style)}
    onClick={props.onClick}
  />
);


DeleteNote.propTypes = {
  style: PropTypes.object, // eslint-disable-line
  onClick: PropTypes.func.isRequired,
};

DeleteNote.defaultProps = {
  style: {},
};

export default DeleteNote;
