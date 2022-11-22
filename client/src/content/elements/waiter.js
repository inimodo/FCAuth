import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLockOpen,faCircleCheck,faLock,faGear,faRotateRight,faCircleExclamation} from '@fortawesome/free-solid-svg-icons'
import Header from './header.js';

function Waiter(props)
{
  var content;
  switch (props.waitingState) {
    case 0:
    content=(
      <div>
        <Header icon={faGear} title=" Validation ..." spin={true}/>
        <div className="fca_subunit">
          <p className="loadingtext">Please check your mails and click the link to proceed.</p>
          <p className="loadingtext">No mail recieved?</p>
          <p className="link" onClick={props.resend}><FontAwesomeIcon icon={faRotateRight}/> Resend</p>
          <p className="loadingtext">{props.error}</p>
        </div>
      </div>
    );
      break;
    case 1:
    content=(
      <div>
        <Header icon={faCircleExclamation} title=" Access denied!" spin={false} color={"#ff7b7b"}/>
        <div className="fca_subunit">
          <p className="loadingtext">{props.error}</p>
        </div>
        <Header icon={faLock}/>
      </div>
    );
      break;
    case 2:
    content=(
      <div>
        <Header icon={faGear} title=" Validation ..." />
        <div className="fca_subunit">
          <p className="loadingtext">Please check your mails and click the link to proceed.</p>
          <p className="loadingtext">No mail recieved?</p>
        </div>
        <Header icon={faCircleCheck} title=" Passed!" color={"#7dff7b"}/>
        <div className="fca_subunit" >
          <p className="loadingtext">Redirecting to </p>
          <p className="link">{props.url}</p>
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
