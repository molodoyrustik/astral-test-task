import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const handleClick = (props) => (e) => {
};

const User = (props) => {
  return (
    <div className="user">
      <div className="user__avatar-wrapper-pos">
        <div className="user__avatar-wrapper-style">
          <img src="/images/user/avatar.jpg" alt='avatar' className="user__avatar" />
        </div>
      </div>
      <div className="user__wrap">
        <p className="user__email">Account</p>
      </div>
    </div>
  );
};

export default connect(null, {})(User);
