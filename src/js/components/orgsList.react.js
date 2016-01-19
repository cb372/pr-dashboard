import React from 'react';

export default class OrgsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    var orgNodes = Object.keys(this.props.orgs).map((login) => {
      var orgAndRepos = this.props.orgs[login];
      return (
        <a className="menu-item" key={login}><img className="avatar avatar-small" width="20" height="20" src={orgAndRepos.org.avatar_url} />{login}</a>
      );
    })
    return (
      <nav className="menu">
        {orgNodes}
      </nav>
    );
  }
}
