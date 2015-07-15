var DOMElement = require('famous/dom-renderables/DOMElement');

function BoxNavPanel(pnode,pcontext,pname,pxalign,pyalign){

  var that = this;

  this.containerNode = pnode;
  this.context = pcontext;
  this.name = pname;

  this.containerNode.setSizeMode('absolute', 'absolute', 'absolute')
          .setAbsoluteSize(100, 100)
          .setPosition(0,0,500)
          .setAlign(pxalign,pyalign);

  this.topArrow = this.containerNode.addChild()
  this.topArrow.setSizeMode('absolute', 'absolute')
          .setAbsoluteSize(25, 25)

          .setAlign(0.25,0);

  this.topArrow.addUIEvent('click');

  this.topArrow.onReceive = function(event,payload){
    if(event==='click'){
       that.context.appscene.emit(that.name + '-top',{payload:"dummy"});

    }
  }

  this.topDom = new DOMElement(this.topArrow, {
          id : 'topButton',
          properties:{
            'width': 0,
          	'height': 0,
          	'border-left': '25px solid transparent',
          	'border-right': '25px solid transparent',

          	'border-bottom': '25px solid black'
          }
  });
  this.topDom.setProperty('zIndex', '2');
  this.topDom.setProperty('cursor', 'pointer');


  this.bottomArrow = this.containerNode.addChild()
  this.bottomArrow.setSizeMode('absolute', 'absolute')
          .setAbsoluteSize(25, 25)
          .setAlign(0.25,0.75)

  this.bottomArrow.addUIEvent('click');

  this.bottomArrow.onReceive = function(event,payload){
    if(event==='click'){
       that.context.appscene.emit(that.name + '-bottom',{payload:"dummy"});

    }
  }


  this.bottomDom = new DOMElement(this.bottomArrow, {
    id : 'bottomButton',
    properties:{
      'width': 0,
  	  'height': 0,
  	  'border-left': '25px solid transparent',
  	  'border-right': '25px solid transparent',

  	   'border-top': '20px solid black'
    }
  });
  this.bottomDom.setProperty('zIndex', '2');
  this.bottomDom.setProperty('cursor', 'pointer');


  this.rightArrow = this.containerNode.addChild()
  this.rightArrow.setSizeMode('absolute', 'absolute')
          .setAbsoluteSize(25, 25)
          .setAlign(0.75,0.25);

  this.rightArrow.addUIEvent('click');

  this.rightArrow.onReceive = function(event,payload){
    if(event==='click'){
       that.context.appscene.emit(that.name + '-right',{payload:"dummy"});

    }
  }


  this.rightDom = new DOMElement(this.rightArrow, {
    id : 'rightButton',
    properties:{
        'width': 0,
  	    'height': 0,
  	    'border-top': '25px solid transparent',
  	    'border-bottom': '25px solid transparent',

  	    'border-left': '25px solid black'
    }
  });
  this.rightDom.setProperty('zIndex', '2');
  this.rightDom.setProperty('cursor', 'pointer');


  this.leftArrow = this.containerNode.addChild()
  this.leftArrow.setSizeMode('absolute', 'absolute')
            .setAbsoluteSize(25, 25)
            .setAlign(0,0.25)

  this.leftArrow.addUIEvent('click');

  this.leftArrow.onReceive = function(event,payload){
    if(event==='click'){
         that.context.appscene.emit(that.name + '-left',{payload:"dummy"});

    }
  }


  this.leftDom = new DOMElement(this.leftArrow, {
    id : 'leftButton',
    properties:{
        'width': 0,
  	    'height': 0,
        'border-top': '25px solid transparent',
    	  'border-bottom': '25px solid transparent',

    	  'border-right': '25px solid black'
    }
  });
  this.leftDom.setProperty('zIndex', '2');
  this.leftDom.setProperty('cursor', 'pointer');

  this.nwArrow = this.containerNode.addChild()
  this.nwArrow.setSizeMode('absolute', 'absolute')
            .setAbsoluteSize(25, 25)
            .setAlign(.25,0.25)

  this.nwArrow.onReceive = function(event,payload){
    if(event==='click'){
         that.context.appscene.emit(that.name + '-nw',{payload:"dummy"});
    }
  }


  this.nwDom = new DOMElement(this.nwArrow, {
    id : 'centerButton',
    properties:{
        'border-radius': '25px 0 0 0',
        'background-color' : 'black',
        'border' :'1px solid white'
    }
  });
  this.nwDom.setProperty('zIndex', '2');
  this.nwDom.setProperty('cursor', 'pointer');

  this.neArrow = this.containerNode.addChild()
  this.neArrow.setSizeMode('absolute', 'absolute')
            .setAbsoluteSize(25, 25)
            .setAlign(.5,0.25)

  this.neArrow.onReceive = function(event,payload){
    if(event==='click'){
         that.context.appscene.emit(that.name + '-ne',{payload:"dummy"});
    }
  }


  this.neDom = new DOMElement(this.neArrow, {
    id : 'centerButton',
    properties:{
        'border-radius': '0px 25px 0 0',
        'background-color' : 'black',
        'border' :'1px solid white'
    }
  });
  this.neDom.setProperty('zIndex', '2');
  this.neDom.setProperty('cursor', 'pointer');

  this.seArrow = this.containerNode.addChild()
  this.seArrow.setSizeMode('absolute', 'absolute')
            .setAbsoluteSize(25, 25)
            .setAlign(.5,0.5)

  this.seArrow.onReceive = function(event,payload){
    if(event==='click'){
         that.context.appscene.emit(that.name + '-se',{payload:"dummy"});
    }
  }


  this.seDom = new DOMElement(this.seArrow, {
    id : 'centerButton',
    properties:{
        'border-radius': '0px 0px 25px 0',
        'background-color' : 'black',
        'border' :'1px solid white'
    }
  });
  this.seDom.setProperty('zIndex', '2');
  this.seDom.setProperty('cursor', 'pointer');

  this.swArrow = this.containerNode.addChild()
  this.swArrow.setSizeMode('absolute', 'absolute')
            .setAbsoluteSize(25, 25)
            .setAlign(.25,0.5)

  this.swArrow.onReceive = function(event,payload){
    if(event==='click'){
         that.context.appscene.emit(that.name + '-sw',{payload:"dummy"});
    }
  }


  this.swDom = new DOMElement(this.swArrow, {
    id : 'centerButton',
    properties:{
        'border-radius': '0px 0px 0px 25px',
        'background-color' : 'black',
        'border' :'1px solid white'
    }
  });
  this.swDom.setProperty('zIndex', '2');
  this.swDom.setProperty('cursor', 'pointer');



}


module.exports = BoxNavPanel;
