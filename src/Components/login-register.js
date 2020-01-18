import React, { Component } from 'react';

class LoginRegister extends Component {
    state = {  }

    componentDidMount(){
        const signUpButton = document.getElementById('signUp');
        const signInButton = document.getElementById('signIn');
        const containerrr = document.getElementById('containerrr');

        signUpButton.addEventListener('click',()=>{
            containerrr.classList.add("right-panel-active");
        })

        signInButton.addEventListener('click', () => {
            containerrr.classList.remove("right-panel-active");
        });
    }

    render() { 
        return ( 

            
                <div class="containerrr" id="containerrr">
                    <div class="form-containerrr sign-up-containerrr">
                        <form class="form" action="#">
                            <h1 class="h1">Create Account</h1>
                        
                            <span class="span">Use your email for registration</span>
                            <input class="input" type="text" placeholder="Name" />
                            <input class="input" type="email" placeholder="Email" />
                            <input class="input" type="password" placeholder="Password" />
                            <button class="button">Sign Up</button>
                        </form>
                    </div>
                    <div class="form-containerrr sign-in-containerrr">
                        <form class="form" action="#">
                            <h1 class="h1">Sign in</h1>
                            
                            <span class="span">with your account</span>
                            <input class="input" type="email" placeholder="Email" />
                            <input class="input" type="password" placeholder="Password" />
                            
                            <button class="button">Sign In</button>
                        </form>
                    </div>
                    <div class="overlay-containerrr">
                        <div class="overlay">
                            <div class="overlay-panel overlay-left">
                                <h1 class="h1">Welcome Back!</h1>
                                <p class="p">To keep connected with us please login with your personal info</p>
                                <button class="ghost button" id="signIn">Sign In</button>
                            </div>
                            <div class="overlay-panel overlay-right">
                                <h1 class="h1">Hello, Friend!</h1>
                                <p class="p">Enter your personal details and start journey with us</p>
                                <button class="ghost button" id="signUp">Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
            
        
         );
    }
}
 
export default LoginRegister;