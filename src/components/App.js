import React from 'react';
import { connect } from 'react-redux';
import { fetchPosts } from '../actions/posts';
import PropTypes from 'prop-types';
import {
  Home,
  Navbar,
  Page404,
  Login,
  Signup,
  Settings,
  UserProfile,
} from './index';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { authenticateUser } from '../actions/auth';
import { fetchFriends } from '../actions/friends';
// import MetaTags from 'react-meta-tags';

const PrivateRoute = (privateRouteProps) => {
  const { isLoggedIn, path, component: Component } = privateRouteProps;
  return (
    <Route
      path={path}
      render={(props) => {
        // console.log(props);
        return isLoggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: '/login', state: { from: props.location } }}
          />
        );
      }}
    />
  );
};

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
    const token = localStorage.getItem('token');
    if (token) {
      const user = jwtDecode(token);
      // console.log('user', user);
      this.props.dispatch(
        authenticateUser({ email: user.email, _id: user._id, name: user.name })
      );
      this.props.dispatch(fetchFriends());
    }
  }

  render() {
    // console.log(this.props);
    const { posts, auth, friends } = this.props;
    return (
      <Router>
        <div>
          {/* <MetaTags>
            <meta
              http-equiv="Content-Security-Policy"
              content="upgrade-insecure-requests"
            />
          </MetaTags> */}
          <Navbar />
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => {
                return (
                  <Home
                    {...props}
                    friends={friends}
                    isLoggedIn={auth.isLoggedIn}
                    posts={posts}
                  />
                );
              }}
            />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Signup} />
            <PrivateRoute
              path="/settings"
              isLoggedIn={auth.isLoggedIn}
              component={Settings}
            />
            <PrivateRoute
              path="/user/:userId"
              isLoggedIn={auth.isLoggedIn}
              component={UserProfile}
            />
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
    auth: state.auth,
    friends: state.friends,
  };
};
export default connect(mapStateToProps)(App);
