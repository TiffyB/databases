var db = require('../db'); 

module.exports = {
  messages: {
    get: function (callback) { // a function which produces all the messages

      console.log('got here too!');
      // var query = db.query('SELECT * FROM messages');
      var queryStr = 'SELECT * FROM messages';
      db.query(queryStr, function(err, results) {
        callback(results);
      });
      // var messages = [];
      // query.on('result', function(row) {
      //   messages.push(row);
      //   console.log("message:", row);
      // });

      // query.on('end', function() {
      //   callback(messages);
      // });
      // how do i export these to controllers?
    }, 
    post: function (messageData) { // a function which can be used to insert a message into the database
      console.log('got to post in models');
      var sql = "INSERT INTO messages (user, text, roomname) VALUE ?";
      //need to get userid number
      var useridQuery = 'SELECT userid FROM users WHERE name = ' + messageData.user;
      // var userid = db.query(useridQuery);
      // userid.on('result', function(id) {
      //   console.log(id);
      // });
      var values = [[messageData.user, messageData.text, messageData.roomname]];
      db.query(sql, [values], function(err, result) {

        console.log("Number of records inserted: " + result.affectedRows);
      });
    } 
  },

  users: {
    // Ditto as above.
    get: function (response, request) {
      console.log('got to users model');
      var query = db.query('SELECT * FROM users');
      var users = [];
      query.on('result', function(row) {
        users.push(row);
        console.log("users:", row);
      });
    },
    post: function () {
      
    }
  }
};

