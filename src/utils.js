// import {submissionError} from 'redux-form';
import * as moment	from 'moment';

export function validateDate(date) {
	let formattedDate = moment(date, 'MM-DD-YY', true);
	return formattedDate.isValid();
}

export function convertToUTC(date, time) {
	let formattedDateAndTime = moment(date + ' ' + time, ['MM-DD-YY HH:mm', 'MM-DD-YY H:mm'],  true);
	// return formattedDateAndTime.isValid();
	return new Promise((resolve,reject) => {
		if(formattedDateAndTime.isValid()) {
			resolve(moment.utc(formattedDateAndTime));
		}
		else {
			console.log('convertToUTC error')
			reject({
				type: 'validationError',
				field: 'date',
				message: 'Invalid date or time'
			})	
		}
	});
}