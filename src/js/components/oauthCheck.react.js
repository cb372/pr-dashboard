import React from 'react';
import oauth from 'oauthio-web';
import Dashboard from './dashboard.react';

export default class OAuthCheck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.initOAuth();
  }

  initOAuth() {
    OAuth.initialize(this.props.publicKey);
  }

  componentDidMount() {
    var t = this;
    OAuth.popup('github', {cache: true})
      .done(function(github) { t.setState({ github: github })})
      .fail(function(err) { t.setState({ oauthFailed: true })});
  }

  render() {
    if (this.state.oauthFailed) {
      return (<div>Oops, GitHub auth failed!</div>);
    } else if (this.state.github) {
      return (<Dashboard github={this.state.github} />);
    } else {
      return (<div/>);
    }
  }
}
