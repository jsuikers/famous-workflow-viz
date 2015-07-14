
var FamousEngine = require('famous/core/FamousEngine');
var DOMElement = require('famous/dom-renderables/DOMElement');

var Size = require('famous/components/Size');
var Position = require('famous/components/Position');

var Rotation = require('famous/components/Rotation');
var Position = require('famous/components/Position');

var BoxNode = require('./boxNode.js');

var BoxNavPanel = require('./boxNavPanel.js');

function App(scene) {

    var APP_WIDTH  = window.innerWidth;
    var APP_HEIGHT = window.innerHeight;
    var APP_DEPTH = 100;
    var APP_OFFSET = 25;


    this.rootNode = scene.addChild();
    this.rootNode.selElement = null;

    this.rootNode.setSizeMode(1,1,1)
        .setAbsoluteSize(APP_WIDTH - (APP_OFFSET * 2),APP_HEIGHT - (APP_OFFSET * 2),-APP_DEPTH)
        .setPosition(APP_OFFSET,APP_OFFSET);


    this.context = {
      appscene : scene,
      approot  : this
    }


    this.boxNav = new BoxNavPanel(this.rootNode.addChild(),this.context);

    this.firstNode = new BoxNode(this.rootNode.addChild(),150,70,50,'rgb(244, 225, 173)',this.context);
    this.firstNode.getParentNode().setPosition(50,50,100);

    this.firstRotation = new Rotation(this.firstNode.getParentNode());
    this.firstRotation.set(0,Math.PI,0,{duration : 5000});


    this.expanderDIV = new DOMElement(this.rootNode, {
       //content : "Famous Collaboration",
       properties:{
         'background-color':'rgb(229, 240, 201)',
         'color' : '#AAA7A7',
         'line-height' : '75px',
         'text-align' : 'center',
         'font-size' : '7.5vh'
       }
    });

    this.rootNode.onReceive = function(event,payload){

      console.log(event, payload);

      if(event==='top'){
          if(this.selElement) this.selElement.rotate("pos","x");
      } else if(event==='bottom'){
          if(this.selElement) this.selElement.rotate("neg","x");
      } else if(event==='right'){
          if(this.selElement) this.selElement.rotate("pos","y");
      } else if (event==='left'){
          if(this.selElement) this.selElement.rotate("neg","y");
      }
    }

}

App.prototype.setSelectedBox = function(el){

  this.rootNode.selElement = el;
  console.log(el);

}

module.exports = App;
