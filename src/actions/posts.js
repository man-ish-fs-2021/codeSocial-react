import { UPDATE_POSTS } from './actiontypes';

export function fetchPosts() {
  return (dispatch) => {
    const url =
      'http://codeial.codingninjas.com:8000/api/v2/posts?page=1&limit=5';
    fetch(url, {})
      .then((response) => response.json())
      .then((data) => dispatch(updatePosts(data.data.posts)))
      .catch((err) => console.log('Error in fetching posts', err));
  };
}

export function updatePosts(posts) {
  return { type: UPDATE_POSTS, posts: posts };
}
