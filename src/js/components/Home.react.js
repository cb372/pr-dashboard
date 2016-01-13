import React from 'react';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  showLock() {
    this.props.lock.show();
  }

  render() {
    return (
      <div className="login-box auth0-box before">
        <h3>Login with GitHub</h3>
        <a onClick={ () => this.showLock() } className="btn btn-primary btn-lg btn-login btn-block">Sign In</a>
      </div>
    );
  }
}
