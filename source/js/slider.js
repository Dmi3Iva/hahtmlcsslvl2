window.addEventListener("load", function(){  
  let before       = document.querySelector('.slider-cat__first');
  let after        = document.querySelector('.slider-cat__second');  
  let mobileButton = document.querySelector('.slider-cat__control--mobile .slider-cat__button');
  
  /*cat slider before after*/
  //for mobile
  document.querySelector('.slider-cat__control--mobile').addEventListener('click',function(){
    if(after.style.width == '0%'){
      changeWidth(1);
      mobileButton.style.left = 38+'px';
    }
    else{
      changeWidth(0);
      mobileButton.style.left = 5+'px';
    }    
  });
  
  //for desktop
  let button       = document.querySelector('.slider-cat__button');
  let line         = document.querySelector('.slider-cat__line');
  
  
  line.addEventListener('click',function(e){
    let rect = line.getBoundingClientRect();
    let pos =  ( e.clientX - rect.left - 17 ) ;
    if( pos < 0 ){
      pos = 0;
    }
    if(pos > button.parentElement.clientWidth - 34 ){
      pos = button.parentElement.clientWidth  - 34;
    }
    button.style.left = pos + 'px';
    changeWidth( pos / ( rect.right - rect.left - 34) );
  });
  
  function changeWidth(value){
    after.style.width = value * 100 + '%';
    before.style.width = 100 - (value * 100) + '%';    
  }    
  
  if(window.outerWidth < 768){
    changeWidth(0);
  }
  else {
    changeWidth(0.5);
  }
  
  button.onmousedown = buttonMove;
  
  button.ondragstart = function() {
    return false;
  };
  
  function buttonMove(event){
    let leftPosition = getPositionX(button.parentElement);
    event.preventDefault();
    
    function moveAt(pageX){
      let pos = pageX - leftPosition - button.offsetWidth / 2;
      
      if(pos < 0 ){
        pos = 0;
      }
      if(pos > button.parentElement.clientWidth - 34){
        pos = button.parentElement.clientWidth - 34;
      }
      
      button.style.left =  pos + 'px';
      changeWidth(pos/ (button.parentElement.clientWidth -34));
    }
    
    function onMouseMove(event) {
      moveAt(event.pageX);
    }

    document.addEventListener("mousemove",  onMouseMove);
    
    document.onmouseup = function() {
      document.removeEventListener('mousemove', onMouseMove);
      document.onmouseup = null;
    };
  }
});

/*functions*/
function getPositionX(elem){
  return elem.getBoundingClientRect().left ;
}