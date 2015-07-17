var DOMElement = require('famous/dom-renderables/DOMElement');

function Connector(pnode,plength,porient,pdir,parrowvisible){

  var that = this;

  this.container = pnode;

  this.length = plength;
  this.orientation = porient; // 1 - Horizontal , 0 - Vertical
  this.direction = pdir; // 1 - Right , 0 - Left
  this.arrowvisible = parrowvisible;

  this.lengthdiff = this.arrowvisible ? 10 : 0;

  this.container.setSizeMode(1,1,1)
    .setAbsoluteSize(this.orientation ? plength - this.lengthdiff : 10 , !this.orientation ? plength - this.lengthdiff : 10 ,0 );

  _createElements.call(this);

}

Connector.prototype.getParentNode = function(){
  return this.container;
}

Connector.prototype.setOpacity = function(val){

  this.container.setOpacity(val);
}

function _createElements(){

  this.container.span = this.container.addChild();

  this.container.connectorEl = new DOMElement(this.container.span, {

    properties:{

        'background-color' : 'rgb(209, 205, 205)'

    }
  });

  if(this.arrowvisible){

    this.container.arrow = this.container.addChild();

    this.container.arrow.setSizeMode(1,1,1).setAbsoluteSize(20,20);
    this.container.arrowHeadEl = new DOMElement(this.container.arrow)


    if(this.direction) {

      if(this.orientation){

        this.container.arrow.setPosition(this.length - 20,-15);
        this.container.arrowHeadEl.setProperty('width',0);
        this.container.arrowHeadEl.setProperty('height', 0);
        this.container.arrowHeadEl.setProperty('border-top', '20px solid transparent');
        this.container.arrowHeadEl.setProperty('border-bottom', '20px solid transparent');
        this.container.arrowHeadEl.setProperty('border-left', '20px solid rgb(209, 205, 205)');


      } else {

        this.container.arrow.setPosition(-15,this.length - 20);
        this.container.arrowHeadEl.setProperty('width',0);
        this.container.arrowHeadEl.setProperty('height', 0);
        this.container.arrowHeadEl.setProperty('border-left', '20px solid transparent');
        this.container.arrowHeadEl.setProperty('border-right', '20px solid transparent');
        this.container.arrowHeadEl.setProperty('border-top', '20px solid rgb(209, 205, 205)');

      }

    } else {

      if(this.orientation){

        this.container.arrow.setPosition(0,-15);
        this.container.span.setPosition(10,0);
        this.container.arrowHeadEl.setProperty('width',0);
        this.container.arrowHeadEl.setProperty('height', 0);
        this.container.arrowHeadEl.setProperty('border-top', '20px solid transparent');
        this.container.arrowHeadEl.setProperty('border-bottom', '20px solid transparent');
        this.container.arrowHeadEl.setProperty('border-right', '20px solid rgb(209, 205, 205)');


      } else {

        this.container.arrow.setPosition(-15,-15);
        this.container.arrowHeadEl.setProperty('width',0);
        this.container.arrowHeadEl.setProperty('height', 0);
        this.container.arrowHeadEl.setProperty('border-left', '20px solid transparent');
        this.container.arrowHeadEl.setProperty('border-right', '20px solid transparent');
        this.container.arrowHeadEl.setProperty('border-bottom', '20px solid rgb(209, 205, 205)');



      }


    }
  }
}

module.exports = Connector;
