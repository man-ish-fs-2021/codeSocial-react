import React, { Component } from 'react';
import { Chat, PostList } from './';
import { FriendList } from './';

class Home extends Component {
  render() {
    const { posts, friends, isLoggedIn } = this.props;
    // console.log(this.props);
    return (
      <div className="home">
        <PostList posts={posts} />
        {isLoggedIn && <FriendList friends={friends} />}
        {isLoggedIn && <Chat />}
      </div>
    );
  }
}

export default Home;
