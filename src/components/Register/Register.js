import React from 'react';

class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            name: ''
        }
    }

    onEmailChange = (event)=>{
        this.setState({email: event.target.value});
    }
    
    onPasswordChange = (event)=>{
        this.setState({password: event.target.value});
    }
    onNameChange = (event) =>{
        this.setState({name: event.target.value});
    }

    onSubmitButton = () =>{
        let bodyContent = JSON.stringify({
            email: this.state.email,
            password: this.state.password,
            name: this.state.name
        });
        console.log("body content" + bodyContent);
        fetch('http://localhost:3001/register', 
           { method: 'post',
            headers: {'Content-Type':'application/json'},
            body: bodyContent
            }
        )
        .then(response =>{
            console.log("response " + response)
            return response.json()
        } )
        
        .then(user =>{
            console.log("hello")
            if(user.id){
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            }
            else{
                alert("failed to register " + JSON.stringify(user));
            }
            
        })
        console.log(bodyContent);
    }

    render(){

        return(     
            <article className="br2 ba dark-gray b--black-10 mv4 w-100 w-50-m w-25-l mw5 center shados-5">
                <main className="pa4 black-80">
            <form className="measure">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                <legend className="f1 fw6 ph0 mh0">Register</legend>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="firstName">Name</label>
                    {/* I deleted input-reset class from Name input field */}
                    <input className="pa2 ba bg-transparent hover-bg-black hover-white w-100" 
                    onChange = {this.onNameChange}
                    type="email" 
                    name="email-address" 
                    id="email-address"/>
                </div>
                <div className="mt3">
                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                    <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                    onChange = {this.onEmailChange}
                    type="email"
                    name="email-address" 
                    id="email-address"/>
                </div>
                <div className="mv3">
                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                    <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                    onChange = {this.onPasswordChange}
                    type="password" 
                    name="password"  
                    id="password"/>
                </div>
                </fieldset>
                <div>
                    <input onClick = {this.onSubmitButton}
                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib pointer" 
                    type="submit"
                    value="Sign up"/>
                </div>  
            </form>
        </main>
    </article>
       
       );
    }

    
}
export default Register;