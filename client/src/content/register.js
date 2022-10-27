import React from 'react';
import Settings from './essential/settings.js';
import MailCheck from './essential/mailcheck.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

class Register extends React.Component{
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
    return (
      <div className="fca_subunit">
        <a className="subtitle">you are creating a registration for {"https:\\www.example.com"} with this mail:</a>
        <input className="mailinput" onChange={this.mailInput} placeholder="Mail"></input>
        <a className="error">{this.state.error}</a>
      </div>
    );
  }
}
export default Register;
