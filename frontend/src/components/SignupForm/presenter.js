import React from "react";
import FacebookLogin from "react-facebook-login";
import PropTypes from "prop-types";
import formStyles from "shared/formStyles.scss";

const SignupForm = (props, context) => (
  <div className={formStyles.formComponent}>
    <h3>{context.t("Sign up to see photos and videos from your friends.")}</h3>
    <FacebookLogin
      appId="267153787224256"
      autoLoad={false}
      fields="name,email,picture"
      callback={props.handleFacebookLogin}
      cssClass={formStyles.button}
      icon="fa-facebook-official"
      textButton={context.t("Login with Facebook")}
    />
    <span className={formStyles.divider}>{context.t("or")}</span>
    <form className={formStyles.form} onSubmit={props.handleSubmit}>
      <input
        type="email"
        placeholder={context.t("Email")}
        className={formStyles.textInput}
        value={props.emailValue}
        onChange={props.handleInputChange}
        name="email"
      />
      <input
        type="text"
        placeholder={context.t("Full Name")}
        className={formStyles.textInput}
        value={props.nameValue}
        onChange={props.handleInputChange}
        name="name"
      />
      <input
        type="username"
        placeholder={context.t("Username")}
        className={formStyles.textInput}
        value={props.usernameValue}
        onChange={props.handleInputChange}
        name="username"
      />
      <input
        type="password"
        placeholder={context.t("Password")}
        className={formStyles.textInput}
        value={props.passwordValue}
        onChange={props.handleInputChange}
        name="password"
      />
      <input
        type="submit"
        value={context.t("Sign up")}
        className={formStyles.button}
      />
    </form>
    <p>
      {context.t("By signing up, you agree to our")}
      <span>{context.t("Terms & Privacy Policy")}</span>.
    </p>
  </div>
);

SignupForm.propTypes = {
  emailValue: PropTypes.string.isRequired,
  nameValue: PropTypes.string.isRequired,
  usernameValue: PropTypes.string.isRequired,
  passwordValue: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleFacebookLogin: PropTypes.func.isRequired
};

SignupForm.contextTypes = {
  t: PropTypes.func.isRequired
};

export default SignupForm;
