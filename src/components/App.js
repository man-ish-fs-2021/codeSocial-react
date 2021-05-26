import React from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/posts';
import PropTypes from 'prop-types';
import { Home, Navbar, Page404, Login } from './index';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const Logout = () => {
  return <div>logout</div>;
};
const Register = () => {
  return <div>register</div>;
};
const SignUp = () => {
  return <div>signup</div>;
};

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
  }

  render() {
    console.log(this.props);
    const { posts } = this.props;
    return (
      <Router>
        <div>
          <Navbar />
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => {
                return <Home {...props} posts={posts} />;
              }}
            />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path="/signup" component={SignUp} />
            <Route path="/logout" component={Logout} />
            <Route component={Page404} />
          </Switch>
        </div>
      </Router>
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
