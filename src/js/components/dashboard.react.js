import React from 'react';
import OrgsList from './orgsList.react.js';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      orgs: {}
    };
  }

  componentDidMount() {
    this.getRepos();
  }

  getRepos() {
    this.getPageOfRepos(1);
  }

  getPageOfRepos(page) {
    var t = this;
    this.props.github.get('/user/repos?per_page=100&page='+page).done((data) => {
      console.log(data);
      if (data.length > 0) {
        console.log('Adding page of repos');
        t.setState({ repos: t.addRepos(data) });
        t.getPageOfRepos(page + 1);
      }
    });
  }

  addRepos(pageOfRepos) {
    var orgs = this.state.orgs;
    pageOfRepos.forEach((repo) => {
      var org = repo.owner;
      var orgAndRepos = orgs[org.login] || { org: org, repos: [] };
      orgAndRepos.repos.push(repo);
      orgs[org.login] = orgAndRepos;
    });
    orgs;
  }

  render() {
    return (
      <div>
        <div>TODO filters go here</div>
        <div className="columns">
          <div className="one-fifth column">
            <OrgsList github={this.props.github} orgs={this.state.orgs} />
          </div>
          <div className="four-fifths column">
            TODO repo list goes here
          </div>
        </div>    
      </div>
    );
  }
}
