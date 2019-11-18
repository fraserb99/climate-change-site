import React from 'react';
import { buildUrl } from '../../infrastructure/api/config';

export const logIn = (values) => {
    return fetch(buildUrl('users/login.php'), {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
        "username": values.username,
        'password': values.password
        }),
        headers: {'Content-Type':'application/json; charset=UTF-8'},
    });
}

export const createAccount = (values) => {
    return fetch(buildUrl('users/new_user.php'), {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
            "username": values.username,
            'password': values.password,
            'email': values.email
        }),
        headers: {'Content-Type':'application/json; charset=UTF-8'},
    });
}