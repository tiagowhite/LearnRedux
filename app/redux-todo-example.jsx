const redux = require('redux');

console.log('Starting todo redux example...')

var stateDefault = {
	searchText: '',
	showCompleted: false,
	todos: []
}

var reducer = (state = stateDefault, action) => {
	switch (action.type) {
		case 'CHANGE_SEARCH_TEXT':
			return {
				...state,
				searchText: action.searchText
			}
		default:
			return state
	}
}

var store = redux.createStore(reducer,redux.compose(
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));


var unsubscribe = store.subscribe(() => {
	var state = store.getState();

	console.log('searchText is: ', state.searchText);

	document.getElementById('app').innerHTML = state.searchText;

})


console.log('currentState', store.getState());


store.dispatch({
	type: 'CHANGE_SEARCH_TEXT',
	searchText: 'Dog'
})
store.dispatch({
	type: 'CHANGE_SEARCH_TEXT',
	searchText: 'Go to medic'
})
