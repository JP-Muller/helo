import axios from 'axios';
import { ADD_POST, SAVE_DRAFT_CONTENT, SAVE_DRAFT_TITLE, SAVE_DRAFT_IMAGE, GET_POSTS, GET_SELECTED_POST, EDIT_POST, ADD_COMMENT, GET_COMMENTS } from './actionTypes';

const initialState = {
    allPosts: {},
    postsWithoutUser: {},
    draftTitle: '',
    draftImageUrl: 'https://firebasestorage.googleapis.com/v0/b/better-everyday-a2a36.appspot.com/o/previewImage.jfif?alt=media&token=bb035c36-2368-4651-94ab-a38e6d0e1a2c',
    draftContent: '',
    selectedPost: {},
    comments: {}

}

export const addPost = (title, imageUrl, content) => {
    let data = axios.post('/api/addpost', { title, imageUrl, content })
        .then(res => res.data)
    return {
        type: ADD_POST,
        payload: data
    }

}

export const saveDraftTitle = (str) => {
    let data = str
    return {
        type: SAVE_DRAFT_TITLE,
        payload: data
    }
}
export const saveDraftImage = (str) => {
    let data = str
    return {
        type: SAVE_DRAFT_IMAGE,
        payload: data
    }
}
export const saveDraftContent = (str) => {
    let data = str
    return {
        type: SAVE_DRAFT_CONTENT,
        payload: data
    }
}

export function editPost(postId, newTitle, newImage, newContent) {
    let data = axios
        .put(`/api/editpost/${postId}`, { newTitle, newImage, newContent })
        .then(res => res.data);
    return {
        type: EDIT_POST,
        payload: data
    };
}

export const getPosts = () => {
    let data = axios.get('/api/getposts')
        .then(res => res.data)
    return {
        type: GET_POSTS,
        payload: data
    }
}

export const getSelectedPost = (postId) => {
    let data = axios.get(`/api/selected/${postId}`)
        .then(res => res.data)
    console.log('SELECTED POST', data)
    return {
        type: GET_SELECTED_POST,
        payload: data
    }
}

export const addComment = (postId, newComment, date) => {
    let data = axios.post('/api/addcomment', { postId, newComment, date })
        .then(res => res.data)
    console.log('ADDED COMMENTS', data)
    return {
        type: ADD_COMMENT,
        payload: data
    }
}

export const getComments = () => {
    let comments = axios.get('/api/getcomments')
        .then(res => res.data)
    console.log('CURRENT COMMENTS', comments)
    return {
        type: GET_COMMENTS,
        payload: comments
    }
}



export default function (state = initialState, action) {
    let { type, payload } = action
    // console.log('action:', action)
    switch (type) {
        case SAVE_DRAFT_TITLE:
            return {
                ...state,
                draftTitle: payload
            }
        case SAVE_DRAFT_CONTENT:
            return {
                ...state,
                draftContent: payload
            }
        case SAVE_DRAFT_IMAGE:
            return {
                ...state,
                draftImageUrl: payload
            }

        case ADD_POST + '_FULFILLED':
            console.log('Add post payload:', payload)
            return {
                ...state,
                allPosts: payload,
                draftImageUrl: 'https://firebasestorage.googleapis.com/v0/b/better-everyday-a2a36.appspot.com/o/previewImage.jfif?alt=media&token=bb035c36-2368-4651-94ab-a38e6d0e1a2c',
                draftContent: '',
                draftTitle: ''
            };
        case GET_POSTS + '_FULFILLED':
            return {
                ...state,
                allPosts: payload
            }
        case GET_SELECTED_POST + '_FULFILLED':
            return {
                ...state,
                selectedPost: payload
            }
        case EDIT_POST + '_FULFILLED':
            return { ...state, selectedPost: payload }
        case ADD_COMMENT + '_FULFILLED':
            return { ...state, comments: payload }
        case GET_COMMENTS + '_FULFILLED':
            return { ...state, comments: payload }
        default:
            return state
    }
}