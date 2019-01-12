// import {submissionError} from 'redux-form';
import * as moment	from 'moment';

export function validateDate(date) {
	let formattedDate = moment(date, 'MM-DD-YY', true);
	return formattedDate.isValid();
}

export function convertToUtc(date, time) {
	let formattedDateAndTime = moment(date + ' ' + time, ['MM-DD-YY hh:mm a', 'MM-DD-YY h:mm a'],  true);
	// return formattedDateAndTime.isValid();
	return new Promise((resolve,reject) => {
		if(formattedDateAndTime.isValid()) {
			resolve(moment.utc(formattedDateAndTime));
		}
		else {
			console.log('convertToUtc error')
			reject({
				type: 'validationError',
				field: 'date',
				message: 'Invalid date or time'
			})	
		}
	});
}

export function normalizeResponseErrors(res) {
    if (!res.ok) {
        if (
            res.headers.has('content-type') &&
            res.headers.get('content-type').startsWith('application/json')
        ) {
            return res.json().then(err => Promise.reject(err));
        }
        return Promise.reject({
            code: res.status,
            message: res.statusText
        });
    }
    return res;
};