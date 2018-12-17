const event1 = {
	id: 1,
	name: 'Hiking',
	date: '12-20-18',
	returnTime: '18:30',
	description: 'Hiking to diamond lakes in Indian Peaks Wilderness Area'
}

const event2 = {
	id: 2,
	name: 'Running',
	date: '12-25-18',
	returnTime: '5:30',
	description: 'Going for a quick run to Olde Town Arvada and back'
}

const initialState = [event1, event2]


export const eventsReducer = (state=initialState, action) => {
	return state;
}