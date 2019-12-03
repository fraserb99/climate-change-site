
export const validateCO2Form = values => {
    const errors = {};

    validateDistance(values, errors);
    validateType(values, errors);

    return errors;
}

const validateDistance = (values, errors) => {
    if (!values.distance) {
        errors.distance = 'Distance is required';
    }

    if (!parseFloat(values.distance)) {
        errors.distance = 'Distance must be a number';
    }
}

const validateType = (values, errors) => {
    if (!values.type) {
        errors.type = 'Journey type is required';
    }
}