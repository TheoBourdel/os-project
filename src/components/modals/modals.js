function openModal(id) {
    let divModal = document.getElementById(id);
    divModal.style.transform = "scale(1)";
    console.log(divModal);
    divModal.style.transition = "transform .1s ease-out";
    divModal.style.zIndex = "3";
}

function closeModal(id){
    let divModal = document.getElementById(id);
    divModal.style.transform = "scale(0)";
    divModal.style.transition = "transform .1s ease-out";
}

/* gestion déplacement des fenètres*/
var oWdgCursor = function (sElement, sLimite) {
    this.oLimite = null;
    this.oElement = null;
    this.oLimite = document.getElementById(sLimite);
    this.bDrag = false;
    this.bError = false;
    this.sClassDrag = 'oWdgCursorDrag';
    this.oPos = {x:0,y:0};
    this.moveDiv = this.moveDiv.bind(this); 
    this.getBoundingLimite = function(){
      if(this.oLimite == document.documentElement){
        return  {
                width:window.innerWidth, 
                 height:window.innerHeight,
                 top:this.oLimite.offsetTop,
                 left:this.oLimite.offsetLeft
                }
      }
      return this.oLimite.getBoundingClientRect();
    }
    /**
    * Initialise les evenements
    */
    this.init = function (sLimite, sElement) {  
      this.oElement = document.getElementById(sElement); 
      this.oLimite =(sLimite === undefined)? document.documentElement:document.getElementById(sLimite);
      if(this.oElement == null || this.oLimite == null){
        return true;
      }//if
      this.oElement.addEventListener('mousedown', this.moveDiv);
      this.oElement.addEventListener('touchstart', this.moveDiv);
      return false;
    }//fct 
  
    this.bError = this.init(sLimite, sElement);
  }//fct
  
  oWdgCursor.prototype.moveDiv  = function (oEvent){
    oEvent.preventDefault();
    if(oEvent.type=="touchstart" || oEvent.type=="mousedown"){
      this.bDrag = true;
      var oTouch = oEvent,
          oRect = this.oElement.getBoundingClientRect();
      if(oEvent.type=="touchstart"){
        oTouch = null;
        if (oEvent.targetTouches.length > 0 ) {
          for(var i = 0; i < oEvent.targetTouches.length ; i++){
            if(oEvent.targetTouches[i].target == this.oElement){
              oTouch = oEvent.targetTouches[i];
              break;
            }//if
          }//for
        }//if
        if(oTouch==null){return}
      } //if
      this.oPos = {'left':(oTouch.clientX - oRect.left),'top': (oTouch.clientY - oRect.top)};
      document.addEventListener('mouseup', this.moveDiv) ;
      this.oElement.addEventListener('mouseup', this.moveDiv) ;
      document.addEventListener('touchend', this.moveDiv) ; 
  
      document.addEventListener('mousemove', this.moveDiv) ; 
      document.addEventListener('touchmove', this.moveDiv) ; 
    }else if(oEvent.type=="touchend" || oEvent.type=="mouseup"){
      this.bDrag = false;
      this.oElement.classList.remove(this.sClassDrag)
      document.removeEventListener('mousemove', this.moveDiv) ;
      document.removeEventListener('touchmove', this.moveDiv) ;
      document.removeEventListener('mouseup', this.moveDiv) ;
      document.removeEventListener('touchend', this.moveDiv) ; 
      this.oElement.removeEventListener('mouseup', this.moveDiv) ;
    }else if(oEvent.type=="touchmove" || oEvent.type=="mousemove"){
      var oTouch = oEvent;
  
      if(oEvent.type=="touchmove"){
        oTouch = null;
        if (oEvent.targetTouches.length > 0 ) {
          for(var i = 0; i < oEvent.targetTouches.length ; i++){
            if(oEvent.targetTouches[i].target == this.oElement){
              oTouch = oEvent.targetTouches[i];
              break;
            }//if
          }//for
        }//if
        if(oTouch==null){return}
      }//if
      if(this.bDrag == true){ 
        this.oElement.classList.add(this.sClassDrag)
        var oRect = this.getBoundingLimite(),
            iWidth= this.oElement.offsetWidth,
            iHeight = this.oElement.offsetHeight, 
            iClientX = oTouch.clientX - oRect.left - this.oPos.left,
            iClientY = oTouch.clientY- oRect.top - this.oPos.top 
        ;
        if(iClientX < 0 ){
          iClientX = 0;
        }else if(iClientX + iWidth > oRect.width){
          iClientX = oRect.width - iWidth ;
        }
        if(iClientY < 0 ){
          iClientY = 0;
        }else if(iClientY + iHeight > oRect.height){
          iClientY = oRect.height - iHeight ;
        } 
        this.oElement.style.left = iClientX+'px';
        this.oElement.style.top  = iClientY+'px';   
      }//if
      else{
        this.oElement.classList.remove(this.sClassDrag)
      }
    }//else if
  }//fct 
  
  document.addEventListener('DOMContentLoaded',function(){
    var oZone1 = new oWdgCursor('modal1');
    var oZone1 = new oWdgCursor('modal2');  
    var oZone1 = new oWdgCursor('modal3');
    var oZone1 = new oWdgCursor('modal4');
  });

  /***********/


  function modalForeground(element) {
    let modals = document.getElementsByClassName("modal-element");
    modalLength = modals.length;

    for(let i = 0; i < modalLength; i++){
        modals[i].style.zIndex = "1";
    }

    element.style.zIndex = "2";
  }

function fullScreenModal(element, button) {
    element.style.width = "100vw";
    element.style.height = "100vh";
    element.style.top = "0px";
    element.style.left = "0px";
    button.setAttribute("onclick", "reduceModal(this.parentElement, this)");
}
  
function reduceModal(element, button) {
    element.style.width = "500px";
    element.style.height = "500px";
    button.setAttribute("onclick", "fullScreenModal(this.parentElement, this)");
}

function displayModalForm() {
    let formModal = document.getElementById('formNewFolder');
    formModal.style.transform = "scale(1)";
    formModal.style.transition = "transform .1s ease-out";
}

function createNewModal() {
    let inputFolderName = document.getElementById("inputNameFolder");
    let folderName = document.getElementById("inputNameFolder").value;

    if(!folderName.length > 0) {
        inputFolderName.style.border = "solid 0.5px red";
        return;
    }

    let newModal = document.createElement("div");
    newModal.setAttribute("class", "modal-element");
    newModal.setAttribute("id", folderName);
    newModal.setAttribute("onclick", "modalForeground(this)");
    newModal.setAttribute("onchange", "modalForeground(this)");
    newModal.innerHTML = "<h2>"+folderName+"</h2>";
    newModal.style.backgroundColor = "grey";

    let desktop = document.getElementById("desktop"); 
    let buttonOpenModal = document.createElement('button');
    buttonOpenModal.setAttribute("id", "button"+folderName);
    buttonOpenModal.setAttribute("onclick", "openModal(\'"+ folderName +"\')");
    buttonOpenModal.innerHTML = folderName;
    desktop.appendChild(buttonOpenModal);

    let buttonResize = document.createElement('button');
    buttonResize.setAttribute("onclick", onclick="fullScreenModal(this.parentElement, this)");
    buttonResize.innerHTML = "resize";

    let buttonClose = document.createElement('button');
    buttonClose.setAttribute("onclick", onclick="closeModal(\'"+ folderName +"\')");
    buttonClose.setAttribute("class", "closeModalButton");
    buttonClose.innerHTML = "fermer";

    newModal.appendChild(buttonResize);
    newModal.appendChild(buttonClose);

    let divMain = document.getElementById("modalContainer");
    divMain.appendChild(newModal);
    
    var oZone1 = new oWdgCursor(folderName);
}