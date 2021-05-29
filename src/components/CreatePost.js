import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createPost } from '../actions/posts';

class CreatePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: '',
    };
  }
  handleChange = (e) => {
    // console.log(e.target.value);
    this.setState({
      content: e.target.value,
    });
  };
  handleOnClick = () => {
    //dispacth action
    this.props.dispatch(createPost(this.state.content));
  };
  render() {
    return (
      <div className="create-post">
        <textarea
          className="add-post"
          value={this.state.change}
          onChange={this.handleChange}
        />
        <div>
          <button id="add-post-btn" onClick={this.handleOnClick}>
            Add post
          </button>
        </div>
      </div>
    );
  }
}

export default connect()(CreatePost);
