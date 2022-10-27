import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock,faArrowRight,faCircleExclamation,faQuestion,faHandshake,faUserPlus} from '@fortawesome/free-solid-svg-icons'
import Settings from './essential/settings.js';
import MailCheck from './essential/mailcheck.js';

class Auth extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      error:"",
      email:""
    };
    this.mailInput = this.mailInput.bind(this);
  }


  mailInput(event)
  {
    if(MailCheck(event.target.value))//Better implementation needed
    {
      this.setState({
        email:event.target.value,
        error:""
      });
    }else{
      this.setState({
        error:"Invalid email address!"
      });

    }
  }

  render()
  {
    var input = (<input className="mailinput" onChange={this.mailInput} placeholder="Mail or ID"></input>);
    if(!this.props.enable)
    {
      input = (<a className="mailinput" onChange={this.mailInput} placeholder="Mail or ID"></a>);
    }
    return (
      <div className="fca_subunit">
        <a className="subtitle">by fcAuth {Settings.Version} authentication service</a>
        {input}
        <a className="error">{this.state.error}</a>
        <a className="origin"><FontAwesomeIcon icon={faCircleExclamation} /> Service needs identity authentication for accessing its content!</a>
      </div>
    );
  }
}
export default Auth;
