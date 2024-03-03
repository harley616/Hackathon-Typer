import React from 'react';
import {Link} from 'react-router-dom';

function Navlink(props){
    return (
        <Link className='m-1' to={props.to}>{props.text}</Link>
    );
}
export default function NavBar() {
  return (
    <div>
        <Navlink to="/game" text="Game" />
        <Navlink to='/login' text='Login' />
        <Navlink to='/' text = 'Home' />
    </div>
  );
}