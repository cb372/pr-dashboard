import React from 'react';
import ReactDOM from 'react-dom';
import OAuthCheck from './components/oauthCheck.react';
import OAuthConfig from './oauth_config';

ReactDOM.render(
  <OAuthCheck publicKey={OAuthConfig.public_key} />, 
  document.getElementById('react-mount')
);
