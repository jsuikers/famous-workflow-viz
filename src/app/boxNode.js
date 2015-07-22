'use strict';


var DOMElement = require('famous/dom-renderables/DOMElement');

var Size = require('famous/components/Size');
var Position = require('famous/components/Position');
var Rotation = require('famous/components/Rotation');

function BoxNode(pparentNode, pcaption ,pwidth , pheight ,pdepth,pcolor,pcontext,psidecaptions){

  this.boxnode = pparentNode;
  this.parentNode = this.boxnode.addChild();
  this.width = pwidth;
  this.height = pheight;
  this.depth = pdepth;
  this.color = pcolor;
  this.caption = pcaption;
  this.sidecaptions = psidecaptions;

  this.parentNode.context = pcontext;
  this.parentNode.container = this;

  this.isSelected = false;
  this.isDropdown = false;
  this.isZoomed = false;

  this.rotationObj = new Rotation(this.parentNode);
  this.rotateXAngle = 0;
  this.rotateYAngle = 0;

  this.sidesNodeContainer = {};
  this.sidesDOMContainer = {};
  this.dropdownContainer = this.boxnode.addChild();

  this.boxnode.setSizeMode(1,1,1)
    .setAbsoluteSize(this.width,this.height,this.depth);

  this.parentNode.setSizeMode(1,1,1)
    .setAbsoluteSize(this.width,this.height,this.depth)
    .setOrigin(0.5,0.5,0);

  this.dropdownContainer.setSizeMode(1,1,1)
    .setAbsoluteSize(this.width,0,0)
    .setPosition(0,this.height,this.depth);

  this.dropdownContainerSize = new Size(this.dropdownContainer);
  this.dropdownContainerSize.setAbsolute(this.width,0,0);


  _createSides.call(this);
  _createBackground.call(this);
  _createDropdown.call(this);

  this.parentNode.addUIEvent('click');
  this.parentNode.onReceive = function(event,payload){

    if(event==='click'){
      if(this.isSelected){

        this.context.approot.unsetSelectedBox(this.container);

      } else {

        this.context.approot.setSelectedBox(this.container);

      }

    }

  }


}

BoxNode.prototype.getParentNode = function(){
  return this.boxnode;
}

BoxNode.prototype.getCaption = function(){
  return this.caption;
}

BoxNode.prototype.select = function(){

  this.parentNode.backgroundDom.addClass('boxbackgroundselected');
  this.isSelected = true;

}

BoxNode.prototype.deselect = function(){

  this.parentNode.backgroundDom.removeClass('boxbackgroundselected');
  this.isSelected = false;
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

BoxNode.prototype.addData = function(side,data){

    var affectedSide = '#' + this.caption + '-' + side;


    //$(affectedSide).sparkline(data.data,{type : data.type});

    //$(affectedSide).sparkline([5,6,7,2,0,-4,-2,4,8,10], {type: 'bar'});

    $(affectedSide + " .content").html('<span class="' + data.type + '">' + data.data + '</span>');

    var updatingChart = $(affectedSide + " .content").peity(data.type,{height : 40 , width : data.width});
    $(affectedSide + " .heading").html(this.sidecaptions[side]);

    if(side == "front"){

      setInterval(function() {
        var random = Math.round(Math.random() * 50)
        var values = updatingChart.text().split(",")
        values.shift()
        values.push(random)

        updatingChart
          .text(values.join(","))
          .change()
      }, 10000);

    }

}

BoxNode.prototype.drop = function(data){

  if(this.isDropdown){
    this.dropdownContainerSize.setAbsolute(this.width,0,0,{duration : 500});
    this.dropdownDOM.setContent('');
    this.isDropdown = false;
  } else {

    var that = this;

    var htmlContent = '<div> \
      <div style="border-bottom:2px solid black;"> \
       <span style="font-weight:bold">Key Stats</span> \
      </div> \
      <div style="float:left;width:50%;height:100%;text-align:right;"> \
        <span>Pass Through :</span></br> \
        <span>Abort :</span></br> \
        <span>Fail :</span></br> \
      </div> \
      <div style="float:right;width:50%;height:100%;text-align:center;"> \
      <span>' + data[0] + '%</span></br> \
      <span>' + data[1] + '%</span></br> \
      <span>' + data[2] + '%</span></br> \
      </div> \
    </div>'

    this.dropdownContainerSize.setAbsolute(this.width,this.height*2,0,{duration : 500},function(){
        that.dropdownDOM.setContent(htmlContent);
    });

    this.isDropdown = true;
  }


}

BoxNode.prototype.expand = function(x,y,z){
  /*#####HACKED CODE TO DEMO ZOOMING ONLY##*/
  this.parentNode.backgroundNode.setAbsoluteSize(x,y,z);
  this.sidesNodeContainer.front.setAbsoluteSize(x-20,y-40,z);

}

BoxNode.prototype.contract = function(){
  /*#####HACKED CODE TO DEMO ZOOMING ONLY##*/
  this.parentNode.backgroundNode.setAbsoluteSize(this.width + 20, this.height +30);
  this.sidesNodeContainer.front.setAbsoluteSize(this.width, this.height);

}


function _createDropdown(){


  this.dropdownDOM = new DOMElement(this.dropdownContainer,{
      classes : ['dropdownbackground']
    }
  );



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
                          id : this.caption + '-front',
                          content : '<div class="box-side box-front"><div class="heading"></div><div class="content"></div></div>',
                          classes : ['boxside'],
                          properties:{
                            'background-color':this.color,

                          }
                        });

  //this.sidesDOMContainer.front.setProperty('z-index',1000);

  this.sidesNodeContainer.front.addUIEvent('click');

  //Create Left side
  this.sidesNodeContainer.left = this.parentNode.addChild();
  this.sidesNodeContainer.left.setSizeMode('absolute', 'absolute')
                       .setAbsoluteSize(this.depth, this.height)
                       .setRotation(0,3/2 * Math.PI,0)
                       .setPosition(0,0,-this.depth);
  this.sidesNodeContainer.left.addUIEvent('click');

  this.sidesDOMContainer.left = new DOMElement(this.sidesNodeContainer.left, {
                          id : this.caption + '-left',
                          content : '<div class="box-side box-front"><div class="heading"></div><div class="content"></div></div>',
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
        id : this.caption + '-right',
        content : '<div class="box-side box-front"><div class="heading"></div><div class="content"></div></div>',
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
      id : this.caption + '-back',
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
    id : this.caption + '-bottom',
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
    id : this.caption + '-top',
    classes : ['boxside'],
    properties:{
      'background-color':this.color
    }
  });

  this.sidesDOMContainer.top.setProperty('z-index',1);


}


module.exports = BoxNode;
