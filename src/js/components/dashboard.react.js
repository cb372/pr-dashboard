import React from 'react';
import OrgsList from './orgsList.react.js';
import RepoList from './repoList.react.js';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 
      orgs: {},
      selectedOrg: '',
      loadingRepos: true
    };

    this.setSelectedOrg = this.setSelectedOrg.bind(this);
  }

  componentDidMount() {
    this.getRepos();
  }

  getRepos() {
    this.getPageOfRepos(1);
  }

  getAllOpenPRs() {
    Object.keys(this.state.orgs).forEach((org) => {
      this.getOpenPRsForOrg(this.state.orgs[org]);
    })
  }

  getOpenPRsForOrg(org) {
    var t = this;
    org.repos.forEach((repo) => {
      this.props.github.get('/repos/'+org.org.login+'/'+repo.name+'/pulls?per_page=10&state=open&sort=updated&direction=desc').done((data) => {
        if (data.length > 0) {
          console.log('Adding open PRs for ' + repo.full_name);
          console.log(data);
          repo.openPRs = data;
          t.setState({ orgs: t.state.orgs });
        } else {
          // TODO remove any repos with no open PRs
        }
      });
    })
  }

  getPageOfRepos(page) {
    var t = this;
    this.props.github.get('/user/repos?per_page=100&page='+page).done((data) => {
      console.log(data);
      if (data.length > 0) {
        console.log('Adding page of repos');
        t.setState({ repos: t.addRepos(data) });
        t.getPageOfRepos(page + 1);
      } else {
        t.setState({ loadingRepos: false });

        // Now we have all orgs and repos, start getting open PRs for repos
        t.getAllOpenPRs();
      }
    });
  }

  addRepos(pageOfRepos) {
    var orgs = this.state.orgs;
    pageOfRepos.forEach((repo) => {
      var org = repo.owner;
      var orgAndRepos = orgs[org.login] || { org: org, repos: [] };
      if (repo.open_issues_count > 0) {
        orgAndRepos.repos.push(repo);
        orgs[org.login] = orgAndRepos;
      }
    });
    orgs;
  }

  setSelectedOrg(login) {
    this.setState({ selectedOrg: login });
  }

  render() {
    var t = this;
    var repoList;
    var selectedOrg = this.state.orgs[this.state.selectedOrg];
    if (selectedOrg) {
      repoList = <RepoList repos={selectedOrg.repos} />
    } else {
      repoList = (
        <div className="blankslate has-fixed-width">
          <h3>No organization selected</h3>
          <p>Select an organization from the menu on the left to see your open PRs.</p>
        </div>
      );
    }

    return (
      <div>
        <div>TODO filters go here</div>
        <div className="columns">
          <div className="one-fifth column">
            <OrgsList orgs={this.state.orgs} selectedOrg={this.state.selectedOrg} onSelect={t.setSelectedOrg} loadingRepos={this.state.loadingRepos} />
          </div>
          <div className="four-fifths column">
            {repoList}
          </div>
        </div>    
      </div>
    );
  }
}
