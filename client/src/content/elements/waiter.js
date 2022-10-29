import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLockOpen,faCircleCheck,faLock,faArrowRight,faCircleQuestion,faQuestion,faHandshake,faUserPlus,faGear,faRotateRight,faCircleExclamation,faXmark} from '@fortawesome/free-solid-svg-icons'
import Header from './header.js';
import Footer from './footer.js';
function Waiter(props)
{
  var content;
  switch (props.waitingState) {
    case 0:
    content=(
      <div>
        <Header icon={faGear} title=" Validation ..." spin={true}/>
        <div className="fca_subunit">
          <a className="loadingtext">Please check your mails and click the link to proceed.</a>
          <a className="loadingtext">No mail recieved?</a>
          <a className="link"><FontAwesomeIcon icon={faRotateRight}/> Resend</a>
        </div>
      </div>
    );
      break;
    case 1:
    content=(
      <div>
        <Header icon={faCircleExclamation} title=" Access denied!" spin={false} color={"#ff7b7b"}/>
        <div className="fca_subunit" style={{borderColor:"#ff7b7b"}}>
          <a className="loadingtext">This mail is not whitelisted to access this site!</a>
        </div>
        <Header icon={faLock}/>
      </div>
    );
      break;
    case 2:
    content=(
      <div>
        <Header icon={faGear} title=" Validation ..." />
        <div className="fca_subunit" style={{opacity:"50%"}}>
          <a className="loadingtext">Please check your mails and click the link to proceed.</a>
          <a className="loadingtext">No mail recieved?</a>
        </div>
        <Header icon={faCircleCheck} title=" Passed!" color={"#7dff7b"}/>
        <div className="fca_subunit" style={{borderColor:"#7dff7b"}} >
          <a className="loadingtext">Redirecting to </a>
          <a className="link">{"https://www.example.com/"}</a>
        </div>
        <Header icon={faLockOpen} />
      </div>
    );
      break;
    default:

  }
  return content;
}
export default Waiter;
