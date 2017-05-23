import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  comment: {
    width: 300,
    position: 'absolute',
  },
  titleBar: {
    // height: 20,
  },
  title: {
    height: 24,
    fontSize: 16,
    lineHeight: '24px',
  },
  closeButton: {
    height: '24px',
    marginTop: -20,
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    margin: 2,
  },
};

const messages = {
  titleBox: 'Add Comment',
  save: 'Save',
  cancel: 'Cancel',
  errorText: 'This field is required!',
};
class CommentModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: props.show,
      commentText: '',
      errorText: undefined,
      position: {
        top: this.props.top,
        left: this.props.left,
      },
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      position: {
        top: nextProps.top,
        left: nextProps.left,
      },
    });
  }

  onSave = () => {
    if (this.state.commentText.length > 0) {
      this.props.onSave(this.state.commentText);
    } else {
      this.setState({
        errorText: messages.errorText,
      });
    }
  }

  onCancel = () => {
    this.props.onCancel();
    this.setState({
      show: false,
      commentText: '',
    });
  }

  onTextChange = (event, updatedText) => {
    this.setState({
      commentText: updatedText,
      errorText: undefined,
    });
  }

  render() {
    if (!this.props.show) {
      return (<noscript />);
    }
    return (
      <div style={Object.assign({}, styles.comment, this.state.position)}>
        <Paper style={styles.comment} zDepth={1}>
          <AppBar
            title={messages.titleBox}
            titleStyle={styles.title}
            style={styles.titleBar}
            iconElementLeft={<noscript />}
            iconElementRight={
              <IconButton
                style={styles.closeButton}
                onClick={this.props.onCancel}
              >
                <NavigationClose />
              </IconButton>
          }
          />
          <TextField
            hintText="Please Enter your comment"
            multiLine
            onChange={this.onTextChange}
            errorText={this.state.errorText}
            value={this.state.commentText}
            rows={2}
          />
          <div style={styles.buttonContainer}>
            <RaisedButton
              style={styles.button}
              label={messages.save}
              onClick={this.onSave}
            />
            <RaisedButton
              style={styles.button}
              label={messages.cancel}
              onClick={this.onCancel}
            />
          </div>
        </Paper>
      </div>
    );
  }
}

CommentModal.propTypes = {
  show: PropTypes.bool,
  top: PropTypes.number,
  left: PropTypes.number,
  onSave: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

CommentModal.defaultProps = {
  show: false,
  top: 0,
  left: 0,
};

export default CommentModal;

