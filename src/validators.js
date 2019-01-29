import {validateDate} from './utils';

export const required = value => 
    value ? undefined : 'Required';

export const nonEmpty = value =>
    value.trim() !== '' ? undefined : 'Cannot be empty';

export const isTrimmed = value =>
    value.trim() === value ? undefined : 'Cannot start or end with whitespace';

export const length = length => value => {
    if (length.min && value.length < length.min) {
        return `Must be at least ${length.min} characters long`;
    }
    if (length.max && value.length > length.max) {
        return `Must be at most ${length.max} characters long`;
    }
};

export const matches = field => (value, allValues) =>
    field in allValues && value.trim() === allValues[field].trim()
        ? undefined
        : 'Does not match';

export const phoneNumber = value =>
    /1-[0-9]{3}-[0-9]{3}-[0-9]{4}/.test(value) && value.length === 14 ? undefined : 
    'Phone number must have 1-XXX-XXX-XXXX format.'

export const date = value =>
    /^\d{1,2}-\d{1,2}-\d{2}$/.test(value) && validateDate(value) ? undefined : 
    'Date must have MM-DD-YY format.'

export const time = value =>
    /^\d{1,2}:\d{2}$/.test(value) && (value.length === 5 || value.length === 4) ? undefined :
    'Time must have HH:MM format.' 

