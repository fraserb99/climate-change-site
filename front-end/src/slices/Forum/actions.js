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

export const likePost = (postId, userId) => {
    return apiRequest(buildUrl('posts/like.php'), {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
            postId,
            userId
        })
    })
}

export const getLikes = () => {
    return apiRequest(buildUrl('users/get_likes.php'), {
        method: 'GET',
        mode: 'cors',
    }, true)
}

export const unlikePost = (postId, userId) => {
    return apiRequest(buildUrl('posts/unlike.php'), {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
            postId,
            userId
        })
    }, true)
}

export const createDiscussion = (values) => {
    return apiRequest(buildUrl('posts/create_discussion.php'), {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(values)
    }, true)
}