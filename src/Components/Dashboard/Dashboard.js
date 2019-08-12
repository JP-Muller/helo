import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPosts, getSelectedPost, getComments } from '../../Redux/postReducer'
import { Redirect } from 'react-router-dom'

export class Dashboard extends Component {
    constructor() {
        super()
        this.state = {
            searchInput: '',
            includeMyPosts: true
        }
    }

    componentDidMount = () => {
        this.props.getPosts()
        this.props.getComments()
        console.log('ALL POSTS:', this.props.posts.allPosts)
    }
    handleChange = e => {
        let { name, value } = e.target;
        this.setState({ [name]: value })
        console.log(`${name}:`, value)
    }

    handleCheckChange = () => {
        let { includeMyPosts } = this.state
        this.setState({
            includeMyPosts: !includeMyPosts
        })
        console.log('Include User Posts?', includeMyPosts)
    }

    resetSearch = () => {
        let { searchInput } = this.state
        this.setState({
            searchInput: ''
        })
    }

    render() {
        let { user, error, redirect } = this.props.user;
        let { allPosts } = this.props.posts
        let { searchInput, includeMyPosts } = this.state
        if (error || redirect) return <Redirect to="#/" />
        return (
            <div className='Dash'>
                <div className='content-box dash-filter'>
                    <div className='dash-search-box'>
                        <input type='text' value={searchInput} className='dash-search-bar' placeholder='Search by Title' name='searchInput' onChange={this.handleChange} />
                        {/* <img className='dash-search-button' src='https://firebasestorage.googleapis.com/v0/b/better-everyday-a2a36.appspot.com/o/download%20(1).png?alt=media&token=ba3c6bd7-8ede-4ae7-825f-89b76f7e5c7f' alt='search' /> */}
                        <button className='dark-button dash-reset' onClick={this.resetSearch}>Reset</button>
                    </div>
                    <div className='dash-check-box'>
                        <p>My Posts</p>
                        <input type='checkbox' value={includeMyPosts} name='includeMyPosts' onChange={this.handleCheckChange} checked={includeMyPosts} />
                    </div>
                </div>
                <div className='content-box dash-posts-container'>
                    {includeMyPosts && allPosts.length && searchInput.length ? allPosts.map(post => {
                        if (post.title.toLowerCase() === searchInput.toLowerCase()) {
                            return (
                                <a href={'#/post/' + post.id} onClick={() => this.props.getSelectedPost(post.id)}>
                                    <div className='content-box dash-post-box'>
                                        <h3>{post.title}</h3>
                                        <div className='author-box'>
                                            <p>by {post.username}</p>
                                            <img src={post.profilepic} alt='author' />
                                        </div>
                                    </div>
                                </a>)
                        } else return null
                    }) : !includeMyPosts && allPosts.length && searchInput.length ? allPosts.map(post => {
                        if (post.title === searchInput && post.userid !== user.id) {
                            return (
                                <a href={'#/post/' + post.id} onClick={() => this.props.getSelectedPost(post.id)}>
                                    <div className='content-box dash-post-box'>
                                        <h3>{post.title}</h3>
                                        <div className='author-box'>
                                            <p>by {post.username}</p>
                                            <img src={post.profilepic} alt='author' />
                                        </div>
                                    </div>
                                </a>)
                        } else return null
                    }) : includeMyPosts && allPosts.length ? allPosts.map((post, i) => {
                        return (
                            <a href={'#/post/' + post.id} onClick={() => this.props.getSelectedPost(post.id)}>
                                <div className='content-box dash-post-box'>
                                    <h3>{post.title}</h3>
                                    <div className='author-box'>
                                        <p>by {post.username}</p>
                                        <img src={post.profilepic} alt='author' />
                                    </div>
                                </div>
                            </a>
                        )
                    }) : !includeMyPosts && allPosts.length ? allPosts.map(post => {
                        if (post.userid !== user.id) {
                            return (
                                <a href={'#/post/' + post.id} onClick={() => this.props.getSelectedPost(post.id)}>
                                    <div className='content-box dash-post-box'>
                                        <h3>{post.title}</h3>
                                        <div className='author-box'>
                                            <p>by {post.username}</p>
                                            <img src={post.profilepic} alt='author' />
                                        </div>
                                    </div>
                                </a>)
                        } else return null
                    }) : null}

                </div>

            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        posts: state.posts
    }
}

export default connect(
    mapStateToProps, { getPosts, getSelectedPost, getComments }
)(Dashboard);
