
var FamousEngine = require('famous/core/FamousEngine');
var DOMElement = require('famous/dom-renderables/DOMElement');

var Size = require('famous/components/Size');
var Position = require('famous/components/Position');

var Rotation = require('famous/components/Rotation');
var Position = require('famous/components/Position');
var Camera = require('famous/components/Camera');


var BoxNode = require('./boxNode.js');
var BoxNavPanel = require('./boxNavPanel.js');
var ToolPanel = require('./ToolPanel.js');
var Connector = require('./connector.js');

var DROPDOWN_STATS = {
  "Checkout" : [43,53,4],
  "Review" : [35,40,25],
  "Shipping" : [38,51,11],
  "Payment" : [45,47,8],
  "Complete" : [56,33,11],

}

var DATA_SET = [
  "5,0,1,14,12,15,10,18,14,3,10,8,7,1,5",
  "5,20,20,14,41",
  "25,25,40,10",
  "5,10,10,14,2,5,10,8,4,3,1,4,21,10,15",
  "5,10,8,4,10,25",
  "5,10,8,4,10,20",
  "4,1,1,8,5,5,8,7,1,1,1,14,11,1,12",
  "50,1,80,45,101,25",
  "5,101,28,40,10,202",
  "41,10,31,38,25,35,18,17,10,13,17,24,31,41,42",
  "50,1,80,45,101,25",
  "5,101,28,40,10,202",
  "11,10,21,18,15,15,18,17,17,13,17,14,21,21,23",
  "50,1,80,45,101,35",
  "5,101,28,40,102",

];

var DATA_POINTER = 0;


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

    this.rootWidth = APP_WIDTH - (APP_OFFSET * 2);
    this.rootHeight = APP_HEIGHT - (APP_OFFSET * 2);

    //var rootCam = new Camera(scene);
    //rootCam.setDepth(100000);
    //rootCam.setFlat();
    this.context = {
      appscene : scene,
      approot  : this
    }

    this.isZoomed = false;

    var rootXAngle = 0;
    var rootYAngle = 0;

    var rootRotation = new Rotation(this.rootNode);
    rootRotation.set(rootXAngle,rootYAngle,0);

    this.boxNav = new BoxNavPanel(scene.addChild(),this.context,"box",0.9,0.8);
    this.boxNav = new BoxNavPanel(scene.addChild(),this.context,"root",0.025,0.8);

    this.mainNav = new ToolPanel(scene.addChild(),this.context);


    this.firstNode = new BoxNode(this.rootNode.addChild(),"Checkout",150,70,50,'rgb(244, 225, 173)',this.context,{front : "Checkouts per hr." , left : "Entry" , right : "Exits"});
    this.firstNode.getParentNode().setPosition(50,150,100);

    this.secondNode = new BoxNode(this.rootNode.addChild(),"Review",150,70,50,'rgb(215, 208, 229)',this.context,{front : "Reviews per hr." , left : "Entry" , right : "Exits"});
    this.secondNode.getParentNode().setPosition(300,150,100);

    //this.dummyNode = new BoxNode(this.rootNode.addChild(),"Dummy",750,470,150,'rgb(244, 225, 173)',this.context,{front : "Checkouts per hr." , left : "Entry" , right : "Exits"});
    //this.dummyNode.getParentNode().setPosition(350,350,100);



    this.thirdNode = new BoxNode(this.rootNode.addChild(),"Shipping",150,70,50,'rgb(234, 213, 193)',this.context,{front : "Shipping req per hr." , left : "Entry" , right : "Exits"});
    this.thirdNode.getParentNode().setPosition(550,150,100);




    this.fourthNode = new BoxNode(this.rootNode.addChild(),"Payment",150,70,50,'rgb(117, 218, 188)',this.context,{front : "Payments per hr." , left : "Entry" , right : "Exits"});
    //this.fourthNode.getParentNode().setPosition(800,150,100);

    this.fifthNode = new BoxNode(this.rootNode.addChild(),"Complete",150,70,50,'rgb(173, 213, 228)',this.context,{front : "Order completions per hr." , left : "Entry" , right : "Exits"});
    this.fifthNode.getParentNode().setPosition(1050,150,100);

    this.connectorOne = new Connector(this.rootNode.addChild(),80,1,1,true);
    this.connectorOne.getParentNode().setPosition(210,180,50);

    this.connectorTwo = new Connector(this.rootNode.addChild(),80,1,1,true);
    this.connectorTwo.getParentNode().setPosition(460,180,50);

    this.connectorThree = new Connector(this.rootNode.addChild(),80,1,1,true);
    this.connectorThree.getParentNode().setPosition(710,180,50);

    this.connectorFour = new Connector(this.rootNode.addChild(),80,1,1,true);
    this.connectorFour.getParentNode().setPosition(960,180,50);


    this.connectorAltOne = new Connector(this.rootNode.addChild(),100,0,1,false);
    this.connectorAltOne.getParentNode().setPosition(620,220,-50);
    //this.connectorAltOne.setOpacity(0);

    this.connectorAltTwo = new Connector(this.rootNode.addChild(),170,1,1,true);
    this.connectorAltTwo.getParentNode().setPosition(620,320,-50);

    this.altNode = new BoxNode(this.rootNode.addChild(),"Offline Payment",150,70,50,'rgb(117, 218, 188)',this.context,{front : "Payments per hr." , left : "Entry" , right : "Exits"});
    this.altNode.getParentNode().setPosition(800,290,-100);

    this.connectorAltThree = new Connector(this.rootNode.addChild(),170,1,1,false);
    this.connectorAltThree.getParentNode().setPosition(960,320,-50);

    this.connectorAltFour = new Connector(this.rootNode.addChild(),100,0,0,true);
    this.connectorAltFour.getParentNode().setPosition(1120,235,-50);


    this.paymentSubOneNode = new BoxNode(this.rootNode.addChild(),"Credit Cards",150,70,50,'rgb(171, 204, 116)',this.context,{front : "Payments per hr." , left : "Entry" , right : "Exits"});
    this.paymentSubOneNode.getParentNode().setPosition(550,190,-100);

    this.paymentSubTwoNode = new BoxNode(this.rootNode.addChild(),"Bank Transfer",150,70,50,'rgb(196, 165, 82)',this.context,{front : "Payments per hr." , left : "Entry" , right : "Exits"});
    this.paymentSubTwoNode.getParentNode().setPosition(550,390,-100);

    this.connectorSubOne = new Connector(this.rootNode.addChild(),80,1,1,true);
    this.connectorSubOne.getParentNode().setPosition(460,220,-50);

    this.connectorSubTwo = new Connector(this.rootNode.addChild(),80,1,1,true);
    this.connectorSubTwo.getParentNode().setPosition(710,220,-50);

    this.connectorSubThree = new Connector(this.rootNode.addChild(),80,1,1,true);
    this.connectorSubThree.getParentNode().setPosition(460,420,-50);

    this.connectorSubFour = new Connector(this.rootNode.addChild(),80,1,1,true);
    this.connectorSubFour.getParentNode().setPosition(710,420,-50);



    var rootZPosition = 25;
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

    /*Quick Hack for Zoom Effect*/

    this.paymentPos = new Position(this.fourthNode.getParentNode());
    this.paymentPos.set(800,150,100);
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


App.prototype.populateData = function(){

  if(this.rootNode.selElement){
      this.rootNode.selElement.addData('front',{data : DATA_SET[DATA_POINTER++] , type :'bar' , width : 120});
      this.rootNode.selElement.addData('left',{data : DATA_SET[DATA_POINTER++] , type :'donut' , width : 40});
      this.rootNode.selElement.addData('right',{data : DATA_SET[DATA_POINTER++] , type :'donut' , width : 40});
  }

}

App.prototype.triggerDropdown = function(){

  if(this.rootNode.selElement){

    this.rootNode.selElement.drop(DROPDOWN_STATS[this.rootNode.selElement.getCaption()]);

  }

}

App.prototype.triggerAlt = function(){

  this.connectorAltOne.getParentNode().setPosition(620,220,50);
  this.connectorAltTwo.getParentNode().setPosition(620,320,50);
  this.connectorAltThree.getParentNode().setPosition(960,320,50);
  this.connectorAltFour.getParentNode().setPosition(1120,235,50);

  this.altNode.getParentNode().setPosition(800,290,100);

}

App.prototype.triggerZoom = function(){

  var that = this;
  if(this.isZoomed){

    that.fourthNode.contract();
    this.paymentPos.set(800,150,100,{duration : 500});

      that.paymentSubOneNode.getParentNode().setPosition(550,190,-100);

      that.paymentSubTwoNode.getParentNode().setPosition(550,390,-100);

      that.connectorSubOne.getParentNode().setPosition(460,220,-50);

      that.connectorSubTwo.getParentNode().setPosition(710,220,-50);

      that.connectorSubThree.getParentNode().setPosition(460,420,-50);

      that.connectorSubFour.getParentNode().setPosition(710,420,-50);




    this.isZoomed = false;

  } else {

    this.paymentPos.set(10,30,200,{duration : 500},function(){

      that.fourthNode.expand(that.rootWidth,that.rootHeight,0);

      that.paymentSubOneNode.getParentNode().setPosition(580,190,300);

      that.paymentSubTwoNode.getParentNode().setPosition(580,390,300);

      that.connectorSubOne.getParentNode().setPosition(490,220,300);

      that.connectorSubTwo.getParentNode().setPosition(740,220,300);

      that.connectorSubThree.getParentNode().setPosition(490,420,300);

      that.connectorSubFour.getParentNode().setPosition(740,420,300);


    });

    this.isZoomed = true;
  }

}

App.prototype.getRootWidth = function(){

  return this.rootWidth;

}

App.prototype.getRootHeight = function(){

  return this.rootHeight;

}


module.exports = App;
