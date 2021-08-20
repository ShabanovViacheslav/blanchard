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
    new SimpleBar(item, {
      autoHide: false,
    });
  }


  function heroSlider() {
    new Swiper('.hero__slider', {
      wrapperClass: 'hero__wrapper',
      slideClass: 'hero__slide',
      loop: true,
      autoplay: {
        delay: 10000,
      },
      speed: 500,
      allowTouchMove: false,
    })
  };

  heroSlider();


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


  new Choices(document.querySelector('.gallery__select'), {
    searchEnabled: false,
    itemSelectText: '',
  })

  function gallerySlider () {
    new Swiper('.swiper-gallery', {
      preloadImages: false,
      lazy: true,
      watchSlidesVisibility: true,
      pagination: {
        el: ".swiper-pagination",
        type: "fraction",
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 0,
        },
        768: {
          slidesPerView: 2,
          slidesPerColumn: 2,
          spaceBetween: 34,
          slidesPerGroup: 2
        },
        1920: {
          slidesPerView: 3,
          slidesPerColumn: 2,
          spaceBetween: 50,
          slidesPerGroup: 3
        }
      }
    });
  }

  gallerySlider();


  let btns = document.querySelectorAll('.gallery__container');
  const modalOverlay = document.querySelector('.gallery__overlay');
  const modals = document.querySelectorAll('.gallery__modal');

  btns.forEach((el) => {
    el.addEventListener('click', (e) => {
      let path = e.currentTarget.getAttribute('data-path');

      modals.forEach((el) => {
        el.classList.remove('galery__modal_visible');
      });

      let modal = document.querySelector(`[data-target="${path}"]`);
      modal.classList.add('gallery__modal_visible');

      let modalClose = modal.querySelector('.close_modal');
      modalClose.addEventListener('click', () => {
        modal.classList.remove('gallery__modal_visible');
        modalOverlay.classList.remove('gallery__overlay_visible');
      });

      modalOverlay.classList.add('gallery__overlay_visible');
    });
  });


  document.querySelectorAll('.catalog__country').forEach(function(tabElement){
    tabElement.addEventListener('click', function(event){
      let path = event.currentTarget.dataset.path;
      document.querySelectorAll('.catalog__country').forEach(function(tabElementStyle){
        tabElementStyle.classList.remove('catalog__country_activ');
      });
      document.querySelectorAll('.catalog__container').forEach(function(tabContent){
        tabContent.classList.remove('catalog__container_activ');
      });
      document.querySelector(`[data-target="${path}"]`).classList.add('catalog__container_activ');
      event.currentTarget.classList.toggle('catalog__country_activ');
    });
  });


  $( function() {
    $( ".accordion" ).accordion(
      {icons: false, collapsible: true, active: 0, heightStyle: "content", header: ".accordion__header"}
    );
  } );


  document.querySelectorAll('.catalog__container').forEach(function(element){
    element.querySelectorAll('.catalog__painter').forEach(function(tabElement){
      tabElement.addEventListener('click', function(event){
        let path = event.currentTarget.dataset.path;
        element.querySelectorAll('.catalog__painter').forEach(function(tabElementStyle){
          tabElementStyle.classList.remove('catalog__painter_activ');
        });
        element.querySelectorAll('.catalog__person').forEach(function(tabContent){
          tabContent.classList.remove('catalog__person_activ');
        });
        element.querySelector(`[data-target="${path}"]`).classList.add('catalog__person_activ');
        event.currentTarget.classList.toggle('catalog__painter_activ');
      });
    });
  })


  function calcScroll() {
    if(window.matchMedia('(max-width: 767px)').matches) {
      document.querySelectorAll('.catalog__container').forEach(function(element){
        element.querySelectorAll('.catalog__painter').forEach(function(tabElement){
          tabElement.addEventListener('click', function(e) {
            let path = e.currentTarget.dataset.path;
            element.querySelector(`[data-target="${path}"]`).scrollIntoView(top);
          });
        });
      });
    }
  }

  calcScroll();

// events section

  let slideElement = document.querySelector('.events__slide_768');
  let eventElement = document.querySelector('.button_events');

  if(window.innerWidth <= 1023) {
    slideElement.classList.toggle('events__slide_hide');
    slideElement.classList.toggle('events__slide_768');
  }

  window.addEventListener('resize', () => {
    if(window.innerWidth <= 1023  && eventElement.dataset.status == 'on') {
        slideElement.classList.add('events__slide_hide');
      } else {
        slideElement.classList.remove('events__slide_hide');
      }
  });

  let eventsElement = document.querySelectorAll('.events__slide_hide');

  for(let item of eventsElement) {
    eventElement.addEventListener('click', function(){
      item.classList.remove('events__slide_hide');
      eventElement.classList.add('button__events_hide');
      eventElement.dataset.status = 'off';
    })
  }


  let sliderElement = document.querySelector('.events__swiper');
  let mySwiper;

  function mobileSlider() {
    if(window.innerWidth <= 767 && sliderElement.dataset.mobile == 'false') {
      mySwiper = new Swiper('.events__swiper', {
        slidesPerView: 1,
        loop: true,
        containerModifierClass: 'events__swiper',
        slideClass: 'events__slide',
        wrapperClass: 'events__wrapper',
        spaceBetween: 20,
        pagination: {
          el: '.events__pagination',
          type: 'bullets',
          bulletActiveClass: 'events__pagination_bullet-active',
          bulletClass: 'events__pagination_bullet'
        }
      });

      sliderElement.dataset.mobile = 'true';
    }

    if(window.innerWidth > 767) {
      sliderElement.dataset.mobile = 'false';
      if(sliderElement.classList.contains('events__swiperinitialized')) {
        mySwiper.destroy();
      }
    }
  }

  mobileSlider();

  // public section

  let sliderPublic = document.querySelector('.public__swiper');
  let swiperPublic;

  function removeStyle(wr, sl) {
    wr.removeAttribute('style');
    for(let item of sl) {
      item.removeAttribute('style');
    }
  };

  function desctopSlider() {

    if(window.matchMedia('(min-width: 768px)').matches) {
      swiperPublic = new Swiper('.public__swiper', {
        pagination: {
          el: ".public__pagination",
          type: "fraction",
        },
        navigation: {
          nextEl: '.public__button_next',
          prevEl: '.public__button_prev',
          disabledClass: "public__button_disabled",
        },
        wrapperClass: 'public__wrapper',
        slideClass: 'public__slide',
        a11y: {
          enabled: false
        },
        breakpoints: {
          768: {
            slidesPerView: 2,
            slidesOffsetBefore: 31,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 49
          },
          1920: {
            slidesPerView: 3,
            spaceBetween: 50
          }
        },
        on: {
          destroy: function() {
            let wrapperElement = document.querySelector('.public__wrapper');
            let slideElements = document.querySelectorAll('.public__slide');
            removeStyle(wrapperElement, slideElements);
          }
        }
      });
    } else {
      if(sliderPublic.classList.contains('swiper-container-initialized')) {
        swiperPublic.destroy(true, true);
      }
    }
  };

  desctopSlider();

  function choseDesign() {
    if(window.matchMedia('(max-width: 767px)').matches) {
      let designElement = document.querySelector('.public__item_chosen');
      designElement.classList.add('public__item_chose');
    }
  };

  choseDesign();

  let categoryElement = document.querySelector('.public__category');
  let itemElement = document.querySelectorAll('.public__item');

  categoryElement.addEventListener('click', () => {
    for(let item of itemElement) {
      if(!item.classList.contains('public__item_chose')) {
        item.classList.toggle('public__item_show');

        let checkElement = item.querySelector('.public__check');
        checkElement.addEventListener('input', () => {
          item.classList.toggle('public__item_chose');
        });

        let closeElement = item.querySelector('.public__close');
        closeElement.addEventListener('click', () => {
          //
        })
      }
    }
  });


  // projects section

  function projectsSlider () {
    new Swiper('.projects__swiper', {
      navigation: {
        nextEl: '.projects__button_next',
        prevEl: '.projects__button_prev',
        disabledClass: "projects__button_disabled",
      },
      wrapperClass: 'projects__wrapper',
      slideClass: 'projects__slide',
      breakpoints: {
        320: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 34,
          slidesPerGroup: 2
        },
        1024: {
          slidesPerView: 2,
          spaceBetween: 50,
          slidesPerGroup: 2
        },
        1920: {
          slidesPerView: 3,
          spaceBetween: 50,
          slidesPerGroup: 3
        }
      }
    });
  }

  projectsSlider ();

  tippy('#tt1', {
    content: 'Пример современных тенденций - современная методология разработки',
    maxWidth: 264,
    theme: 'myTheme',
  });

  tippy('#tt2', {
    content: 'Приятно, граждане, наблюдать, как сделанные на базе аналитики выводы вызывают у вас эмоции',
    maxWidth: 264,
    theme: 'myTheme',
  });

  tippy('#tt3', {
    content: 'В стремлении повысить качество',
    maxWidth: 232,
    theme: 'myTheme',
  });

  // contacts section

  let flag = 0;

  let contactsOverlay = document.querySelector('.contacts__overlay');
  let contactsModal = document.querySelector('.contacts__modal');
  let contactsClose = document.querySelector('.close_modal-contacts');

  contactsClose.addEventListener('click', () => {
    contactsModal.classList.remove('contacts__modal_visible');
    contactsOverlay.classList.remove('contacts__overlay_visible');
  })

  function getModal () {
    contactsOverlay.classList.add('contacts__overlay_visible');
    contactsModal.classList.add('contacts__modal_visible');
  };

  window.addEventListener('scroll', function() {
    let scrollY = window.scrollY;
    let mapOffset = document.querySelector('#map').offsetTop;

    if((scrollY >= mapOffset - 1000) && (flag == 0)) {
      function init(){
        var myMap = new ymaps.Map("map", {
          center: [55.761011994387864,37.61218414865425],
          zoom: 14,
          controls: [],
        });

        var myPlacemark = new ymaps.Placemark([55.758468, 37.601088], {}, {
          iconLayout: 'default#image',
          iconImageHref: '/img/ellipse12.svg',
          iconImageSize: [20, 20]
        });

        myMap.geoObjects.add(myPlacemark);
      }

      ymaps.ready(init);

      var selector = document.getElementById("selector");
      var im = new Inputmask("+7(999) 999-99-99");

      im.mask(selector);

      new JustValidate('.contacts__form', {
        rules: {
          name: {
            required: true,
            minLength: 2,
            maxLenght: 10,
          },
          tel: {
            required: true,
            function: (name, value) => {
              const phone = selector.inputmask.unmaskedvalue();
              return Number(phone) && phone.length === 10
            }
          },
        },
        messages: {
          name: {
            required: 'Как вас зовут?',
            minLength: 'Минимум два символа',
            maxLenght: 'Максимум тридцать символов'
          },
          tel: 'Укажите ваш телефон',
          },
        submitHandler: function(form, values, ajax) {
          ajax({
            url: 'mail.php',
            method: 'POST',
            data: values,
            async: true,
            callback: function()  {
              form.reset();
              getModal();
            }
          });
          }
      });

      flag = 1;
    }
  })

  window.addEventListener('resize', () => {
    heroSlider();
    gallerySlider();
    calcScroll();
    mobileSlider();
    desctopSlider();
    projectsSlider();
    choseDesign();
  });

})
