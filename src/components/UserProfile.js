import { fetchUserProfile } from '../actions/profile';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class UserProfile extends Component {
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
  render() {
    const {
      match: { params },
      profile,
    } = this.props;
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
            <button className="button save-btn">Remove friend</button>
          ) : (
            <button className="button save-btn">Add friend</button>
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ profile, friends }) {
  return { profile, friends };
}

export default connect(mapStateToProps)(UserProfile);
