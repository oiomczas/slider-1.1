(function () {
  'use strict';
      
      
  var index = -1,
    slider = document.querySelector('.oiS'),
    images = slider.querySelectorAll('img'),
    timer =  setInterval(repeatByIntervalPart, 3000);
    
  
  // pokaż ukryj kontrolki -----------------
  
  slider.addEventListener('mouseenter', function () {
    var controlss = slider.querySelector('.oiS-Control-container');
    controlss.style.visibility = 'visible';
  });
      
  slider.addEventListener('mouseleave', function () {
    var controlss = slider.querySelector('.oiS-Control-container');
    controlss.style.visibility = 'hidden';
  });
  
  slider.addEventListener('keydown', function(e){
    console.log(e.keyCode);
    if(e.keyCode == 9){
     var controlss = slider.querySelector('.oiS-Control-container');
      controlss.style.visibility = 'visible';
    }
  })
  //-----------------------------------------
  
  
  // operacje na obrazkach i opisach------------------------
  
  function procesImages(image, callBack) {    //operuje na wszystkich obrazach
    var i, max = images.length;
    for (i = 0; i < max; i++) {
      callBack(image[i]);
    }
  }
      
      
  function removeAtiveClass(image) {  //ustaawia wszystkim obrazom classe (a takze usuwa klase oiS-Active)
    image.className = 'oiS-image';
  }
      
      
  function nextImg() {  // zeminia obrazek
    index++;
    if (index > images.length - 1) {
      index = 0;
    }
    images[index].classList.add('oiS-Active-img');
    procesDots(removeLightDot);
    procesDots(addLight);
  }
  
  function createDescPlace() {  // tworzy element p dla opisow
    var place = document.createElement('p');
    place.classList.add('oiS-Description');
    slider.appendChild(place);
  }
      
  function updateDesc() {    // zmienia opis obrazka na podstawie jego altu
    var active = slider.querySelector('.oiS-Active-img'),
      element = slider.querySelector('.oiS-Description');
    element.innerHTML = active.alt;
  }
      
  //-------------------------------


  // Operacje na ktopkach------------------
  
  function removeLightDot(dot) {   //usuwa poswietlenie
    dot.classList.remove('oiS-Light');
  }
      
  function addLight(dot) {  //dodaje podswietlenie
    if (parseInt(dot.dataset.img, 10) === index) {
      dot.classList.add('oiS-Light');
    }
  }
  
  function procesDots(callBack) {   //operuje na wszystkich kropkach
    var dots = slider.querySelectorAll('.oiS-Dot'),
      i,
      max = dots.length;
    for (i = 0; i < max; i++) {
      callBack(dots[i]);
    }
  }
      
  
  function createDots() {  // tworzy kropki
    var dotsDiv = document.createElement('div'),
      i,
      max = images.length,
      dot;
    dotsDiv.classList.add('oiS-Dots');
    slider.appendChild(dotsDiv);
    for (i = 0; i < max; i++) {
      dot = document.createElement('a');
      dot.textContent = i + 1;
      dot.setAttribute('href', images[i].src);
      dot.setAttribute('data-img', i);
      dot.addEventListener('click', changeImageDot);
      dot.classList.add('oiS-Dot');
      dotsDiv.appendChild(dot);
    }
        
  }
      
  function changeImageDot(e) {  // zmiana obrazka po kliknieciu w kropke
    index = (e.target.dataset.img - 1);
    e.preventDefault();
    reUseFunctions();
  }
  //----------------------
   // Interwal--------------------  
  function stopStartInterval() {  //zatrzymuje i wznawia interwal
    clearInterval(timer);
    timer = setInterval(repeatByIntervalPart, 3000);
  }
 //-----------------------------     
  
 // Tworzy kontrolki ----------------------
      
  function createControl() {
    var container = document.createElement('div'),
      prev,
      next;
    container.classList.add('oiS-Control-container');
        
    prev = document.createElement('button');
    prev.classList.add('oiS-Prev');
    prev.textContent = 'Prev';
    prev.addEventListener('click', prevChangeButton);
       
        
    next = document.createElement('button');
    next.classList.add('oiS-Next');
    next.textContent = "Next";
    next.addEventListener('click', nextChangeButton);
        
    slider.appendChild(container);
    container = document.querySelector('.oiS-Control-container');
    container.appendChild(prev);
    container.appendChild(next);
  }
      
  function nextChangeButton() {
    reUseFunctions();
  }
      
  function prevChangeButton() {
    index -= 2;          //- 2 ponieważ w funckji reUseFunctions wywoływana jest funkcja nextImg która dodaje 1 do                      //indexu
    if (index <= -2) {
      index = images.length - 2;
          
    }
        
    reUseFunctions();
        
  }
      
// ---------------------------------------
  
 // dodaje style ---------------------------
  
  function createLinkCss() {
    var head = document.getElementsByTagName('head')[0],
      style = document.createElement('link');
    style.setAttribute('href', 'styleSlider.css');
    style.setAttribute('rel', 'stylesheet');
    head.appendChild(style);
  }
  // ---------------------------
  
  // funkcje wieloktotnego uzytku --------------------
  function repeatByIntervalPart() {
    procesImages(images, removeAtiveClass);
    nextImg();
    updateDesc();
  }
  
  function reUseFunctions() {
    procesImages(images, removeAtiveClass);
    nextImg();
    updateDesc();
    procesDots(removeLightDot);
    procesDots(addLight);
    stopStartInterval();
        
  }
  
  
  
  //-----------------------------------
  
  //inicjuje dzialanie slidera -------------------------
  
  function init() {
    createLinkCss();
    procesImages(images, removeAtiveClass);
    createDescPlace();
    createDots();
    createControl();
    procesDots(addLight);
    repeatByIntervalPart();
  }
  
  //---------------------------------
  
  init();
      
      
      
})();