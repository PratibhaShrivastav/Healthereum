import React, { Component } from 'react';
import {Link} from 'react-router-dom';

class Navbar extends Component {
    state = {  }
    render() { 
        return ( 
                <header>
                    <Link href="" className="logo">Health<span>Ereum</span></Link>
                </header>
         );
    }
}
 
export default Navbar;