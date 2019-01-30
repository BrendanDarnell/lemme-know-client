
import moment from 'moment';

// checks that the provided date is formatted properly and is a valid date
export function validateDate(date) {
	let formattedDate = moment(date, 'MM-DD-YY', true);
	return formattedDate.isValid();
}

// convert to UTC time on client side so time zones are not an issue 
// returns a promise so it can be chained with async server requests
export function convertToUtc(date, time) {
	let formattedDateAndTime = moment(date + ' ' + time, ['MM-DD-YY hh:mm a', 'MM-DD-YY h:mm a'],  true);
	return new Promise((resolve,reject) => {
		if(formattedDateAndTime.isValid()) {
			resolve(moment.utc(formattedDateAndTime));
		}
		else {
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
            status: res.status,
            message: res.statusText
        });
    }
    return res;
};