import React from 'react';
import Container from './content/essential/container.js';
import Auth from './content/auth.js';
import Tos from './content/tos.js';
import Register from './content/register.js';

class FCA extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      container: "small",
      page:"auth"
    };
  }
  render()
  {
    var content;
    switch (this.state.page) {
      case "auth":
        content = (<Auth/>);
        break;
      case "register":
        content = (<Register/>);
        break;
      case "tos":
        content = (<Tos/>);
        break;
      default:
    }
    return (<Container size={this.state.container}>{content}</Container>);
  }
}
export default FCA;
