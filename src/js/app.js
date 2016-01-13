import React from 'react';
import ReactDOM from 'react-dom';
import ReactApp from './components/reactApp.react';
import Auth0Config from './auth0_config';

ReactDOM.render(
  <ReactApp clientId={Auth0Config.client_id} domain={Auth0Config.domain} />, 
  document.getElementById('react-mount')
);
