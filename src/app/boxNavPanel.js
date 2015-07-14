var DOMElement = require('famous/dom-renderables/DOMElement');

function BoxNavPanel(pnode,pcontext){

  var that = this;

  this.containerNode = pnode;
  this.context = pcontext;

  this.containerNode.setSizeMode('absolute', 'absolute', 'absolute')
          .setAbsoluteSize(100, 100)
          .setAlign(0.9,0.8);

  this.topArrow = this.containerNode.addChild()
  this.topArrow.setSizeMode('absolute', 'absolute')
          .setAbsoluteSize(25, 25)
          .setAlign(0.25,0);

  this.topArrow.addUIEvent('click');

  this.topArrow.onReceive = function(event,payload){
    if(event==='click'){
       that.context.appscene.emit('top',{payload:"dummy"});

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
       that.context.appscene.emit('bottom',{payload:"dummy"});

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
       that.context.appscene.emit('right',{payload:"dummy"});

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
         that.context.appscene.emit('left',{payload:"dummy"});

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

  this.centerArrow = this.containerNode.addChild()
  this.centerArrow.setSizeMode('absolute', 'absolute')
            .setAbsoluteSize(50, 50)
            .setAlign(.25,0.25)


  this.centerDom = new DOMElement(this.centerArrow, {
    id : 'centerButton',
    properties:{
        'border-radius': '50%',
        'background-color' : 'black'
    }
  });
  this.centerDom.setProperty('zIndex', '2');
  this.centerDom.setProperty('cursor', 'pointer');


}


module.exports = BoxNavPanel;
