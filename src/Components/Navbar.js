import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Navbar extends Component {
    state = {  }
    render() { 
        return ( 
                <header>
                    <Link href="" className="logo">Health<span>Ereum</span></Link>
                    <ul>
                        <li><Link to="/" className="active">Home</Link></li>
                        <li><Link to="/Home" >Menu</Link></li>
                        <li><Link to="/About">Contact</Link></li>
                        <li><Link style={{fontWeight:800,border:"2px solid #78ff00"}} to="/Contact">Login</Link></li>
                    </ul>
                </header>
         );
    }
}
 
export default Navbar;