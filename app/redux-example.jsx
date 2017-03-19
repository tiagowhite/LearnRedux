var redux = require('redux');

console.log('Starting redux example');



// Name reducers and action generators
// -----------------------------------
var nameReducer = (state = 'Anonymous', action) => {
  switch (action.type) {
  case 'CHANGE_NAME':
    return action.name
  default:
    return state;
  }
}

var changeName = (name) => {
	return {
		type: 'CHANGE_NAME',
		name
	}
}

// hobbiesReducers and action generators
// -----------------------------------

var nextHobbyId = 1;
var hobbiesReducers = (state = [], action) => {
  switch (action.type) {
  case 'ADD_HOBBY':
    return [
      ...state,
      {
        id: nextHobbyId++,
        hobby: action.hobby
      }
    ];
  case 'REMOVE_HOBBY':
    return state.filter((hobby) => hobby.id !== action.id)
  default:
    return state
  }
}

var addHobby = (hobby) => {
	return {
		type: 'ADD_HOBBY',
		hobby
	}
}

var removeHobby = (id) => {
	return {
		type: 'REMOVE_HOBBY',
		id
	}
}

// moviesReducers and action generators
// -----------------------------------

var nextMovieId = 1;
var moviesReducers = (state = [], action) => {
  switch (action.type) {
  case 'ADD_MOVIE':
    return [
      ...state,
      {
        id: nextMovieId++,
        title: action.title,
        genre: action.genre
      }
    ]
  case 'REMOVE_MOVIE':
    return state.filter((movies) => movies.id !== movies.id)
  default:
    return state
  }
}

var addMovie = (title, genre) => {
	return {
		type: 'ADD_MOVIE',
		title,
		genre
	}
}

var removeMovie = (id) => {
	return {
		type: 'REMOVE_MOVIE',
		id
	}
}

var reducer = redux.combineReducers({
  name: nameReducer,
  hobbies: hobbiesReducers,
  movies: moviesReducers
})


var store = redux.createStore(reducer, redux.compose(
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

// subscribe to changes

var unsubscribe = store.subscribe(() => {
  var state = store.getState();

  console.log('Name is: ', state.name);

  document.getElementById('app').innerHTML = state.name;

  console.log('new state', store.getState());
})

//unsubscribe();

// Add name
store.dispatch(changeName('Braulio'))

// Add hobby
store.dispatch(addHobby('Play games'))
store.dispatch(addHobby('Mechanical Keyboards'))

// Remove hobbies
store.dispatch(removeHobby(2));

// change
store.dispatch(changeName('Jubirula'))


store.dispatch(addMovie('Resevoir Dogs', 'Crime Drama'))
store.dispatch(removeMovie(1))
store.dispatch(addMovie('Gurdians of the Galaxy','Action & Adventure'))
