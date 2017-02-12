var React = require('react');
var FluxActions = require('../actions/FluxActions');
var UserStore = require('../stores/UserStore');
var LoginApp = require('./LoginApp.react');
var Render = require('react-dom').render;
var RenderDOM = require('react-dom');



var SearchPlanate = React.createClass({

  getInitialState: function() {
    return {

      search:'',
      planates:[],
      found :''

    };
  },

	componentDidMount: function () {
   
   UserStore.addChangeListener(this._loadplanets);
   FluxActions.getplanates();

  },

 
  componentWillUnmount: function () {
   
   UserStore.removeChangeListener(this._loadplanets);
  },

  _loadplanets:function(){

    var planatesData=UserStore.getplanates();
    this.setState({planates : planatesData.results})

  },

  _searchChange:function(event){   //get searched keyword

    var searchval=event.target.value;
    this.setState({search:searchval });

   setInterval(this.SearchCall(searchval),500);
  

  },

  SearchCall : function(searchBoxValue){  //check if searc matches to planate

    var self    =this;
    var keyword = searchBoxValue;

    FluxActions.getplanates(keyword,function(response){
    var planates=response.results;

      var filter= planates.map(function(planate,index){

        if(keyword!=""){

        if(planate.name.match(keyword))
        {

        
        self.setState({planates : response.results});
        
        }else{
          self.setState({found : 'not found...'});

        }
    }

   });

       
       });
        
    },


  // Render cart view
  render: function () {
    
    var self = this;
    var planate_list;
    var planate_pop;


    if(self.state.planates!==undefined && self.state.planates!==""){

      planate_list=  self.state.planates.map(function(planate,index){
              return (<li key={index}>{planate.name}</li>);
          });
    

     planate_pop=  self.state.planates.map(function(planate,index){
              return (<li key={index}>{planate.population}</li>);
          }); 

    }
  


    return (
    	<div className="container">

      <center><h3>Search  for planates in universe</h3></center>
                      <center><div className="search">
                      <input type="text" width='300' name="search" ref="uname" value={self.state.search} onChange={self._searchChange} placeholder="search for planates"  /><br/>
                      <input type="submit" value="search"/>
                      </div></center><br/>
                      <span style={{color:'red'}}>{self.state.found}</span>
    		
        <div className="planates-list">
        Planate Name
        <ul>
         
          {planate_list}
          

        </ul>
        </div>

        <div className="population">
        population
        <ul>
         {planate_pop}

        </ul>
        </div>
       
    	</div>
      
    );
  }

});

module.exports = SearchPlanate;