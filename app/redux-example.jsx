var redux = require('redux');

console.log('Starting redux example');

var stateDefault = {
  name: 'Anonymous',
  hobbies: [],
  movies: []
}
var nextHobbyId = 1;
var nextMovieId = 1;

var reducer = (state = stateDefault, action) => {

  switch (action.type) {
  case 'CHANGE_NAME':
    return {
      ...state,
      name: action.name
    }
  case 'ADD_HOBBY':
    return {
      ...state,
      hobbies: [
        ...state.hobbies,
        {
          id: nextHobbyId++,
          hobby: action.hobby
        }
      ]
    }
  case 'REMOVE_HOBBY':
    return {
      ...state,
      hobbies: state.hobbies.filter((hobby) => hobby.id !== action.id)
    }
  case 'REMOVE_MOVIE':
  return {
    ...state,
    movies: state.movies.filter((movies) => movies.id !== movies.id)
  }

  case 'ADD_MOVIE':
    return {
      ...state,
      movies: [
        ...state.movies,
        {
          id: nextMovieId++,
          titlle: action.title,
          genre: action.genre
        }
      ]
    }
  default:
    return state
  }
}

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
