var React = require('react');
var FluxActions = require('../actions/FluxActions');
var UserStore = require('../stores/UserStore');
var SearchPlanate = require('./SearchPlanate');
var Render = require('react-dom').render;
var RenderDOM = require('react-dom');



function getStoreState(){

  return {
    userData: UserStore.getlogin()
    
  };
}

var LoginApp = React.createClass({

   getInitialState: function() {
    return {

      userName  :'',
      userPwd   :'',
      userData  : [],
      error     :''

    };
  },

  componentDidMount: function () {
   
   UserStore.addChangeListener(this._loadUser);
   FluxActions.login();

  },

  componentWillUnmount: function () {
   
   UserStore.removeChangeListener(this._loadUser);
  },
  

   handleSubmit :function(event){
   
   var self=this;
  event.preventDefault();

 if(self.state.userData.name===self.state.userName && self.state.userData.birth_year===self.state.userPwd){

  self.setState({error:'', });

   RenderDOM.unmountComponentAtNode(document.getElementById('main'));

    Render(
    <SearchPlanate/>,
    document.getElementById('main')
  );


 }else{

 self.setState({
            
            error:'Invalid User try again !',
            userName:'',
            userPwd:''
  });

 } 
  

 },

_loadUser:function(){
  
  var self=this;
 this.setState(getStoreState());
 
},

getuser :function(event){

this.setState({userName: event.target.value});

},

getpwd:function(event){

this.setState({userPwd: event.target.value,
                
              });

},

  
  render: function () {
    var self=this;
    return (
       <form onSubmit={self.handleSubmit}>
                <div className="container">
                <center><h3> USER LOG IN </h3></center>


                <div className="login">
                      User name
                      <div className="box">
                      <input type="text" name="name" ref="uname" value={self.state.userName} onChange={self.getuser} placeholder="User name"  /><br/>
                      </div>
                      Password
                      <div className="box" > 
                      <input type="password" name="pwd" ref="upwd" value={self.state.userPwd} onChange={self.getpwd}  placeholder="Password" />
                      </div>
                      
                </div>
                <span className="btn">
                     
                      <input  className="btn" type="submit" name="btn" value="Log In"/>
                      </span>

                <div style={{color:'red'}}>
                <center>{self.state.error}</center>
                </div>
          <span className="note">  note: only  Luke Skywalker can login</span>
                </div>

          </form>
    );
  }
});

module.exports = LoginApp;
