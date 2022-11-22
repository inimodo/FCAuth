import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight,faHandshake} from '@fortawesome/free-solid-svg-icons'

function Footer(props)
{
  return (
    <div>
    <p className="helplink" onClick={()=>props.page("tos")}><FontAwesomeIcon icon={faHandshake} /> Terms of Service</p>
    <button className="send" onClick={props.continue}>Continue <FontAwesomeIcon icon={faArrowRight} /></button>
    </div>
  );
}
export default Footer;
