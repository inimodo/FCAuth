import React from 'react';
import Auth from './content/auth.js';
import Tos from './content/subpage/tos.js';
import Help from './content/subpage/help.js';
import Header from './content/elements/header.js';
import Footer from './content/elements/footer.js';
import Waiter from './content/elements/waiter.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock,faArrowRight,faCircleQuestion,faQuestion,faHandshake,faUserPlus,faShield} from '@fortawesome/free-solid-svg-icons'
import MailCheck from './content/essential/mailcheck.js';


class FCA extends React.Component{
  constructor(props)
  {
    super(props);
    this.state = {
      page:"",
      email:"",
      waiting:false,
      waitingState:2
    };
    this.helpButton = this.helpButton.bind(this);
    this.continue = this.continue.bind(this);
    this.mailCallback = this.mailCallback.bind(this);
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
  continue()
  {
    console.log(this.state);
    if(this.state.page=="" && MailCheck(this.state.email))
    {
      this.setState({
        waiting:true
      });
      //Send Request logic ...
    }else{


    }

  }

  render()
  {
    var waiter;
    if(this.state.waiting)
    {
      waiter = (<Waiter waitingState={this.state.waitingState}/>);
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
          <Header icon={faLock} title=" Authentication required!"/>
          <Auth enable={this.state.page!="register"} helpButton={this.helpButton} mailCallback={this.mailCallback}/>
          {waiter}
          {content}
          <Footer page={this.helpButton} continue={this.continue} />
        </div>
    );
  }
}
export default FCA;
