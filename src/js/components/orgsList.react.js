import React from 'react';

export default class OrgsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    var orgNodes = this.props.children.map((org) => {
      return (
        <div><img height="20" width="20" src={org.avatar_url}/>{org.login}</div>
      );
    })
    return (
      <div>
        {orgNodes}
      </div>
    );
  }
}
