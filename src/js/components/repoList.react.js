import React from 'react';

export default class RepoList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var repoItems = this.props.repos.map((repo) => {
      var counter;
      if (repo.openPRs) {
        counter = <span className="counter">{repo.openPRs.length}</span>;
      } else {
        counter = null;
      }
      return (<a className="menu-item">
        {counter}
        {repo.name}
      </a>);
    });
    return (
      <nav className="menu">
        {repoItems}
      </nav>
    );
  }
}

