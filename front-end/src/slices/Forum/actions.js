import {buildUrl} from '../../infrastructure/api/config';

export const getDiscussions = () => {
    return fetch(buildUrl('posts/get_discussions.php'), {
        method: 'GET',
        mode: 'cors',
    });
}