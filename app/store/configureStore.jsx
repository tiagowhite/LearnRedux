var redux = require('redux');
var thunk = require('redux-thunk').default;

var { nameReducer, hobbiesReducers, moviesReducers, mapReducer } = require('./../reducers/index');

export var configure = () => {

	var reducer = redux.combineReducers({
    name: nameReducer,
    hobbies: hobbiesReducers,
    movies: moviesReducers,
    map: mapReducer
  })


  var store = redux.createStore(reducer, redux.compose(
		redux.applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  ));

	return store;
}
