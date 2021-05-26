import React from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/posts';
import PropTypes from 'prop-types';
import { PostList, Navbar } from './index';
import { BrowserRouter as Router } from 'react-router-dom';

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }

  render() {
    console.log(this.props);
    const { posts } = this.props;
    return (
      <div>
        <Navbar />
        <PostList posts={posts} />
      </div>
    );
  }
}

App.propTypes = {
  posts: PropTypes.array.isRequired,
};
const mapStateToProps = (state) => {
  return {
    posts: state.posts,
  };
};
export default connect(mapStateToProps)(App);
