import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation} from '@fortawesome/free-solid-svg-icons'
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
    if(event.target.value === "")
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
      subtext = (<p className="inputrequest"><FontAwesomeIcon icon={faCircleExclamation} /> Please enter your email address.</p>);
    }else
    {
      subtext = (<p className="error">{this.state.error}</p>);
    }
    if(!this.props.enable)
    {
      style.opacity = "50%";
      input = (<p className="mailinput" onChange={this.mailInput} placeholder="Mail"></p>);
    }
    return (
      <div className="fca_subunit" style={style}>
        <p className="subtitle">by fcAuth {Settings.Version} authentication service provided by full+CTRL</p>
        {input}

        {subtext}
        <p className="origin">By continuing you agree to the Terms of Services.</p>
      </div>
    );
  }
}
export default Auth;
