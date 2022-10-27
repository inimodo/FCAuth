import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Header(props)
{
  return (
    <h1 className="title"><FontAwesomeIcon icon={props.icon} />{props.title}</h1>
  );
}
export default Header;
