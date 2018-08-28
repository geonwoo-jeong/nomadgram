import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import LoginForm from "components/LoginForm";
import SignupForm from "components/SignupForm";

const Auth = (props, context) => (
  <main className={styles.auth}>
    <div className={styles.column}>
      <img
        src={require("images/phone.png")}
        alt={context.t("Checkout our app, Is cool")}
      />
    </div>
    <div className={styles.column}>
      <div className={`${styles.whiteBox} ${styles.formBox}`}>
        {props.action === "login" && <LoginForm />}
        {props.action === "signup" && <SignupForm />}
      </div>
      <div className={styles.whiteBox}>
        {props.action === "login" && (
          <p>
            {context.t("Don't have an account?")}{" "}
            <span onClick={props.changeAction} className={styles.changeLink}>
              {context.t("Sign up")}
            </span>
          </p>
        )}
        {props.action === "signup" && (
          <p>
            {context.t("Have an account?")}{" "}
            <span onClick={props.changeAction} className={styles.changeLink}>
              {context.t("Log in")}
            </span>
          </p>
        )}
      </div>
      <div className={styles.appBox}>
        <span>{context.t("Get the app")}</span>
        <div className={styles.appstores}>
          <img
            src={require("images/ios.png")}
            alt={context.t("Download it on the Apple AppStore")}
          />
          <img
            src={require("images/android.png")}
            alt={context.t("Download it on the Google playStore")}
          />
        </div>
      </div>
    </div>
  </main>
);

Auth.contextTypes = {
  t: PropTypes.func.isRequired
};

export default Auth;
