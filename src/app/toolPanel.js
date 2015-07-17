var DOMElement = require('famous/dom-renderables/DOMElement');


var toolContent = '<div style="width:100%;height:100%;"> \
                    <div id="datagrid" class="toolpanel" style="float:left;width:22%;height:100%;"> \
                    <span><img src="images/datagrid-icon.png" style="height:75%;width:75%;"/></span> \
                    </div> \
                    <div id="dropdown" class="toolpanel" style="float:left;width:22%;height:100%;"> \
                    <span><img src="images/dropdown-icon.png" style="height:75%;width:75%;"/></span> \
                    </div> \
                    <div id="alternative" class="toolpanel" style="float:left;width:22%;height:100%;"> \
                    <span><img src="images/alt-icon.png" style="height:75%;width:75%;"/></span> \
                    </div> \
                    <div id="lookinside" class="toolpanel" style="float:right;width:22%;height:100%;"> \
                    <span><img src="images/lookinside-icon.png" style="height:75%;width:75%;"/></span> \
                    </div> \
                  </div>';

function ToolPanel(pnode,pcontext){

  var that = this;

  this.containerNode = pnode;
  this.context = pcontext;

  this.containerNode.setSizeMode('relative', 'relative', 'relative')
          .setProportionalSize(.1, .05)
          .setPosition(0,0,500)
          .setAlign(0.45,0.85);

  this.containerNode.addUIEvent('click');

  this.containerDOM = new DOMElement(this.containerNode, {
          id : 'topButton',
          content : toolContent,
          //classes : ['toolpanel'],
          properties : {
            'background-color' : 'lightgray'
          }
        }
  );

  __initEvents.call(this);

}

function __initEvents(){

  var that = this;

  $('body').on('click',"#datagrid",function(){
    that.context.approot.populateData();
  });

  $('body').on('click',"#dropdown",function(){
    that.context.approot.triggerDropdown();
  });

  $('body').on('click',"#alternative",function(){
    that.context.approot.triggerAlt();
  });

}

module.exports = ToolPanel;
