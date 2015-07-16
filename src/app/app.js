
var FamousEngine = require('famous/core/FamousEngine');
var DOMElement = require('famous/dom-renderables/DOMElement');

var Size = require('famous/components/Size');
var Position = require('famous/components/Position');

var Rotation = require('famous/components/Rotation');
var Position = require('famous/components/Position');
var Camera = require('famous/components/Camera');


var BoxNode = require('./boxNode.js');
var BoxNavPanel = require('./boxNavPanel.js');
var Connector = require('./connector.js');

function App(scene) {

    var APP_WIDTH  = window.innerWidth;
    var APP_HEIGHT = window.innerHeight;
    var APP_DEPTH = 100;
    var APP_OFFSET = 25;


    var that = this;

    this.rootNode = scene.addChild();
    this.rootNode.selElement = null;

    this.rootNode.setSizeMode(1,1,1)
        .setAbsoluteSize(APP_WIDTH - (APP_OFFSET * 2),APP_HEIGHT - (APP_OFFSET * 2),-APP_DEPTH)
        .setOrigin(0.5,0.5)
        .setPosition(APP_OFFSET,APP_OFFSET);

    var rootCam = new Camera(scene);
    rootCam.setDepth(100000);
    //rootCam.setFlat();
    this.context = {
      appscene : scene,
      approot  : this
    }

    var rootXAngle = 0;
    var rootYAngle = 0;

    var rootRotation = new Rotation(this.rootNode);
    rootRotation.set(rootXAngle,rootYAngle,0);

    this.boxNav = new BoxNavPanel(scene.addChild(),this.context,"box",0.9,0.8);
    this.boxNav = new BoxNavPanel(scene.addChild(),this.context,"root",0.025,0.8);

    this.firstNode = new BoxNode(this.rootNode.addChild(),"Checkout",150,70,50,'rgb(244, 225, 173)',this.context);
    this.firstNode.getParentNode().setPosition(50,150,100);

    this.secondNode = new BoxNode(this.rootNode.addChild(),"Review",150,70,50,'rgb(215, 208, 229)',this.context);
    this.secondNode.getParentNode().setPosition(300,150,100);

    this.thirdNode = new BoxNode(this.rootNode.addChild(),"Shipping",150,70,50,'rgb(234, 213, 193)',this.context);
    this.thirdNode.getParentNode().setPosition(550,150,100);

    this.fourthNode = new BoxNode(this.rootNode.addChild(),"Payment",150,70,50,'rgb(117, 218, 188)',this.context);
    this.fourthNode.getParentNode().setPosition(800,150,100);

    this.fifthNode = new BoxNode(this.rootNode.addChild(),"Complete",150,70,50,'rgb(173, 213, 228)',this.context);
    this.fifthNode.getParentNode().setPosition(1050,150,100);

    this.connectorOne = new Connector(this.rootNode.addChild(),80,1,1);
    this.connectorOne.getParentNode().setPosition(210,180,50);

    this.connectorTwo = new Connector(this.rootNode.addChild(),80,1,1);
    this.connectorTwo.getParentNode().setPosition(460,180,50);

    this.connectorThree = new Connector(this.rootNode.addChild(),80,1,1);
    this.connectorThree.getParentNode().setPosition(710,180,50);

    this.connectorFour = new Connector(this.rootNode.addChild(),80,1,1);
    this.connectorFour.getParentNode().setPosition(960,180,50);


    var rootZPosition = 150;
    this.backgroundNode = this.rootNode.addChild();
    var rootPosition = new Position(this.backgroundNode);
    //rootPosition.set(APP_OFFSET,APP_OFFSET,rootZPosition);
    rootPosition.set(0,0,rootZPosition);

    this.backgroundNode.addUIEvent('click');

    this.backgroundNode.onReceive = function(event,payload){

      if(event==='click'){
          that.context.appscene.emit("deselect");
      }



    }

    this.expanderDIV = new DOMElement(this.backgroundNode, {
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

      if(event==='box-top'){
          if(this.selElement) this.selElement.rotate("pos","x");
      } else if(event==='box-bottom'){
          if(this.selElement) this.selElement.rotate("neg","x");
      } else if(event==='box-right'){
          if(this.selElement) this.selElement.rotate("pos","y");
      } else if (event==='box-left'){
          if(this.selElement) this.selElement.rotate("neg","y");
      }
      else if (event==='root-top'){
          rootXAngle += Math.PI/12;
          rootRotation.set(rootXAngle,rootYAngle,0,{duration : 1000});
      }
      else if (event==='root-bottom'){
          rootXAngle -= Math.PI/12;
          rootRotation.set(rootXAngle,rootYAngle,0,{duration : 1000});
      }
      else if (event==='root-left'){
          rootYAngle -= Math.PI/12;
          rootRotation.set(rootXAngle,rootYAngle,0,{duration : 1000});
      }
      else if (event==='root-right'){
          rootYAngle += Math.PI/12;
          rootRotation.set(rootXAngle,rootYAngle,0,{duration : 1000});
      }
      else if (event==='root-nw'){
          rootZPosition -= 25;
          rootPosition.set(0,0,rootZPosition,{duration : 1000});
      }
      else if (event==='root-ne'){
          rootZPosition += 25;
          rootPosition.set(0,0,rootZPosition,{duration : 1000});
      }
      else if (event==='deselect'){
          that.unsetCurrSelectedBox();
      }


    }

}

App.prototype.setSelectedBox = function(el){

  if(this.rootNode.selElement){
      this.rootNode.selElement.deselect();
  }

  this.rootNode.selElement = el;
  this.rootNode.selElement.select();
  console.log(el);

}

App.prototype.unsetSelectedBox = function(el){

  if(this.rootNode.selElement){
      this.rootNode.selElement.deselect();
  }

  this.rootNode.selElement = null;

}

App.prototype.unsetCurrSelectedBox = function(){

  if(this.rootNode.selElement){
      this.rootNode.selElement.deselect();
      this.rootNode.selElement = null;
  }



}



module.exports = App;
