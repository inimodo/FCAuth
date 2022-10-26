import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock,faArrowRight,faCircleQuestion } from '@fortawesome/free-solid-svg-icons'
import Settings from './essential/settings.js';

class Auth extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      error:"Invald Email address"
    };
  }
  render()
  {
    return (
      <div>
        <h1 className="title"><FontAwesomeIcon icon={faLock} /> Authentication Required</h1>
        <a className="subtitle">fcAuth {"v1.2"}</a>
        <div className="data">
          <input className="mailinput" placeholder="Mail or ID"></input>
          <button className="send"><FontAwesomeIcon icon={faArrowRight} /></button>
          <a className="error">{this.state.error}</a>
        </div>
        <a className="origin"><FontAwesomeIcon icon={faCircleQuestion} /> Service {"https:\\www.example.com"} needs identity authentication for accessing its content!</a>

      </div>
    );
  }
}
export default Auth;
