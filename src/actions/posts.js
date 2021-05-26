import { UPDATE_POSTS } from './actiontypes';
import { APIUrls } from '../helpers/urls';

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
