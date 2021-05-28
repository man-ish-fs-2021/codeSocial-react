import React from 'react';
import { FriendListItem } from '.';

function FriendList(props) {
  return (
    <div className="friends-list">
      <div className="header">
        {props.friends && props.friends.length() === 0 && (
          <div> No friends </div>
        )}
        {props.friends &&
          props.friends.map((friend) => {
            <FriendListItem friend={friend.to_user} key={friend._id} />;
          })}
      </div>
    </div>
  );
}

export default FriendList;
