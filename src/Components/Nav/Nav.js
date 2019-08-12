import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logout, getUser } from '../../Redux/userReducer.js';
import { Link, withRouter } from 'react-router-dom'

export class Nav extends Component {

    componentDidMount = () => {
        let { user, username, profilePic } = this.props
            this.props.getUser()
            console.log('Got User!')
    }
    render() {
        let { user, username, profilePic } = this.props
        if (this.props.location.pathname === '/') {
            return null
        } else
            return (

                <div className='nav-container'>
                    <div>
                        <div className='nav-profile-details'>
                            <img className='nav-profile-details-img' src={profilePic} alt='Profile Pic' />
                            <div><p>{username}</p></div>

                        </div>
                        <div className='home-and-post-links'>
                            <a href='#/dashboard'><img className='nav-img' src='https://firebasestorage.googleapis.com/v0/b/better-everyday-a2a36.appspot.com/o/helohome.png?alt=media&token=85d8e7a7-4c09-466f-aa78-b07c5b93f02b' alt='home' /></a>
                            <a href='#/new'><img className='nav-img' src='https://firebasestorage.googleapis.com/v0/b/better-everyday-a2a36.appspot.com/o/heloaddpost.png?alt=media&token=22d3f85f-832c-42e1-8b5c-77fd671d5afa' alt='add post' /></a>
                        </div>
                        <a href="#/" onClick={this.props.logout}><img class="nav-img logout" src="https://firebasestorage.googleapis.com/v0/b/better-everyday-a2a36.appspot.com/o/helologout.png?alt=media&token=71677bb9-3994-4f3b-84b0-5a0b46e293a6" alt="logout" /></a>
                    </div>
                </div>
            )
    }
}
function mapStateToProps(state) {
    return state.user;
}

export default connect(mapStateToProps, { logout, getUser })(withRouter(Nav))
