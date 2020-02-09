import React from 'react';
import Paginator from './Paginator'

const Users = props => {
 
  return (
    <div>
        <Paginator 
          currentPage={props.currentPage} 
          totalItemsCount={props.totalUsersCount}
          pageSize={props.pageSize}
          onPageChanged={props.onPageChanged}
        />
        {
          props.users.map( user => <div key={user.id}>
              <span>
                <div>
                  <img src="https://img.icons8.com/material/4ac144/256/user-male.png" alt="user"/>
                </div>
                <div>
                  { 
                    user.followed
                      ? <button disabled={props.followingInProgress.some( id => id === user.id)} 
                      onClick={ () => { props.unfollow(user.id) }}>Unfollow</button>
                      : <button disabled={props.followingInProgress.some( id => id === user.id)}
                      onClick={ () => { props.follow(user.id) } }>Follow</button>
                  }
                </div>
              </span>
              <span>
                <span>
                  <div>{user.name}</div>
                  <div>{user.id}</div>
                </span>
                <span>
                <img src="https://user32265.clients-cdnnow.ru/localStorage/post/da/2c/8a/4a/da2c8a4a_resizedScaled_740to803.jpg" alt="www"/>
                </span>
              </span>    
            </div>
          )
        }
        
    </div>
  )
}

export default Users