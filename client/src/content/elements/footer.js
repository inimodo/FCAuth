import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock,faArrowRight,faCircleQuestion,faQuestion,faHandshake,faUserPlus} from '@fortawesome/free-solid-svg-icons'

function Footer(props)
{
  return (
    <div>
    <a className="helplink" onClick={()=>props.page("tos")}><FontAwesomeIcon icon={faHandshake} /> Terms of Service</a>
    <a className="helplink" onClick={()=>props.page("help")}><FontAwesomeIcon icon={faCircleQuestion} /> Need Help</a>
    <a className="helplink" onClick={()=>props.page("register")}><FontAwesomeIcon icon={faUserPlus} /> Register me</a>
    <button className="send" onClick={props.send}>Continue <FontAwesomeIcon icon={faArrowRight} /></button>
    </div>
  );
}
export default Footer;
