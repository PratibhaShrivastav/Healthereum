import React, { Component } from 'react';
import { MDBListGroup, MDBListGroupItem, MDBContainer } from "mdbreact";

class UserInfo extends Component {
    state = {  }
    render() { 
        return ( 
            <div basic-info>
                <div style={{display:"flex",justifyContent:"center",alignItems:"center",marginBottom:"70px"}}>
                    <img style={{width:"200px",height:"230px"}} src={require("../../assets/user3.png")} alt=""/>
                </div>
                <h3 style={{display:"flex",justifyContent:"center",alignItems:"center",color:"white",fontWeight:"bolder"}}>User Name</h3>
                <h5 style={{display:"flex",justifyContent:"center",alignItems:"center",color:"white",fontWeight:"bolder"}}>User Address</h5>
                <h5 style={{display:"flex",justifyContent:"center",alignItems:"center",color:"white",fontWeight:"bolder"}}>User Telephone</h5>                          
            </div>
         );
    }
}
 
export default UserInfo;