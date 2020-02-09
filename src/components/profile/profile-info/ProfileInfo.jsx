import React from 'react';
import ProfileStatus from '../profile-status/ProfileStatus';

const ProfileInfo = props => {
    return (
        <div>
             <ProfileStatus status={props.status} updateStatus={props.updateStatus} />
        </div>
    )
}

export default ProfileInfo