import React from 'react';
import Post from './post/Post';
import {reduxForm, Field} from 'redux-form';
import { required, maxLengthCreator } from '../../utils/validators';
import { Textarea } from '../../common/formsControls/formsControls';

// length validator params
const maxLength10 =  maxLengthCreator(10);

const MyPosts = props => {
  const { posts} = props.profilePage;
  let postItems = posts.map( i => <Post key={i.id} message={i.message} likesCount={i.likesCount} />);
 
  const onAddPost = (newPost) => {
    props.addPost(newPost.myPost)
  }

    return (
        <>
          <h3>My posts</h3>
          <MyPostsFormRedux onSubmit={onAddPost}/>
          <div>
            { postItems }
          </div>
        </>
    )
}

const MyPostsForm = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field 
            name={"myPost"}
            component={Textarea}
            validate={[required, maxLength10]}
          />
          <button type="submit">Add post</button>
    </form>
  )
}

const MyPostsFormRedux = reduxForm({form: 'myposts'})(MyPostsForm)

export default MyPosts