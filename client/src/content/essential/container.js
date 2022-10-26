import React from 'react';

function Container(props) {
  return <div className={"fca_"+props.size}>{props.children}</div>;
}
export default Container;
