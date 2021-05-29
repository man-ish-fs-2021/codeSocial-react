import React, { Component } from 'react';
import { Comment } from './';
import { Link } from 'react-router-dom';
import { createComment } from '../actions/posts';
import { connect } from 'react-redux';

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
    };
  }
  handleChange = (e) => {
    // console.log(e.target.value);
    this.setState({
      comment: e.target.value,
    });
  };
  handleComment = (e) => {
    const { post } = this.props;
    const { comment } = this.state;
    if (e.key === 'Enter') {
      this.props.dispatch(createComment(comment, post._id));

      this.setState({
        comment: '',
      });
    }
  };
  render() {
    const { post } = this.props;
    const { comment } = this.state;
    return (
      <div className="post-wrapper" key={post._id}>
        <div className="post-header">
          <div className="post-avatar">
            <Link to={`user/${post.user._id}`}>
              <img
                src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
                alt="user-pic"
              />
            </Link>
            <div>
              <span className="post-author">{post.user.name}</span>
              <span className="post-time">a minute ago</span>
            </div>
          </div>
          <div className="post-content">{post.content}</div>

          <div className="post-actions">
            <div className="post-like">
              <img
                src="https://image.flaticon.com/icons/svg/1077/1077035.svg"
                alt="likes-icon"
              />
              <span>{post.likes.length}</span>
            </div>

            <div className="post-comments-icon">
              <img
                src="https://image.flaticon.com/icons/svg/1380/1380338.svg"
                alt="comments-icon"
              />
              <span>{post.comments.length}</span>
            </div>
          </div>
          <div className="post-comment-box">
            <input
              placeholder="Start typing a comment"
              onChange={this.handleChange}
              onKeyPress={this.handleComment}
              value={comment}
            />
          </div>

          <div className="post-comments-list">
            {post.comments.map((comment) => {
              //   console.log(comment);
              return (
                <Comment
                  comment={comment}
                  key={comment._id}
                  postId={post._id}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default connect()(Post);
