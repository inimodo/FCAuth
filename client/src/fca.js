import React from 'react';
import Auth from './content/auth.js';
import Tos from './content/tos.js';
import Register from './content/register.js';
import Help from './content/help.js';
import Header from './content/elements/header.js';
import Footer from './content/elements/footer.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock,faArrowRight,faCircleQuestion,faQuestion,faHandshake,faUserPlus} from '@fortawesome/free-solid-svg-icons'
class FCA extends React.Component{
  constructor(props)
  {
    super(props);
    this.state = {
      page:""
    };
    this.helpButton = this.helpButton.bind(this);
    this.continue = this.continue.bind(this);
  }
  helpButton(page)
  {
    this.setState({page:page});
  }
  continue()
  {
    if(this.state.page=="")
    {
      this.setState({
        waiting:true
      });
      //Send Request logic ...
    }else{
      if(this.state.page=="register")
      {

      }else{
        this.setState({
          page:""
        });
      }

    }

  }

  render()
  {
    var content;
    switch (this.state.page) {
      case "register":
        content = (
          <div>
            <Header icon={faUserPlus} title=" Registration."/>
            <Register/>
          </div>
        );
        break;
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
          <Auth enable={this.state.page!="register"} helpButton={this.helpButton}/>
          {content}
          <Footer page={this.helpButton} send={this.continue} />
        </div>
    );
  }
}
export default FCA;
