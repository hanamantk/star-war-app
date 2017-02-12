
var ApiData = {

  get: function(data,cb) {
    var self = this;
    $.ajax({
      type: 'GET',
      cache:false,
      url:"http://swapi.co/api/people/1/",
      
      success: function(res) {
         cb(res);
        }
    });
  },
  

  getUserData: function(data){
         this.get(data,cb);
  }
}

module.exports = ApiData;