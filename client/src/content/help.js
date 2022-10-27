import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

class Help extends React.Component{
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  render()
  {
    return (<FontAwesomeIcon icon={faCoffee} />);
  }
}
export default Help;
