import React from 'react';
import { buildUrl } from '../../infrastructure/api/config';

export const logIn = (values) => {
    return fetch(buildUrl('models/login.php'), {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify({
        "username": values.username,
        'password': values.password
        }),
        headers: {'Content-Type':'application/json; charset=UTF-8'},
    });
}