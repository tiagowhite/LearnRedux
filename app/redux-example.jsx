var redux = require('redux');
var axios = require('axios');



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



// Map reducer and action generators
// -----------------------------------

var mapReducer = (state = { isFetching: false, url: undefined }, action) => {
  switch (action.type) {
  case 'START_LOCATION_FETCH':
    return {
      isFetching: true,
      url: undefined
    }
  case 'COMPLETE_LOCATION_FETCH':
    return {
      isFetching: false,
      url: action.url
    }
  default:
    return state
  }
}

var startLocationFetch = () => {
  return {
    type: 'START_LOCATION_FETCH'
  }
}

var completeLocationFetch = (url) => {
  return {
    type: 'COMPLETE_LOCATION_FETCH',
    url
  }
}

var fetchLocation = () => {
  store.dispatch(startLocationFetch());
  axios.get('http://ipinfo.io').then(function (res) {
    var loc = res.data.loc;
    var baseUrl = 'http://maps.google.com?q=' + loc

    store.dispatch(completeLocationFetch(baseUrl));

  })
}


var reducer = redux.combineReducers({
  name: nameReducer,
  hobbies: hobbiesReducers,
  movies: moviesReducers,
  map: mapReducer
})


var store = redux.createStore(reducer, redux.compose(
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
));

// subscribe to changes

var unsubscribe = store.subscribe(() => {
  var state = store.getState();


  console.log('new state', store.getState());

  if (state.isFetching) {
    document.getElementById('app').innerHTML = 'Loading...';
  } else if (state.map.url) {
		debugger;
		document.getElementById('app').innerHTML = '<a href="' + state.map.url + '" target="_blank">View your Location</a>'
	}

})


fetchLocation();



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
store.dispatch(addMovie('Gurdians of the Galaxy', 'Action & Adventure'))
