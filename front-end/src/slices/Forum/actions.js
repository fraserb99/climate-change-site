import {buildUrl, apiRequest} from '../../infrastructure/api/config';

export const getDiscussions = () => {
    return fetch(buildUrl('posts/get_discussions.php'), {
        method: 'GET',
        mode: 'cors',
    }).then(response => response.json());
}

export const getPosts = (id) => {
    return fetch(buildUrl(`posts/get_posts.php?id=${id}`), {
        method: 'GET',
        mode: 'cors',
    }).then(response => response.json());
}

export const createPost = (values) => {
    return apiRequest(buildUrl(`posts/create_post.php`), {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(values)
    }, true);
}