document.addEventListener('DOMContentLoaded', function(){

  let inputElement = document.querySelector('.header__input');
  let buttonElement = document.querySelector('.header__search');

  inputElement.addEventListener('focus', function() {
    buttonElement.classList.add('header__search_focused');
  });

  inputElement.addEventListener('blur', function() {
    buttonElement.classList.remove('header__search_focused');
  })


  let linkElements = document.querySelectorAll('.nav__link_bottom');

  for(let item of linkElements) {
    item.addEventListener('click', function(){
      item.classList.toggle('nav__link_bottom-open');

      let dropdown = item.nextElementSibling;

      dropdown.addEventListener('mouseleave', function(){
        item.classList.remove('nav__link_bottom-open');
      })

      function removeClass (element, className) {
        element.classList.remove(className);
      };

      item.addEventListener('blur', function(){
        setTimeout(removeClass, 200, this, 'nav__link_bottom-open');
      })
    })
  }


  let dropdownElements = document.querySelectorAll('.dropdown');

  for(let item of dropdownElements) {
    new SimpleBar(item);
  }


  new Swiper('.swiper-container', {
    loop: true,
    autoplay: {
      delay: 10000,
    },
    speed: 500,
    allowTouchMove: false,
  });


  let burgerElement = document.querySelector('.burger');
  let menuElement = document.querySelector('.header__group');

  burgerElement.addEventListener('click', function() {
    menuElement.classList.toggle('header__group_open');
  });

  let closeMenuEl = menuElement.querySelector('.close__link');

  closeMenuEl.addEventListener('click', function() {
    menuElement.classList.toggle('header__group_open');
  });


  let searchElement = document.querySelector('.header__search');
  let containerElement = document.querySelector('.container');
  let formElement = document.querySelector('.header__form');
  let containerHeadEl = document.querySelector('.container_header-bottom')
  let closeSearchEl = containerHeadEl.querySelector('.close');

  if ((containerElement.offsetWidth < 1920) && (containerElement.offsetWidth > 1023)) {
    searchElement.addEventListener('click', function(e) {
      e.preventDefault();
      inputElement.classList.toggle('header__input_open');
      inputElement.removeAttribute('placeholder');
      formElement.classList.toggle('header__form_open');
    })
  } else if (containerElement.offsetWidth < 1024) {
    searchElement.addEventListener('click', function(e) {
      e.preventDefault();
      containerHeadEl.classList.toggle('container_header-bottom-open');
      inputElement.classList.toggle('header__input_open');
      inputElement.removeAttribute('placeholder');
      closeSearchEl.classList.toggle('close_open');
    })
  }

  closeSearchEl.addEventListener('click', function() {
    containerHeadEl.classList.toggle('container_header-bottom-open');
    inputElement.classList.toggle('header__input_open');
    closeSearchEl.classList.toggle('close_open');
  })

})
