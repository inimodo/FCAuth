import React from 'react';
import Container from './content/essential/container.js';
import Auth from './content/auth.js';
import Tos from './content/tos.js';
import Register from './content/register.js';
import Help from './content/help.js';

class FCA extends React.Component{
  constructor(props)
  {
    super(props);
    this.state = {
      container: "small",
      page:"auth"
    };
    this.helpButton = this.helpButton.bind(this);
  }
  helpButton(page)
  {
    this.setState({page:page});
  }
  render()
  {
    var content;
    switch (this.state.page) {
      case "auth":
        content = (<Auth helpButton={this.helpButton}/>);
        break;
      case "register":
        content = (<Register/>);
        break;
      case "tos":
        content = (<Tos/>);
        break;
      case "help":
        content = (<Help/>);
        break;
      default:
    }
    return (<Container size={this.state.container}>{content}</Container>);
  }
}
export default FCA;
