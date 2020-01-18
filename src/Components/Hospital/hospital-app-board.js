import React,{Fragment,Component} from 'react';
import {MDBBtn, MDBDataTable, MDBBadge } from 'mdbreact';
import Logo from '../logo';
import UserInfo from '../Doctor/right-panel';

let a=0;

class DatatablePage extends Component {

    button =()=>{
        if(a===0){
            return(
                <Fragment>
                    <MDBBtn  outline color="success" style={{margin:"20px",color:"white",fontWeight:"bold"}}>Accept</MDBBtn>
                    <MDBBtn outline color="danger" style={{margin:"20px",color:"white",fontWeight:"bold"}}>Decline</MDBBtn>
                    <label style={{margin:"15px"}}>Status:<MDBBadge style={{marginLeft:"15px",padding:"5px"}} color="primary">New</MDBBadge></label>
                </Fragment>
            )
        }
    
        if(a===1){
            return(
                <Fragment>
                    Select Doctors
                </Fragment>
            )
        }
    }


    state = { 
        data:{
            columns: [
                {
                  label: 'Name',
                  field: 'name',
                  sort: 'asc',
                  width: 100
                },
                {
                  label: 'Concern',
                  field: 'concern',
                  sort: 'asc',
                  width: 100
                },
                {
                  label: 'Age',
                  field: 'age',
                  sort: 'asc',
                  width: 100
                },
                {
                  label: 'Gender',
                  field: 'gender',
                  sort: 'asc',
                  width: 100
                },
                {
                  label: 'Accept/Reject',
                  field: 'status',
                  sort: 'asc',
                  width: 100
                }
              ],
              rows: [
                {
                  name: 'Tiger Nixon',
                  concern: 'Fever',
                  age: '61',
                  gender:'Male',
                  status:this.button()
                },
                {
                  name: 'Garrett Winters',
                  concern: 'Malaria',
                  age: '63',
                  gender:'Male',
                  status:this.button()
                },
                {
                  name: 'Ashton Cox',
                  concern: 'Weakness',
                  age: '66',
                  gender:'Male',
                  status:this.button()
                },
                {
                  name: 'Cedric Kelly',
                  concern: 'Knee Pain',
                  age: '22',
                  gender:'Male',
                  status:this.button()
                },
                {
                  name: 'Airi Satou',
                  concern: 'Visitor',
                  age: '33',
                  gender:'Male',
                  status:this.button()
                }
              ]
         }
        }

        
    render() { 
        return ( 
            <div className="hoverable" style={{fontWeight:"bold"}}>
                <Logo/>
                <h2 className="header-down-logo">Appointment Dashboard</h2>
                <MDBDataTable style={{width:"1300px"}}
                striped
                bordered
                hover
                data={this.state.data}
                />
               <div className="side-panel">
                    <UserInfo/>
               </div>


            </div>
         );
    }
}
 
export default DatatablePage;