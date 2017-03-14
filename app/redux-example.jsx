var redux = require('redux');

console.log('Starting redux example');

var reducers = (state = {name: 'Maria José'}, action) => {
	return state;
}

var store = redux.createStore(reducers);

var currentState = store.getState();
console.log('currentState', currentState);
