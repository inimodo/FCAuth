import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock,faArrowRight,faCircleExclamation,faQuestion,faHandshake,faUserPlus} from '@fortawesome/free-solid-svg-icons'
import Settings from '../essential/settings.js';
import MailCheck from '../essential/mailcheck.js';

class Auth extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      error:"",
      empty:true
    };
    this.mailInput = this.mailInput.bind(this);
  }

  mailInput(event)
  {
    if(MailCheck(event.target.value))
    {
      this.setState({
        error:"",
        empty:false
      });
      this.props.mailCallback(event.target.value);
    }else{
      this.setState({
        error:"Invalid email address!",
        empty:false
      });
    }
    if(event.target.value =="")
    {
      this.setState({
        error:"",
        empty: true
      });
    }
  }

  render()
  {
    var input = (<input className="mailinput" onChange={this.mailInput} placeholder="Mail"></input>);
    var style ={borderColor:"Gray"};
    var subtext;
    if(this.state.empty)
    {
      subtext = (<a className="inputrequest"><FontAwesomeIcon icon={faCircleExclamation} /> Please enter your email address.</a>);
    }else
    {
      subtext = (<a className="error">{this.state.error}</a>);
    }
    if(!this.props.enable)
    {
      style.opacity = "50%";
      input = (<a className="mailinput" onChange={this.mailInput} placeholder="Mail"></a>);
    }
    return (
      <div className="fca_subunit" style={style}>
        <a className="subtitle">by fcAuth {Settings.Version} authentication service provided by full+CTRL</a>
        {input}

        {subtext}
        <a className="origin">By continuing you agree to the Terms of Services.</a>
      </div>
    );
  }
}
export default Auth;
