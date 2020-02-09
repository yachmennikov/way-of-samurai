import React from 'react';
import styles from './profile.module.css';
import ProfileInfo from './profile-info/ProfileInfo';
import MyPostsContainer from './myposts/myPostContainer';

const Profile = props => {
 
    return (
      <div className={styles.content}>
        <ProfileInfo status={props.status} updateStatus={props.updateStatus} profile={props.profile} />
        <MyPostsContainer />
      </div>
    )
}

export default Profile