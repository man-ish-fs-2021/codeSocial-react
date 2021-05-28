import { fetchUserProfile } from '../actions/profile';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { APIUrls } from '../helpers/urls';
import { addFriend, removeFriend } from '../actions/friends';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      success: null,
      error: null,
      successMessage: null,
    };
  }
  componentDidMount() {
    const { match } = this.props;
    if (match.params.userId) {
      // dispacth an action
      this.props.dispatch(fetchUserProfile(match.params.userId));
    }
  }
  checkUserIsFriend = () => {
    const { match, friends } = this.props;
    const { userId } = match.params;
    const index = friends.map((friend) => friend.to_user._id).indexOf(userId);
    if (index !== -1) {
      return true;
    }
    return false;
  };
  handleFriendAdd = async () => {
    const userId = this.props.match.params.userId;
    const url = APIUrls.addFriend(userId);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Remove Auth if not required
      },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    if (data.success) {
      this.setState({
        success: true,
        successMessage: 'Added friend successfully!',
      });
      this.props.dispatch(addFriend(data.data.friendship));
    } else {
      this.setState({
        success: null,
        error: data.message,
      });
    }
  };
  handleFriendRemove = async () => {
    const { userId } = this.props.match.params;
    const url = APIUrls.removeFriend(userId);
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${localStorage.getItem('token')}`, // Remove Auth if not required
      },
    };
    const response = await fetch(url, options);
    const data = await response.json();
    console.log('Friend remove data', data);
    if (data.success) {
      this.setState({
        success: true,
        successMessage: 'Friend removed successfully',
      });
      this.props.dispatch(removeFriend(userId));
    } else {
      this.setState({
        success: null,
        error: data.message,
      });
    }
  };
  render() {
    const {
      match: { params },
      profile,
    } = this.props;
    const { success, error, successMessage } = this.state;
    console.log('params', params);
    console.log('The profile', profile);
    if (profile.inProgress) {
      return <div>Fetching the data...</div>;
    }
    const isUserFriend = this.checkUserIsFriend();
    return (
      <div className="settings">
        <div className="img-container">
          <img
            src="https://image.flaticon.com/icons/svg/2154/2154651.svg"
            alt="user-dp"
          />
        </div>
        <div className="field">
          <div className="field-label">Name</div>
          <div className="field-value">{profile.user.name}</div>
        </div>
        <div className="field">
          <div className="field-label">Email</div>
          <div className="field-value">{profile.user.email}</div>
        </div>
        <div className="btn-grp">
          {isUserFriend ? (
            <button
              className="button save-btn"
              onClick={this.handleFriendRemove}
            >
              Remove friend
            </button>
          ) : (
            <button className="button save-btn" onClick={this.handleFriendAdd}>
              Add friend
            </button>
          )}
        </div>
        {success && (
          <div className="alert success-dailog">{successMessage}</div>
        )}
        {error && <div className="alert error-dailog">{error}</div>}
      </div>
    );
  }
}

function mapStateToProps({ profile, friends }) {
  return { profile, friends };
}

export default connect(mapStateToProps)(UserProfile);
