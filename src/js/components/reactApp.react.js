import React from 'react';
import Auth0Lock from 'auth0-lock';
import $ from 'jquery';
import Home from './home.react';
import LoggedIn from './loggedIn.react';

export default class ReactApp extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.setupAjax();
    this.createLock();
    this.setState({idToken: this.getIdToken()})
  }

  createLock() {
    this.lock = new Auth0Lock(this.props.clientId, this.props.domain);
  }

  setupAjax() {
    $.ajaxSetup({
      'beforeSend': function(xhr) {
        if (localStorage.getItem('userToken')) {
          xhr.setRequestHeader('Authorization',
              'Bearer ' + localStorage.getItem('userToken'));
        }
      }
    });
  }

  getIdToken() {
    var idToken = localStorage.getItem('userToken');
    var authHash = this.lock.parseHash(window.location.hash);
    if (!idToken && authHash) {
      if (authHash.id_token) {
        idToken = authHash.id_token;
        localStorage.setItem('userToken', authHash.id_token);
      }
      if (authHash.error) {
        console.log("Error signing in", authHash);
      }
    }
    return idToken;
  }

  render() {
    if (this.state.idToken) {
      return (<LoggedIn lock={this.lock} idToken={this.state.idToken} />);
    } else {
      return (<Home lock={this.lock} />);
    }
  }
}
