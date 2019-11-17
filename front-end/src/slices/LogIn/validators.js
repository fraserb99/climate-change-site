import React from 'react';

export const validateLogin = (values) => (newAccount) => {
    const errors = {};

    if (!values.username) {
        errors.username = 'Please enter a username';
    }

    if (!values.password) {
        errors.password = 'Please enter your password';
    }

    if (newAccount && !values.email) {
        errors.email = 'Please enter an email';
    }

    return errors;
}