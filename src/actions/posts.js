import { UPDATE_POSTS, ADD_POST, ADD_COMMENT } from './actiontypes';
import { APIUrls } from '../helpers/urls';
import { getFormBody } from '../helpers/utils';

export function fetchPosts() {
  return (dispatch) => {
    const url = APIUrls.fetchPosts();
    fetch(url, {})
      .then((response) => response.json())
      .then((data) => dispatch(updatePosts(data.data.posts)))
      .catch((err) => console.log('Error in fetching posts', err));
  };
}

export function updatePosts(posts) {
  return { type: UPDATE_POSTS, posts: posts };
}

export function addPost(post) {
  return {
    type: ADD_POST,
    post,
  };
}

export function createPost(content) {
  return (dispatch) => {
    const url = APIUrls.createPost();
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        body: getFormBody({ content }),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('psot data', data);
        if (data.success) {
          dispatch(addPost(data.data.post));
          return;
        }
      });
  };
}

export function createComment(content, postId) {
  return (dispatch) => {
    const url = APIUrls.addComment();
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: getFormBody({ content, post_id: postId }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          console.log('comment data', data);
          dispatch(addComment(data.data.comment, postId));
        }
      });
  };
}

export function addComment(comment, postId) {
  return { type: ADD_COMMENT, comment, postId };
}
