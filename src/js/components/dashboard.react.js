import React from 'react';
import OrgsList from './orgsList.react.js';

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.getOrganizations();
  }

  getOrganizations() {
    var t = this;
    this.props.github.get('/user/orgs').done((data) => {
      console.log(data);
      t.setState({ orgs: data });
    });//.failed((err) => { console.log(err) });
  }

  render() {
    if (this.state.orgs) {
      return <OrgsList github={this.props.github}>{this.state.orgs}</OrgsList>
    } else {
      return (<div>Loading organizations ...</div>);
    }
  }
}
