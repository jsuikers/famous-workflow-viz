'use strict';


var DOMElement = require('famous/dom-renderables/DOMElement');

var Size = require('famous/components/Size');
var Position = require('famous/components/Position');
var Rotation = require('famous/components/Rotation');

function BoxNode(pparentNode, pcaption ,pwidth , pheight ,pdepth,pcolor,pcontext){

  this.boxnode = pparentNode;
  this.parentNode = this.boxnode.addChild();
  this.width = pwidth;
  this.height = pheight;
  this.depth = pdepth;
  this.color = pcolor;
  this.caption = pcaption;

  this.parentNode.context = pcontext;
  this.parentNode.container = this;

  this.isSelected = false;

  this.rotationObj = new Rotation(this.parentNode);
  this.rotateXAngle = 0;
  this.rotateYAngle = 0;

  this.sidesNodeContainer = {};
  this.sidesDOMContainer = {};

  this.boxnode.setSizeMode(1,1,1)
    .setAbsoluteSize(this.width,this.height,this.depth);

  this.parentNode.setSizeMode(1,1,1)
    .setAbsoluteSize(this.width,this.height,this.depth)
    .setOrigin(0.5,0.5,0);

  _createSides.call(this);
  _createBackground.call(this);

  this.parentNode.addUIEvent('click');
  this.parentNode.onReceive = function(event,payload){

    if(event==='click'){
      if(this.isSelected){

        this.context.approot.unsetSelectedBox(this.container);
        this.backgroundDom.removeClass('boxbackgroundselected');
        this.isSelected = false;

      } else {

        this.context.approot.setSelectedBox(this.container);
        this.backgroundDom.addClass('boxbackgroundselected');
        this.isSelected = true;

      }

    }

  }


}

BoxNode.prototype.getParentNode = function(){
  return this.boxnode;
}

BoxNode.prototype.select = function(){

  this.parentNode.backgroundDom.addClass('boxbackgroundselected');

}

BoxNode.prototype.deselect = function(){

  this.parentNode.backgroundDom.removeClass('boxbackgroundselected');

}


BoxNode.prototype.rotate = function(dir,axis){

  if(axis == "x"){

    if(dir == "pos") {

      this.rotateXAngle += Math.PI/2;

    } else if(dir == "neg") {

      this.rotateXAngle -= Math.PI/2;

    }

  } else if(axis == "y"){

    if(dir == "pos") {
      this.rotateYAngle += Math.PI/2;
    } else if(dir == "neg") {
      this.rotateYAngle -= Math.PI/2;
    }

  }

  this.rotationObj.set(this.rotateXAngle,this.rotateYAngle,0,{duration : 500});

}

function _createBackground(){

  this.parentNode.backgroundNode = this.boxnode.addChild();
  this.parentNode.backgroundNode.setSizeMode('absolute', 'absolute')
                               .setPosition(-10,-30 , - this.depth)
                               .setAbsoluteSize(this.width + 20, this.height +30);

  this.parentNode.backgroundDom = new DOMElement(this.parentNode.backgroundNode , {
                          classes : ['boxbackground'],
                          content : this.caption
                        });

}

function _createSides(){

  //Create Front side
  this.sidesNodeContainer.front = this.parentNode.addChild();
  this.sidesNodeContainer.front.setSizeMode('absolute', 'absolute')
                               .setAbsoluteSize(this.width, this.height);

  this.sidesDOMContainer.front = new DOMElement(this.sidesNodeContainer.front, {
                          classes : ['boxside'],
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
                          classes : ['boxside'],
                          properties:{
                            'background-color':this.color,
                          }
                        });

  this.sidesNodeContainer.left.addUIEvent('click');

  //Create Right Side
  this.sidesNodeContainer.right = this.parentNode.addChild();
  this.sidesNodeContainer.right.setSizeMode('absolute', 'absolute','absolute')
          .setAbsoluteSize(this.depth, this.height,0)
          .setRotation(0,Math.PI/2,0)
          .setPosition(this.width,0,0);

  this.sidesDOMContainer.right = new DOMElement(this.sidesNodeContainer.right, {
        id : "rightDom",
        classes : ['boxside'],
        properties:{
          'background-color':this.color
        }
      });

  this.sidesNodeContainer.right.addUIEvent('click');

  //Create Back Side
  this.sidesNodeContainer.back = this.parentNode.addChild();
  this.sidesNodeContainer.back.setSizeMode('absolute', 'absolute')
          .setAbsoluteSize(this.width, this.height)
          .setPosition(0,0,0)
          .setOrigin(0.5,0,0)
          .setRotation(0,Math.PI,0);

  this.sidesNodeContainer.back.addUIEvent('click');

  this.sidesDOMContainer.back = new DOMElement(this.sidesNodeContainer.back, {
      classes : ['boxside'],
      properties:{
      'background-color':this.color
    }
  });

  //Create Bottom Side
  this.sidesNodeContainer.bottom = this.parentNode.addChild();
  this.sidesNodeContainer.bottom.setSizeMode('absolute', 'absolute')
          .setAbsoluteSize(this.width, this.depth)
          .setRotation(3 * Math.PI/2,0,0)
          .setPosition(0,this.height,0)

  this.sidesNodeContainer.bottom.addUIEvent('click');
  this.sidesDOMContainer.bottom = new DOMElement(this.sidesNodeContainer.bottom, {
    id : "bottomDom",
    classes : ['boxside'],
    properties:{
      'background-color':this.color
    }
  });

  //Create Top Side
  this.sidesNodeContainer.top = this.parentNode.addChild();

  this.sidesNodeContainer.top.setSizeMode('absolute', 'absolute')
          .setAbsoluteSize(this.width, this.depth)
          .setOrigin(1,0)
          .setRotation(-Math.PI/2,-Math.PI,0)
          .setPosition(-this.width,0,0)
  this.sidesNodeContainer.top.addUIEvent('click');

  this.sidesDOMContainer.top = new DOMElement(this.sidesNodeContainer.top, {
    id : "topDom",
    classes : ['boxside'],
    properties:{
      'background-color':this.color
    }
  });

  this.sidesDOMContainer.top.setProperty('z-index',1);


}


module.exports = BoxNode;
