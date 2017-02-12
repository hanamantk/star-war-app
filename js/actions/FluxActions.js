var AppDispatcher = require('../dispatcher/AppDispatcher');
var FluxConstants = require('../constants/FluxConstants');
//var ApiData = require('../utils/ApiData');

var ApiData = {

  BaseUrl: 'http://swapi.co/',

  get: function(url,cb) {
    var self = this;
    $.ajax({
      type: 'GET',
      cache:false,
      url: self.BaseUrl + 'api/' + url,
      
      success: function(res) {
         cb(res);
        }
    });
  },
  

  getUserData: function(data,cb){
        this.get("people/1/",cb);
  },

   getPlanates: function(data,cb){
        this.get("planets/",cb);
  },
}


// Define action methods
var FluxActions = {

 
  login: function () {


    ApiData.getUserData(
                {
                }, function (userData) { 
             
             AppDispatcher.handleAction({
                 
                  actionType: FluxConstants.LOGIN_USER,
                  userData: userData

                });

        });
  },

 
  getplanates: function (keyword,cb) {

    if(keyword!==undefined){


      ApiData.getPlanates(
                {
                }, function (planateData) { 
               
                cb(planateData)
        });

    }else{

         ApiData.getPlanates(
                {
                }, function (planateData) { 
               
                AppDispatcher.handleAction({
                 
                  actionType: FluxConstants.GET_PLANATES,
                  planateData: planateData

                });

        });
    }
  
  },


};

module.exports = FluxActions;
