var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) { // a function which handles a get request for all messages for the client
      models.messages.get(function(messages) {
        //need to get user name using query
        res.end(JSON.stringify(messages));
      });

    }, 
    post: function (req, res) { // a function which handles posting a message to the database

      
      res.statusCode = 201;
      var messageData = [];
      req.on('data', (chunk) => {
        console.log('got to post messages in controllers');
        console.log(chunk);
        messageData.push(chunk);
      });
      req.on('end', () => {
        messageData = [].concat(messageData).toString('utf8');
        var parsedMessage = JSON.parse(messageData);
        //send to models?
        models.messages.post(parsedMessage);
        
      });
      res.end(); //does this work? Or do I need to write the headers as well?
    } 
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      console.log('got here');
      var users = models.users.get();
      console.log(users);
      res.end(JSON.stringify(users)); //does this work? Or do I need to write the headers as well?
    },
    post: function (req, res) {
      res.statusCode = 201;
      var userData = [];
      req.on('data', (chunk) => {
        userData.push(chunk);
      });
      req.on('end', () => {
        userData = [].concat(userData).toString('utf8');
        var parsedUser = JSON.parse(userData);
        //send to models?
        models.users.post(parsedUser);
        
      });
      res.end(); //does this work? Or do I need to write the headers as well?

    }
  }
};

