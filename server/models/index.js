var db = require('../db'); 

module.exports = {
  messages: {
    get: function (callback) { // a function which produces all the messages

      var queryStr = 'SELECT * FROM messages left outer join users on (messages.user = users.userid) order by messages.id desc';
      db.query(queryStr, function(err, results) {
        callback(results);
      });

    }, 
    post: function (messageData, callback) { // a function which can be used to insert a message into the database
    
      var sql = "INSERT INTO messages (user, text, roomname) VALUE ((SELECT userid FROM users WHERE name = ? limit 1), ?, ?)";

      var values = [messageData.user, messageData.text, messageData.roomname];
      db.query(sql, values, function(err, result) {
        console.log(err);
        console.log("Number of records inserted: " + result.affectedRows);
        callback(err, result);
      });
    } 
  },

  users: {
    // Ditto as above.
    get: function (callback) {
      var queryStr = 'SELECT * FROM users';
      
      console.log('got to users model');
      // var query = db.query(queryStr);
      db.query(queryStr, function(err, results) {
        callback(results);
      });
    },
    post: function (userData, callback) {
      var sql = "INSERT INTO users (name) VALUE (?)";
      
      var values = [userData.name];
      db.query(sql, values, function(err, result) {
        console.log("Number of users inserted: " + result.affectedRows);
        callback(err, result);
      });
    }
  }
};

