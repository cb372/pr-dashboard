import React from 'react';
import OrgsList from './orgsList.react.js';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      orgs: {},
      loadingRepos: true
    };
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

  render() {
    return (
      <div>
        <div>TODO filters go here</div>
        <div className="columns">
          <div className="one-fifth column">
            <OrgsList github={this.props.github} orgs={this.state.orgs} loadingRepos={this.state.loadingRepos} />
          </div>
          <div className="four-fifths column">
            TODO repo list goes here
          </div>
        </div>    
      </div>
    );
  }
}
