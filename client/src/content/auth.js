import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock,faArrowRight,faCircleExclamation,faQuestion,faHandshake,faUserPlus} from '@fortawesome/free-solid-svg-icons'
import Settings from './essential/settings.js';
import MailCheck from './essential/mailcheck.js';

class Auth extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      error:""
    };
    this.mailInput = this.mailInput.bind(this);
  }

  mailInput(event)
  {
    if(MailCheck(event.target.value))//Better implementation needed
    {
      this.setState({
        error:""
      });
      this.props.mailCallback(event.target.value);
    }else{
      this.setState({
        error:"Invalid email address!"
      });

    }
  }

  render()
  {
    var input = (<input className="mailinput" onChange={this.mailInput} placeholder="Mail"></input>);
    var style ={borderColor:"#7be1ff"};
    if(!this.props.enable)
    {
      style.opacity = "50%";
      input = (<a className="mailinput" onChange={this.mailInput} placeholder="Mail"></a>);
    }
    return (
      <div className="fca_subunit" style={style}>
        <a className="subtitle">by fcAuth {Settings.Version} authentication service</a>
        {input}
        <a className="error">{this.state.error}</a>
        <a className="origin"><FontAwesomeIcon icon={faCircleExclamation} /> Please enter your email address. First time? No problem, because fcAuth does not have a registration. For more infos click on 'Need Help'.</a>
        <a className="origin">By continuing you agree to the Terms of Services.</a>
      </div>
    );
  }
}
export default Auth;
