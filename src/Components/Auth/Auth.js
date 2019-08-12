import React, { Component } from 'react'
import { login, signup } from '../../Redux/userReducer.js';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'

export class Auth extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: ''
        }
    }

    handleChange = e => {
        let { name, value } = e.target;
        this.setState({ [name]: value })
    }

    loginUser = () => {
        this.props.login(this.state.username, this.state.password);

    };

    signupUser = () => {
        let profilePic = `https://robohash.org/${this.state.username}`
        this.props.signup(this.state.username, this.state.password, profilePic)
    }

    render() {
        let { user } = this.props;
        if (user.loggedIn) return <Redirect to="/dashboard" />;
        return (
            <div className='auth-master'>
                <div className='auth-container'>
                    <div className='helo-image'>
                        <img src='https://firebasestorage.googleapis.com/v0/b/better-everyday-a2a36.appspot.com/o/download.png?alt=media&token=64ee7a4c-9479-4570-a534-a7bd2c6e7cab' alt='icon' />
                    </div>
                    <h1 class="auth-title">Helo</h1>
                    <div className='auth-input-div'>
                        <p>Username</p>
                        <input type='text' name='username' onChange={this.handleChange} />
                    </div>
                    <div className='auth-input-div'>
                        <p>Password:</p>
                        <input type='password' name='password' onChange={this.handleChange} />
                    </div>
                    <div className='auth-buttons'>
                        <button className='dark-button' onClick={this.loginUser}>Login</button>
                        <button className='dark-button' onClick={this.signupUser}>Register</button>
                    </div>
                    <div>

                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return state.user;
}
export default connect(
    mapStateToProps,
    { login, signup }
)(Auth);