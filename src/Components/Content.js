import React, { Component, Fragment } from 'react';
import {Link} from 'react-router-dom';
import Navbar from './Navbar';

class Content extends Component {
    state = {  }
    slides;
    slidetext;
    index;
    componentDidMount(){
        var slideshow = document.getElementById('slideshow');
        var slideshowtext = document.getElementById('slideshowtext');
        
        this.slides = this.slideshow.children;
        this.slidetext=this.slideshowtext.children;
        console.log(this.slidetext);
        
        this.index = 0;
    }

    
    render() { 

       
        const nextSlide =()=>{
            this.slides[this.index].classList.remove('active');
            this.slidetext[this.index].classList.remove('active');

            this.index= (this.index + 1)%this.slides.length;

            this.slides[this.index].classList.add('active');
            this.slidetext[this.index].classList.add('active');
        }

        const prevSlide =()=>{
            this.slides[this.index].classList.remove('active');
            this.slidetext[this.index].classList.remove('active');

            this.index= (this.index - 1 + this.slides.length)%this.slides.length;
            
            this.slides[this.index].classList.add('active');
            this.slidetext[this.index].classList.add('active');
            
        }

       /* const nextSlideText =()=>{
            this.slidetext[this.index].classList.remove('active');
            this.index= (this.index + 1)%this.slidetext.length;
            this.slidetext[this.index].classList.add('active');
        }

        const prevSlideText =()=>{
            this.slidetext[this.index].classList.remove('active');
            this.index= (this.index - 1 + this.slidetext.length)%this.slidetext.length;
            this.slidetext[this.index].classList.add('active');
        }*/

        const slideahead=()=>{
            nextSlide();
            /*nextSlideText();*/
        }

        const slidebehind=()=>{
            prevSlide();
            /*prevSlideText();*/
        }


        return ( 
            <Fragment>
                <Navbar/>
                <div className="content">
                <div className="bannerText" id="slideshowtext" ref={d=> this.slideshowtext= d}>
                    <div className="active">
                        <h2 style={{fontWeight:"bolder"}}>EAT Healthy<br></br>Stay Healthy</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p>
                        <Link to="#">Read More</Link>
                    </div>
                    <div>
                        <h2 style={{fontWeight:"bolder"}}>EAT Your<br></br>Veggies</h2>
                        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <Link to="#">Read More</Link>
                    </div>
                    <div>
                        <h2 style={{fontWeight:"bolder"}}>Good Food<br></br>Good Mood</h2>
                        <p>Quam pellentesque nec nam aliquam sem et. Rutrum quisque non tellus orci ac auctor augue mauris augue. Non arcu risus quis varius quam quisque id diam.</p>
                        <Link to="#">Read More</Link>
                    </div>
                    
                </div>
                <div className="bannerImg" id="slideshow" ref={c=> this.slideshow = c}>
                    <img className="active" src={require("../assets/img1.jpeg")} alt=""/>
                    <img src={require("../assets/img2.jpeg")} alt=""/>
                    <img src={require("../assets/img3.jpeg")} alt=""/>
                </div>

            </div>
            <div className="icons">
                <ul className="sci">
                    <li><Link to="#"><img src={require("../assets/fb.png")} alt=""/></Link></li>
                    <li><Link to="#"><img src={require("../assets/ins.png")} alt=""/></Link></li>
                    <li><Link to="#"><img src={require("../assets/tw.png")} alt=""/></Link></li>
                </ul>
                <ul className="controls">
                    <li><Link><img src={require("../assets/la.png")} onClick={()=>slideahead()} alt=""/></Link></li>
                    <li><Link><img src={require("../assets/ra.png")} onClick={()=>slidebehind()} alt=""/></Link></li>
                </ul>
            </div>
            </Fragment>
         );
    }
}
 
export default Content;

