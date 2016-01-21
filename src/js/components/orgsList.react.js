import React from 'react';

export default class OrgsList extends React.Component {
  constructor(props) {
    super(props);
  }

  totalOpenPRs(repos) {
    var total = repos.reduce((acc, repo) => { 
      var openPRs = 0;
      if (repo.openPRs) 
        openPRs = repo.openPRs.length;
      return acc + openPRs;
    }, 0);
    console.log(total);
    return total;
  }

  render() {
    var orgNodes = Object.keys(this.props.orgs).map((login) => {
      var orgAndRepos = this.props.orgs[login];
      var cssClass;
      if (this.props.selectedOrg === login)
        cssClass = 'menu-item selected';
      else
        cssClass = 'menu-item';

      return (
        <a href="#" className={cssClass} key={login} onClick={() => this.props.onSelect(login)}><img className="avatar avatar-small" width="20" height="20" src={orgAndRepos.org.avatar_url} />
          <span className="counter">{this.totalOpenPRs(orgAndRepos.repos)}</span>
          {login}
        </a>
      );
    })
    return (
      <nav className="menu">
        {orgNodes}
        <LoadingSpinner loading={this.props.loadingRepos} />
      </nav>
    );
  }
}

class LoadingSpinner extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.loading)
      return <div>Loading orgs...</div>;
    else
      return null;
  }
}

