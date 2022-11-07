import React from 'react';
import ReactDOM from 'react-dom/client';
import Auth from './content/auth.js';
import Tos from './content/subpage/tos.js';
import Help from './content/subpage/help.js';
import Header from './content/elements/header.js';
import Footer from './content/elements/footer.js';
import Waiter from './content/elements/waiter.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock,faArrowRight,faCircleQuestion,faQuestion,faHandshake,faUserPlus,faShield,faLockOpen} from '@fortawesome/free-solid-svg-icons'
import MailCheck from './content/essential/mailcheck.js';
import Backend from './content/essential/websocket.js';

class FCA extends React.Component{
  constructor(props)
  {
    const params = new URLSearchParams(window.location.search);

    super(props);
    this.state = {
      page:"",
      email:"",
      waiting:false,
      waitingState:0,
      error:"",
      token:"",
      url:params.get("url")
    };
    this.helpButton = this.helpButton.bind(this);
    this.continue = this.continue.bind(this);
    this.resend = this.resend.bind(this);
    this.mailCallback = this.mailCallback.bind(this);
    this.checkLoop = this.checkLoop.bind(this);
  }
  checkLoop()
  {
    Backend.ask(this.state.token).then((data)=>{
      if(data.response)
      {
        this.setState({
          waitingState:2
        });
      }else
      {
        this.checkLoop();
      }
    });
  }
  mailCallback(mail)
  {
    this.setState({
      email: mail
    });
  }
  helpButton(page)
  {
    this.setState({page:page});
  }

  resend()
  {
    if(MailCheck(this.state.email))
    {
      Backend.access(this.state.email).then((data)=>{
        if(data.response){
          this.setState({
            token:data.token
          });
        }else
        {
          this.setState({
            error: data.error
          });
        }
      });
    }
  }
  continue()
  {
    this.setState({
      page:""
    });
    if(MailCheck(this.state.email))
    {
      this.setState({
        waiting:true
      });
      Backend.access(this.state.email).then((data)=>{
        if(data.response){
          this.setState({
            token:data.token
          });
          this.checkLoop();
        }else
        {
          this.setState({
            waitingState:1,
            error: data.error
          });
        }
      });

    }
  }

  render()
  {
    var waiter;
    if(this.state.waiting)
    {
      if(this.state.waitingState==2)window.location.replace(this.state.url+"?token="+this.state.token);
      waiter = (<Waiter waitingState={this.state.waitingState} resend={this.resend} error={this.state.error} url={this.state.url}/>);
    }
    var content;
    switch (this.state.page) {
      case "tos":
        content = (
          <div>
            <Header icon={faHandshake} title=" Terms of Service."/>
            <Tos/>
          </div>);
        break;
      case "help":
        content = (
          <div>
            <Header icon={faCircleQuestion} title=" Help!"/>
            <Help/>
          </div>);
        break;
      default:
    }
    return (
        <div className="fca">
          <Header icon={faLock} title=" Authentication required!" color={"#7be1ff"}/>
          <Auth enable={!this.state.waiting} helpButton={this.helpButton} mailCallback={this.mailCallback}/>
          {waiter}
          {content}
          <Footer page={this.helpButton} continue={this.continue} />
        </div>
    );
  }
}
export default FCA;
