import React, { useState, useEffect } from 'react';

const ProfileStatus = props => {

  let [editMode, setEditMode] = useState(false);
  let [status, setStatus] = useState(props.status);

  useEffect( () => {
    setStatus(props.status)
  }, [props.status])

  const activateEditMode = () => {
    setEditMode(true)
  }

  const deactivateEditMode = () => {
    setEditMode(false);
    props.updateStatus(status)
  }

  const onStatusChange = e => {
    setStatus(e.currentTarget.value)
  }

    return (
      <>
        {
          !editMode
          ?
            <div>
              <span onClick={ activateEditMode }>
                {!props.status ? 'no status' : props.status}
              </span>
            </div>
          :
          <div>
            <input 
              autoFocus={true}
              type="text" 
              onBlur={ deactivateEditMode }
              onChange={ onStatusChange }
              value={status}
            />
          </div>
        }
      </>
    )
}

export default ProfileStatus