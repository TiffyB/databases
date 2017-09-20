var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) { 
      models.messages.get(function(messages) {
        res.end(JSON.stringify(messages));
      });

    }, 
    post: function (req, res) { 

      var messageData = [];
      req.on('data', (chunk) => {
        messageData.push(chunk);
      });
      req.on('end', () => {
        messageData = [].concat(messageData).toString('utf8');
        var parsedMessage = JSON.parse(messageData);
        models.messages.post(parsedMessage, function(err, result) {
          res.sendStatus(201);
        }); 
      });
    } 
  },

  users: {
    get: function (req, res) {
      console.log('got here');
      models.users.get(function(users) {
        res.end(JSON.stringify(users));
      });
      
    },
    post: function (req, res) {
      var userData = [];
      req.on('data', (chunk) => {
        userData.push(chunk);
      });
      req.on('end', () => {
        userData = [].concat(userData).toString('utf8');
        var parsedUser = JSON.parse(userData);
        models.users.post(parsedUser, function(err, result) {
          res.sendStatus(201);
        });
      });
    }
  }
};

