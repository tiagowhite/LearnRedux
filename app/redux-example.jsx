var redux = require('redux');

console.log('Starting redux example');

var reducers = (state = stateDefault, action) => {
	switch (action.type) {
		case 'CHANGE_NAME':
			return {
				...state,
				name: action.name
			}
		default:
		return state
	}
}

var store = redux.createStore(reducers);
console.log('currentState', store.getState)

store.dispatch({
	type: 'CHANGE_NAME',
	name: 'Tiago'
});

console.log('Name should be Tiago', store.getState());
