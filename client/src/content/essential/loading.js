import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear,faRotateRight} from '@fortawesome/free-solid-svg-icons'
import '../../css/loading.css';
function LoadingScreen()
{
  return  (
    <div>
      <a className="loadingico"><FontAwesomeIcon icon={faGear} spin /></a>
      <a className="loadingtext">Please check your mails and click the link to proceed.</a>
      <a className="loadingtext">No mail recieved?</a>
      <a className="resend"><FontAwesomeIcon icon={faRotateRight}/> Resend</a>
    </div>
  );
}
export default LoadingScreen;
