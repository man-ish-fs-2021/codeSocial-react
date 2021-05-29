import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CreatePost } from './';
import { Post } from './';

class PostList extends Component {
  render() {
    const { posts } = this.props;

    return (
      <div className="posts-list">
        <CreatePost />
        {posts.map((post) => (
          <Post post={post} key={post._id} />
        ))}
      </div>
    );
  }
}

PostList.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default PostList;
