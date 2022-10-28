import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock,faArrowRight,faCircleQuestion,faQuestion,faHandshake,faUserPlus,faGear,faRotateRight,faCircleExclamation,faXmark} from '@fortawesome/free-solid-svg-icons'
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
          <a className="resend"><FontAwesomeIcon icon={faRotateRight}/> Resend</a>
        </div>
      </div>
    );
      break;
    case 1:
    content=(
      <div>
        <Header icon={faCircleExclamation} title=" Access denied!" spin={false}/>
        <div className="fca_subunit">
          <a className="error">This mail is not whitelisted to access this site!</a>
        </div>
      </div>
    );
      break;
    case 2:
    content=(
      <div>
        <Header icon={faGear} title=" Validation ..." spin={true}/>
        <div className="fca_subunit">
          <a className="loadingtext">Please check your mails and click the link to proceed.</a>
          <a className="loadingtext">No mail recieved?</a>
          <a className="resend"><FontAwesomeIcon icon={faRotateRight}/> Resend</a>
        </div>
      </div>
    );
      break;
    default:

  }
  return content;
}
export default Waiter;
