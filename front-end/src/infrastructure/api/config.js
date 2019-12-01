import { getCookie } from '../login/sessions';

export const API_URL = 'https://devweb2019.cis.strath.ac.uk/cs312ab/api/';
export const GOOGLE_KEY = 'AIzaSyAqMFsfOnfyBeTCg6kK21zPnLrNUvs1VIs';

export const buildUrl = (segment) => API_URL + segment;

export const apiRequest = (url, opts, authorise) => {
    return fetch(url, {
            ...opts,
            headers: {...opts.headers, 'Authorization' : `Bearer ${getCookie('jwt')}`}
        })
        .then(response => {
            if (!response.ok) {
                throw new Error();
            }

            return response.json();
        })
}