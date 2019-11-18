import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';

export const getCookie = (key) => Cookies.get(key);

export const getJWTUser = (jwt) => {
    const decoded = jwt_decode(jwt);
    return decoded.data;
}