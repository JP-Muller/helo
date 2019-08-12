import React, { Component } from 'react'
import './Form.css'
import { addPost, saveDraftTitle, saveDraftImage, saveDraftContent } from '../../Redux/postReducer'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

export class Form extends Component {
    constructor() {
        super()
        this.state = {
            title: '',
            imageUrl: '',
            content: ''
        }
    }

    componentDidMount = () => {
        console.log(this.props.posts)
        this.setState({
            title: this.props.posts.draftTitle,
            imageUrl: this.props.posts.draftImageUrl,
            content: this.props.posts.draftContent
        })
    }

    handleChange = e => {
        let { title, imageUrl, content } = this.state
        let { name, value } = e.target;
        this.setState({ [name]: value }, () => {
            if (name === 'title') {
                this.props.saveDraftTitle(title)
                console.log('title shot out')
            } else if (name === 'imageUrl') {
                this.props.saveDraftImage(imageUrl)
            } else if (name === 'content') {
                this.props.saveDraftContent(content)
                console.log(this.props.posts.draftContent)
            }
        })

        console.log(`${name}:`, value)
    }

    savePost = () => {
        let { title, imageUrl, content } = this.state
        this.props.addPost(title, imageUrl, content)
    }

    render() {
        let { title, content, imageUrl } = this.state
        return (
            <div className='Form content-box'>
                <h2 className='title'>New Post</h2>
                <div className='form-input-box'>
                    <p>Title:</p>
                    <input name='title' defaultValue={title} type='text' onChange={this.handleChange} />
                </div>
                <div className='form-img-prev' alt='preview' style={{ backgroundImage: `url(${imageUrl})` }}> </div>
                <div className='form-input-box'>
                    <p>Image URL:</p>
                    <input name='imageUrl' defaultValue={imageUrl} type='text' onChange={this.handleChange} />
                </div>
                <div className='form-text-box'>
                    <p>Content:</p>
                    <textarea name='content' onChange={this.handleChange} value={content}></textarea>
                </div>
                <a href='#/dashboard'><button className='dark-button form-button' onClick={this.savePost}>Post</button></a>

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
    mapStateToProps, { addPost, saveDraftTitle, saveDraftImage, saveDraftContent }
)(Form);
