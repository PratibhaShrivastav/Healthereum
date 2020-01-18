import React, { Component, Fragment } from 'react';
import Logo from '../logo';
import './style.css';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardHeader, MDBCardFooter, MDBBtn, MDBContainer } from
"mdbreact";
import UserInfo from '../Doctor/right-panel';

class PatientHistory extends Component {
    state = {  }
    render() { 
        return ( 
            <div>
                <Logo/>
                <h2 className="header-down-logo" style={{fontWeight:"bold"}}>Patients History</h2>
                      <ul class="timeline">
  <li class="timeline-event">
    <label class="timeline-event-icon"></label>
    <div class="timeline-event-copy">
      <p class="timeline-event-thumbnail">24 April 2011</p>
      <h3 class="h33">Malaria</h3>
      <h4 class="h44">Added By - Dr Shinchan</h4>
      <p><strong>Remarks</strong><br></br>Entwickeln von anspruchsvollen, animierten, responsive und adaptive Webseiten mit HTML5, SCSS, jQuery; für alle Browser, optimiert für Desktop, Notebook, Smartphones und Tablets (iOS, Android, Windows).</p>
      <p><strong>Medicines</strong><br></br>Ständiges Verbessern des agilen Entwicklungsprozesses beispielsweise durch Grunt, Yeoman, GIT, JIRA und BrowserStack.</p>
    </div>
  </li>
  <li class="timeline-event">
    <label class="timeline-event-icon"></label>
    <div class="timeline-event-copy">
      <p class="timeline-event-thumbnail">25 November 2015</p>
      <h3 class="h33">Knee Pain</h3>
      <h4 class="h44">Added By - Dr Hagemaru</h4>
      <p><strong>Remarks</strong><br></br> Design und Produktion von Digitalen Magazinen mit InDesign, der Adobe Digital Publishing Suite und HTML5. Co-Autorin der Fachbücher "Digitales Publizieren für Tablets" und "Adobe Digital Publishing Suite" erschienen im dpunkt.verlag.</p>
      <p><strong>Medicines</strong><br></br> Design und Produktion von Digitalen Magazinen mit InDesign, der Adobe Digital Publishing Suite und HTML5. Co-Autorin der Fachbücher "Digitales Publizieren für Tablets" und "Adobe Digital Publishing Suite" erschienen im dpunkt.verlag.</p>
    </div>
  </li>
  <li class="timeline-event">
    <label class="timeline-event-icon"></label>
    <div class="timeline-event-copy">
      <p class="timeline-event-thumbnail">5 April 2017</p>
      <h3 class="h33">Fever</h3>
      <h4 class="h44">Added By - Dr Nobita</h4>
      <p><strong>Remarks</strong><br></br>Konzeption und Modellierung von Systemen und APIs für Digital Publishing und Entitlement nach SOA</p>
      <p><strong>Medicines</strong><br></br>Konzeption und Modellierung von Systemen und APIs für Digital Publishing und Entitlement nach SOA</p>
    </div>
  </li>
</ul>
<UserInfo/>
            </div>
         );
    }
}
 
export default PatientHistory;