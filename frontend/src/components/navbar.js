import React from 'react';
import {Link} from 'react-router-dom';

function navlink(props){
    return (
        <Link to={props.to}>{props.text}</Link>
    );
}
export default function NavBar() {
  return (
    <div>
        
    </div>
  );
}