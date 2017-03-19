var redux = require('redux');

console.log('Starting redux example');

var stateDefault = {
  name: 'Anonymous',
  hobbies: [],
  movies: []
}
var nextHobbyId = 1;
var nextMovieId = 1;

var nameReducer = (state = 'Anonymous', action) => {
  switch (action.type) {
  case 'CHANGE_NAME':
    return action.name
  default:
    return state;
  }
}

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

store.dispatch({
  type: 'CHANGE_NAME',
  name: 'Tiago'
});


store.dispatch({
  type: 'ADD_HOBBY',
  hobby: 'Runing'
})

store.dispatch({
  type: 'ADD_HOBBY',
  hobby: 'Walking'
})

store.dispatch({
  type: 'REMOVE_HOBBY',
  id: 2
})


store.dispatch({
  type: 'CHANGE_NAME',
  name: 'Jubirula'
});


store.dispatch({
  type: 'ADD_MOVIE',
  title: 'Resevoir Dogs',
  genre: 'Crime Drama'
})



store.dispatch({
  type: 'REMOVE_MOVIE',
  id: 1
})

store.dispatch({
  type: 'ADD_MOVIE',
  title: 'Gurdians of The galaxy',
  genre: 'Action'
})
