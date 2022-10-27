import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock,faArrowRight,faCircleQuestion,faQuestion,faHandshake,faUserPlus} from '@fortawesome/free-solid-svg-icons'
import Settings from './essential/settings.js';
import LoadingScreen from './essential/loading.js';
class Auth extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      error:"",
      email:"",
      waiting:false,
      passed: false
    };
    this.mailInput = this.mailInput.bind(this);
    this.sendRequest = this.sendRequest.bind(this);
  }
  mailInput(event)
  {
    if(!event.target.value.includes('@'))//Better implementation needed
    {
      this.setState({
        error:"Invalid email address!"
      });
    }else{
      this.setState({
        email:event.target.value,
        error:""
      });
    }
  }
  sendRequest()
  {
    this.setState({
      waiting:true
    });
    //Send Request logic ...
  }
  render()
  {
    if(this.state.waiting)return <LoadingScreen/>
    return (
      <div>
        <h1 className="title"><FontAwesomeIcon icon={faLock} /> Authentication Required</h1>
        <div className="fca_subunit">
          <a className="subtitle">by fcAuth {Settings.Version} authentication service</a>
          <input className="mailinput" onChange={this.mailInput} placeholder="Mail or ID"></input>
          <a className="error">{this.state.error}</a>
          <a className="origin"><FontAwesomeIcon icon={faCircleQuestion} /> Service needs identity authentication for accessing its content!</a>
        </div>
        <a className="helplink" onClick={()=>this.props.helpButton("help")}><FontAwesomeIcon icon={faQuestion} /> Need Help</a>
        <a className="helplink" onClick={()=>this.props.helpButton("register")}><FontAwesomeIcon icon={faHandshake} /> Register me</a>
        <a className="helplink" onClick={()=>this.props.helpButton("tos")}><FontAwesomeIcon icon={faUserPlus} /> Terms of Service</a>

        <button className="send" onClick={this.sendRequest}>Continue <FontAwesomeIcon icon={faArrowRight} /></button>
      </div>
    );
  }
}
export default Auth;
