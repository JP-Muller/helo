import React, { Component } from 'react'
import { connect } from 'react-redux'
import { editPost, addComment, getComments } from '../../Redux/postReducer'
import './Post.css'

export class Post extends Component {
    constructor() {
        super()
        this.state = {
            editing: false,
            newTitle: '',
            newImage: '',
            newContent: '',
            newComment: ''

        }
    }
    componentDidMount = () => {
        let { selectedPost, comments } = this.props.posts
        console.log(selectedPost.post_id)
        console.log(selectedPost)
        // let postId = selectedPost[0].post_id
        this.props.getComments()


    }

    handleChange = e => {
        let { name, value } = e.target;
        this.setState({ [name]: value })
        console.log(`${name}:`, value)
    }

    handleEditing = () => {
        let { editing } = this.state
        this.setState({
            editing: !editing
        })
    }

    saveChanges = () => {
        let { newTitle, newImage, newContent, editing } = this.state
        let { selectedPost } = this.props.posts
        let postId = selectedPost[0].post_id
        console.log('postId:', postId)
        if (newTitle === '') {
            newTitle = selectedPost[0].title
        }
        if (newImage === '') {
            newImage = selectedPost[0].img
        }
        if (newContent === '') {
            newContent = selectedPost[0].content
        }
        this.props.editPost(postId, newTitle, newImage, newContent)
        this.setState({ editing: !editing })
    }

    addComment = () => {
        let date = new Date().toDateString()
        let { newComment } = this.state
        let { selectedPost } = this.props.posts
        let postId = selectedPost[0].post_id
        this.props.addComment(postId, newComment, date)
        this.setState({
            newComment: ''
        })

    }

    render() {
        let { editing, newImage, newComment } = this.state
        let { selectedPost, comments } = this.props.posts
        let { user, profilePic } = this.props.user
        if (selectedPost && selectedPost[0] && selectedPost[0].id) {
            return (
                <div className='Post'>
                    {editing ? (<div className='content-box post-box'>
                        <div className='post-header'>
                            <div style={{ display: 'flex' }}>
                                <h2 class='title'><input type='text' defaultValue={selectedPost[0].title} name='newTitle' onClick={this.handleChange} onChange={this.handleChange} /></h2>
                                {user.username === selectedPost[0].username ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '5px' }}><i className="far fa-save" onClick={this.saveChanges} /></div> : null}
                            </div>
                            <div className='author-box'>
                                <p>by {selectedPost[0].username}</p>
                                <img src={selectedPost[0].profilepic} alt='author' />
                            </div>
                        </div>
                        <div className='post-content-box'>
                            <div className='post-img' alt='post' style={{ backgroundImage: newImage.length > 0 ? `url(${newImage})` : `url(${selectedPost[0].img})` }}>
                                <input type='text' defaultValue={selectedPost[0].img} name='newImage' onClick={this.handleChange} onChange={this.handleChange} />
                            </div>
                            {/* <p>{selectedPost[0].content}</p> */}
                            <textarea className='editing-content' onClick={this.handleChange} onChange={this.handleChange} name='newContent'>{selectedPost[0].content}</textarea>
                        </div>
                    </div>) : (<div className='content-box post-box'>
                        <div className='post-header'>
                            <div style={{ display: 'flex' }}>
                                <h2 class='title'>{selectedPost[0].title}</h2>
                                {user.username === selectedPost[0].username ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginLeft: '5px' }}><i className="far fa-edit" onClick={this.handleEditing} /></div> : null}
                            </div>
                            <div className='author-box'>
                                <p>by {selectedPost[0].username}</p>
                                <img src={selectedPost[0].profilepic} alt='author' />
                            </div>
                        </div>
                        <div className='post-content-box'>
                            <div className='post-img' alt='post' style={{ backgroundImage: `url(${selectedPost[0].img})` }}></div>
                            <p>{selectedPost[0].content}</p>
                        </div>
                    </div>)}
                    <div className='comments-container content-box'>
                        <div className='user-profile'><img src={profilePic} /></div>
                        <textarea className='comment-textbox' placeholder='Add comment here...' value={newComment} name='newComment' onChange={this.handleChange} style={{ minHeight: '40px', minWidth: '83%' }}></textarea>
                        <div className='post-comment-icon' onClick={this.addComment}><i className="fas fa-arrow-right" /></div>
                    </div>
                    <div className='content-box'>
                        {comments && comments.length ? comments.map(comment => {
                            if (comment.postid === selectedPost[0].post_id) {
                                return (<div className='comment-container'>
                                    <div className='poster-info'>
                                        <img src={comment.profilepic} alt='User' />
                                        <p>{comment.username}</p>
                                    </div>
                                    <div className='comment-content'><p>{comment.comment}</p></div>
                                    <div className='comment-timestamp'>{comment.date_posted}</div>

                                </div>)
                            }
                        }) : null}



                    </div>

                </div>
            )
        } else return <div>WOOPS</div>
    }
}
function mapStateToProps(state) {
    return {
        user: state.user,
        posts: state.posts
    }
}

export default connect(
    mapStateToProps, { editPost, addComment, getComments }
)(Post);

