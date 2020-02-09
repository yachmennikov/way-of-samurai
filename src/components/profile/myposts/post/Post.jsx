import React from 'react';
import styles from './post.module.css'

const Post = props => {
    const { message, likesCount } = props;
    return (
        <div>
          <img 
            src="https://is3-ssl.mzstatic.com/image/thumb/Purple123/v4/2a/2f/b2/2a2fb272-f0db-c7bb-c4ca-8f300732d8fb/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-85-220.png/246x0w.png" 
            alt="post-img"
            className={styles.img}
          />
          <p>{ message }</p>
          <span>likes:{ likesCount }</span>
        </div>
    )
}

export default Post