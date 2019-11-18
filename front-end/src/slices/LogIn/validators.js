import React from 'react';

export const validateLogin = (values) => {
    const errors = {};

    if (!values.username) {
        errors.username = 'Please enter a username';
    }

    if (!values.password) {
        errors.password = 'Please enter your password';
    }

    return errors;
}