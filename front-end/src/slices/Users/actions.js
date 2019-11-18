import { buildUrl } from '../../infrastructure/api/config';
import { getCookie } from '../../infrastructure/login/sessions';

export const getUser = (id) => {
    return fetch(buildUrl(`users/get.php?id=${id}`), {
        method: 'GET',
        mode: 'cors',
        headers: {'Content-Type':'application/json; charset=UTF-8',
            'Authorization' : `Bearer ${getCookie('jwt')}`},
    });
}