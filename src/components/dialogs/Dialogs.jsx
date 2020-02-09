import React from 'react';
import { reduxForm, Field } from 'redux-form';
import styles from './dialogs.module.css';
import Message from './message/Message';
import DialogItem from './dialog-item/DialogItem';
import { required, maxLengthCreator } from '../utils/validators';
import { Textarea } from '../common/formsControls/formsControls';

// length validator params
const maxLength10 =  maxLengthCreator(10);

const Dialogs = props => {
  console.log(props)
  const { dialogs, messages } = props.dialogsPage;
  let dialogElements = dialogs.map( i => <DialogItem name={i.name} id={i.id} key={i.id} className={styles.dialog} />);
  let messageElements = messages.map( i => <Message message={i.message} key={i.id} className={styles.message} />);

  const addNewMessage = (value) => {
    props.sendMessage(value.newMessageBody)
  }

    return (
      <div className={styles.dialogs}>
        <div className={styles.dialogItems}>
          { dialogElements }
        </div>
        <div className={styles.messages}>
          { messageElements }
        </div>
        <AddMessageFormRedux onSubmit={addNewMessage}/>
      </div>
    )
}

const AddMessageForm = props => {
  return (
    <form onSubmit={props.handleSubmit}>
      <Field 
        placeholder="enter a message"
        component={Textarea}
        validate={[required, maxLength10]}
        name={"newMessageBody"}
        />
      <button type="submit">Send message</button>
    </form>
  )
}

const AddMessageFormRedux = reduxForm({ form: 'dialogsAddMessageForm' })(AddMessageForm)

export default Dialogs
