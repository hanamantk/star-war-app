var AppDispatcher     = require('../dispatcher/AppDispatcher');
var EventEmitter      = require('events').EventEmitter;
var FluxConstants = require('../constants/FluxConstants');
var _ = require('underscore');


var _userData = [],
    _planates =[];

// Add product to cart
function setlogin(data) {

  _userData=data;
 
}

function setplanates(planates) {

  _planates=planates;
 
}



var UserStore = _.extend({}, EventEmitter.prototype, {
 
  // Emit Change event
  emitChange: function () {
    this.emit('change');
  },
  // Add change listener
  addChangeListener: function (callback) {
    this.on('change', callback);
  },
  // Remove change listener
  removeChangeListener: function (callback) {
    this.removeListener('change', callback);
  },

  // Return cart items
  getlogin: function () {
    return _userData;
  },

  getplanates:function() {

  return _planates;
 
}


});

// Register callback with AppDispatcher

AppDispatcher.register(function (payload) {
  var action = payload.action;
  var text;
  switch (action.actionType) {
   
    case FluxConstants.LOGIN_USER:
      
      setlogin(action.userData);
      break;

     case FluxConstants.GET_PLANATES:
      
      setplanates(action.planateData);
      break; 
    
    default:
      return true;
  }
  
  UserStore.emitChange();
  return true;
});

module.exports = UserStore;
