import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Input } from '../common/formsControls/formsControls';
import { required } from '../utils/validators';
import { connect } from 'react-redux';
import { login, getCaptchaUrl } from '../../redux/auth-reducer';
import { Redirect } from 'react-router-dom';
import styles from '../common/formsControls/formcontrols.module.css';

const LoginForm = props => {
  return (
      <form onSubmit={props.handleSubmit}>
        <div>
          <Field 
            placeholder={"e-mail"} 
            name={"email"} 
            component={Input} 
            validate={[required]}
          />
        </div>
        <div>
          <Field 
            placeholder={"Password"} 
            name={"password"} 
            component={Input} 
            validate={[required]} 
            type="password"
          />
        </div>
        <div>
          <Field type={"checkbox"} name={"rememberMe"} component={Input} />
        </div>
        { props.captchaUrl && <img src={props.captchaUrl} alt="captcha" /> }
        { props.error &&
          <div className={styles.formSummaryError}>
            {props.error}
          </div>
        }
        <div>
          <button type={"submit"}>Login</button>
        </div>
      </form>
  )
}

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm)

const Login = props => {

  const onSubmit = (formData) => {
    props.login(formData.email, formData.password, formData.rememberMe)
  }

  if (props.isAuth) return <Redirect to="/profile" />

  return (
    <div>
      <h1>Login</h1>
      <LoginReduxForm onSubmit={ onSubmit } captchaUrl={props.captchaUrl} />
    </div>
  )
}

const mapStateToProps = (state) => ({ 
  isAuth: state.auth.isAuth,
  captchaUrl: state.auth.captchaUrl
})

export default connect( mapStateToProps, { login, getCaptchaUrl })(Login)