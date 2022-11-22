import React from 'react';
import Auth from './content/subpage/auth.js';
import Tos from './content/subpage/tos.js';
import Header from './content/elements/header.js';
import Footer from './content/elements/footer.js';
import Waiter from './content/elements/waiter.js';
import { faLock,faHandshake,faCircleExclamation} from '@fortawesome/free-solid-svg-icons'
import MailCheck from './content/essential/mailcheck.js';
import Settings from './content/essential/settings.js';
import Backend from './content/essential/websocket.js';

class FCA extends React.Component{
  constructor(props)
  {
    super(props);

    const params = new URLSearchParams(window.location.search);
    this.state = {
      page:"",
      email:"",
      waiting:false,
      waitingState:0,
      error:"",
      token:"",
      url:params.get("url"),
      captchaReady:false
    };

    this.helpButton = this.helpButton.bind(this);
    this.continueSafe = this.continueSafe.bind(this);
    this.continue = this.continue.bind(this);
    this.resendSafe = this.resendSafe.bind(this);
    this.resend = this.resend.bind(this);
    this.mailCallback = this.mailCallback.bind(this);
    this.checkLoop = this.checkLoop.bind(this);
    this.captchaReady = this.captchaReady.bind(this);

    window.grecaptcha.ready(this.captchaReady);
  }
  captchaReady()
  {
    this.setState({
      captchaReady: true
    });
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

  resendSafe(token)
  {
    Backend.access(this.state.email,token).then((data)=>{
      if(data.response)
      {
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

  resend()
  {
    if(MailCheck(this.state.email))
    {
      window.grecaptcha.execute(Settings.CaptchaKey, {action: 'submit'}).then(
        (token) => this.resendSafe(token)
      );
    }
  }

  continueSafe(token)
  {
    Backend.access(this.state.email,token).then((data)=>{
      if(data.response)
      {
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

      window.grecaptcha.execute(Settings.CaptchaKey, {action: 'submit'}).then(
        (token) => this.continueSafe(token)
      );
    }
  }

  render()
  {
    if(!this.state.captchaReady) // reCaptcha Loading
    {
      return (
          <div className="fca">
            <Header icon={faCircleExclamation} title=" Waiting for Google reCaptcha ..." color={"#ff7b7b"}/>
          </div>
      );
    }

    if(this.state.url == null) // Empty Redirect Error
    {
      return (
          <div className="fca">
            <Header icon={faCircleExclamation} title=" Empty redirect!" color={"#ff7b7b"}/>
          </div>
      );
    }

    var waiter;
    if(this.state.waiting) // User has clicked continue
    {
      if(this.state.waitingState === 2) // Result is okay
      {
        window.location.replace(this.state.url+"?token="+this.state.token);
      }
      waiter = (<Waiter waitingState={this.state.waitingState} resend={this.resend} error={this.state.error} url={this.state.url}/>);
    }

    var content;
    switch (this.state.page) { // Selects the subpage, only one now for now ... the future will tell
      case "tos":
        content = (
          <div>
            <Header icon={faHandshake} title=" Terms of Service."/>
            <Tos/>
          </div>);
        break;
      default:
    }

    return (
        <div className="fca">
          <Header icon={faLock} title=" Authentication required!" color={"#0095ff"}/>
          <Auth enable={!this.state.waiting} helpButton={this.helpButton} mailCallback={this.mailCallback}/>
          {waiter}
          {content}
          <Footer page={this.helpButton} continue={this.continue} />
        </div>
    );
  }
}
export default FCA;
