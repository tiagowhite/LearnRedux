var redux = require('redux');



console.log('Starting redux example');

var actions = require('./actions/index');
var store = require('./store/configureStore').configure();


var unsubscribe = store.subscribe(() => {
  var state = store.getState();

  console.log('new state', store.getState());

  if (state.isFetching) {
    document.getElementById('app').innerHTML = 'Loading...';
  } else if (state.map.url) {
    document.getElementById('app').innerHTML = '<a href="' + state.map.url + '" target="_blank">View your Location</a>'
  }

})


store.dispatch(actions.fetchLocation());



// Add name
store.dispatch(actions.changeName('Braulio'))

// Add hobby
store.dispatch(actions.addHobby('Play games'))
store.dispatch(actions.addHobby('Mechanical Keyboards'))

// Remove hobbies
store.dispatch(actions.removeHobby(2));

// change
store.dispatch(actions.changeName('Jubirula'))


store.dispatch(actions.addMovie('Resevoir Dogs', 'Crime Drama'))
store.dispatch(actions.removeMovie(1))
store.dispatch(actions.addMovie('Gurdians of the Galaxy', 'Action & Adventure'))
