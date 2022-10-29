import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Header(props)
{
  if(props.spin)
  {
    return (
      <h1 className="title" style={{color:props.color}}><FontAwesomeIcon icon={props.icon} spin/>{props.title}</h1>
    );
  }
  return (
    <h1 className="title" style={{color:props.color}}><FontAwesomeIcon icon={props.icon} />{props.title}</h1>
  );
}
export default Header;
