'use strict';


var DOMElement = require('famous/dom-renderables/DOMElement');

var Size = require('famous/components/Size');
var Position = require('famous/components/Position');
var Rotation = require('famous/components/Rotation');

function BoxNode(pparentNode, pwidth , pheight ,pdepth,pcolor,pcontext){

  this.parentNode = pparentNode;
  this.width = pwidth;
  this.height = pheight;
  this.depth = pdepth;
  this.color = pcolor;

  this.parentNode.context = pcontext;
  this.parentNode.container = this;

  this.rotationObj = new Rotation(this.parentNode);
  this.rotateXAngle = 0;
  this.rotateYAngle = 0;

  this.sidesNodeContainer = {};
  this.sidesDOMContainer = {};

  this.parentNode.setSizeMode(1,1,1)
    .setAbsoluteSize(this.width,this.height,this.depth)
    .setOrigin(0.5,0.5,0.5);

  _createSides.call(this);

  this.parentNode.addUIEvent('click');
  this.parentNode.onReceive = function(event,payload){

    if(event==='click'){
      this.context.approot.setSelectedBox(this.container);
    }

  }


}

BoxNode.prototype.getParentNode = function(){
  return this.parentNode;
}

BoxNode.prototype.rotate = function(dir,axis){

  if(axis == "x"){

    if(dir == "pos") {

      this.rotateXAngle += Math.PI/6;

    } else if(dir == "neg") {

      this.rotateXAngle -= Math.PI/6;

    }

  } else if(axis == "y"){

    if(dir == "pos") {
      this.rotateYAngle += Math.PI/6;
    } else if(dir == "neg") {
      this.rotateYAngle -= Math.PI/6;
    }

  }

  this.rotationObj.set(this.rotateXAngle,this.rotateYAngle,0,{duration : 500});

}

function _createSides(){

  //Create Front side
  this.sidesNodeContainer.front = this.parentNode.addChild();
  this.sidesNodeContainer.front.setSizeMode('absolute', 'absolute')
                               .setAbsoluteSize(this.width, this.height);

  this.sidesDOMContainer.front = new DOMElement(this.sidesNodeContainer.front, {
                          properties:{
                            'background-color':this.color,

                          }
                        });

  this.sidesNodeContainer.front.addUIEvent('click');

  //Create Left side
  this.sidesNodeContainer.left = this.parentNode.addChild();
  this.sidesNodeContainer.left.setSizeMode('absolute', 'absolute')
                       .setAbsoluteSize(this.depth, this.height)
                       .setRotation(0,3/2 * Math.PI,0)
                       .setPosition(0,0,-this.depth);
  this.sidesNodeContainer.left.addUIEvent('click');

  this.sidesDOMContainer.left = new DOMElement(this.sidesNodeContainer.left, {
                          properties:{
                            'background-color':'#00ff00',
                          }
                        });

  this.sidesNodeContainer.left.addUIEvent('click');

  this.sidesNodeContainer.right = this.parentNode.addChild();
  this.sidesNodeContainer.right.setSizeMode('absolute', 'absolute','absolute')
          .setAbsoluteSize(this.depth, this.height,0)
          .setRotation(0,Math.PI/2,0)
          .setPosition(this.width,0,0);

  this.sidesDOMContainer.right = new DOMElement(this.sidesNodeContainer.right, {
        id : "rightDom",
        properties:{
          'background-color':'cyan'
        }
      });

  this.sidesNodeContainer.right.addUIEvent('click');

}


module.exports = BoxNode;
