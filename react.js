var coordsPromise = new Promise(function(resolve, reject) {
  window.navigator.geolocation.getCurrentPosition(resolve);
}).then(function(geo) {
  return geo.coords.latitude + ":" + geo.coords.longitude;
});

/*
This is a function that puts the data into a JSON blob and inserts it into a RethinkDB instance.
*/
// This is called when the <form> in render() is submitted by the browser.`
  handleSubmit: function(event) {
    event.preventDefault();
    Promise.props({
      coords: coordsPromise,
      user: "bob",
      posted: Date.now(),
      text: this.refs.messageText.value
    }).then(function(message) {
      console.log(message);
      ReactRethinkdb.DefaultSession.runQuery(r.table(MESSAGE_TABLE).insert(message));
      this.refs.messageText.value = '';
    });
  },