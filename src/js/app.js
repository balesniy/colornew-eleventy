$(document).ready(() => {
  // открытие закрытие главного меню
  $('.js-menu-open').on('click', () => {
    $('.js-menu').addClass('is-open');
  });

  $('.js-menu-close').on('click', () => {
    $('.js-menu').removeClass('is-open');
  });

  // открытие и закрытие по клику вне переключения языков
  $('.js-dropdown-button').on('click', function () {
    const $this = $(this);
    const $dropdown = $this.closest('.js-dropdown');
    $dropdown.toggleClass('is-active');
  });

  $(document).click((event) => {
    if ($(event.target).closest('.js-dropdown').length) {
      return;
    }
    $('.js-dropdown').removeClass('is-active');
    event.stopPropagation();
  });

  // слайдер портфолио
  var swiper = new Swiper('.js-portfolio-slider', {
    spaceBetween: 30,
    breakpoints: {
      992: {
        slidesPerView: 'auto',
        watchSlidesVisibility: true,
      },
    },
  });

  swiper.on('slideChange', function () {
    const i = this.realIndex + 1;

    if (i == 1) {
      $('.js-portfolio-text').removeClass('is-animate');
    } else {
      $('.js-portfolio-text').addClass('is-animate');
    }
  });

  // анимация header при скроле
  const $header = $('.js-header');

  function fixedHeader() {
    if ($(window).scrollTop() > 70) {
      $header.addClass('is-scroll');
    } else {
      $header.removeClass('is-scroll');
    }
  }

  fixedHeader();

  $(window).scroll(() => {
    fixedHeader();
  });

  // слайдеры технологии
  if ($('.js-technologies-slider').length > 0) {
    var swiper = new Swiper('.js-technologies-slider', {
      spaceBetween: 60,
      speed: 6000,
      slidesPerView: 'auto',
      watchSlidesVisibility: true,
      loop: true,
      loopFillGroupWithBlank: true,
      autoplay: {
        delay: 1,
        disableOnInteraction: false,
      },
      breakpoints: {
        // when window width is >= 1024px
        1024: {
          autoplay: false,
        },
      },
    });

    window.onwheel = function (e) {
      const animateSlider1 = document.querySelector('.js-animate-slider1').swiper;
      const animateSlider2 = document.querySelector('.js-animate-slider2').swiper;
      const animateSlider3 = document.querySelector('.js-animate-slider3').swiper;
      const val = e.deltaY;
      if (val > 0) {
        animateSlider1.slideNext(600);
        animateSlider2.slideNext(600);
        animateSlider3.slideNext(600);
      } else {
        animateSlider1.slidePrev(600);
        animateSlider2.slidePrev(600);
        animateSlider3.slidePrev(600);
      }
    };
  }
  // слайдер команда
  var swiper = new Swiper('.js-team-slider', {
    spaceBetween: 14,
    slidesPerView: 'auto',
    breakpoints: {
      // when window width is >= 768px
      768: {
        spaceBetween: 20,
        slidesPerView: 3,
      },

      // when window width is >= 992px
      992: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  });

  // file
  $('.js-file-button').each(function () {
    const $fileInput = $(this);
    if ($fileInput.length > 0) {
      let fileCnt = 0;
      const $fileParent = $fileInput.closest('.js-file');
      const $fileData = $fileParent.find('.js-file-text');
      const $fileWrapper = $fileParent.find('.js-file-wrapper');
      const $fileDataWrapper = $fileParent.find('.js-file-data');

      $fileInput.on('change', function () {
        for (let i = 0; i < this.files.length; i++) {
          const file = this.files[i];
          fileCnt++;
          $fileData.text(file.name);
          $fileWrapper.hide();
          $fileDataWrapper.fadeIn();
        }
      });
    }
  });

  $('.js-file-remove').on('click', function () {
    const $this = $(this);
    const $fileParent = $this.closest('.js-file');
    const $fileWrapper = $fileParent.find('.js-file-wrapper');
    const $fileDataWrapper = $fileParent.find('.js-file-data');

    $fileDataWrapper.hide();
    $fileWrapper.fadeIn();
  });

  // кнопка вверх
  function showUp() {
    if ($(window).scrollTop() > 200) {
      $('.js-up').addClass('is-visible');
    } else {
      $('.js-up').removeClass('is-visible');
    }
  }

  showUp();

  $(window).scroll(() => {
    showUp();
  });

  $('.js-up').on('click', () => {
    $('body, html').animate({
      scrollTop: 0,
    }, 1000);
  });

  // aнимация картинки hero
  $('.js-hero').on('mousemove', (event) => {
    $('.js-hero-circle').css({
      'top': `${event.pageY * 1 + 5}px`,
      'left': `${event.pageX * 1 + 5}px`,
    });
  });

  // плавный скрол к якорю
  $('.js-scroll-link').on('click', function (e) {
    e.preventDefault();
    const anchor = $(this).attr('href');
    const top = $(anchor).offset().top;
    $('html, body').animate({
      scrollTop: top,
    }, 1000);
  });

  // валидация формы и показ сообщения после отправки
  $('.js-validate').validate({
    focusInvalid: false,
    submitHandler: function () {
      $('.js-validate-message').fadeIn();
      $('.js-validate')[0].reset();
      setTimeout(() => {
        $('.js-validate-message').fadeOut();
      }, 5000);
    },
  });

  // aнимация чисел
  if ($('.js-animate-block').length > 0) {
    let show_numbers = null;

    function animateNumber() {
      const wt = $(window).scrollTop();
      const wh = $(window).height();
      const et = $('.js-animate-block').offset().top;
      const eh = $('.js-animate-block').outerHeight();

      if (wt + wh >= et && wt + wh - eh * 2 <= et + (wh - eh)) {

        if (show_numbers == null || show_numbers == false) {

          $('.js-animate-number').each(function () {
            $(this).prop('Counter', 0).animate({
              Counter: $(this).attr('data-number'),
            }, {
              duration: 1000,
              easing: 'swing',
              step: function (now) {
                $(this).text(Math.ceil(now));
              },
            });
          });
          setTimeout(() => {
            $('.js-animate-text').fadeIn();
          }, 1000);
        }
        show_numbers = true;
      }
    }

    animateNumber();
    $(window).scroll(() => {
      animateNumber();
    });
  }

  // анимация белого фона
  if ($('.js-technologies').length > 0) {
    let show_technologies = null;

    function animateTechnologies() {
      const wt = $(window).scrollTop();
      const wh = $(window).height() / 2;
      const et = $('.js-technologies').offset().top;
      const eh = $('.js-technologies').outerHeight();

      if (wt + wh >= et && wt + wh - eh * 2 <= et + (wh - eh)) {

        if (show_technologies == null || show_technologies == false) {

          $('.js-technologies').removeClass('is-start');
        }
        show_technologies = true;
      }
    }

    animateTechnologies();
    $(window).scroll(() => {
      animateTechnologies();
    });
  }
  $('.js-accordion-button').on('click', function () {
    const $this = $(this);
    $this.toggleClass('is-active');
    $this.closest('.js-accordion').find('.js-accordion-block').slideToggle();
  });

  $('.js-accordion-button-inside').on('click', function () {
    const $this = $(this);
    $this.toggleClass('is-active');
    $this.closest('.js-accordion-inside').find('.js-accordion-block-inside').slideToggle();
  });

  // кастомизация скрола
  $('.js-scrollbar').mCustomScrollbar();

  // фильтрация проектов
  if ($('.js-sorting').length > 0) {
    function masonryGrid() {
      const $container = $('.js-sorting');
      // initialize
      $container.masonry({
        itemSelector: '.js-sorting-item',
        isAnimated: true,
        columnWidth: '.js-sorting-item',
      });
      $container.masonry('reloadItems');
      $container.masonry('layout');
    }

    masonryGrid();
  }


  if ($('.js-sorting').length > 0) {
    const tags = (new URL(window.location)).searchParams.getAll('tag');
    const active = $('.js-sorting-button.is-active').map(function() {
      return $( this ).attr('data-toggle');
    }).get();
    const selector = tags.map((tag) => `.${tag}`).concat(active).join(',');
    const mixer = mixitup('.js-sorting', {
      selectors: {
        target: '.js-sorting-item',
      },
      animation: {
        enable: false,
      },
      classNames: {
        block: '',
        elementToggle: 'is',
      },
      callbacks: {
        onMixEnd: function (state) {
          masonryGrid();
        },
      },
      load: {
        filter: selector || 'all',
      },
    });
  }

  function checkActive() {
    $('.js-sorting-button.is-active').each(function () {
      const $this = $(this);
      const params = $this.attr('data-toggle').substr(1);
      $(`.js-sorting-tag[data-tag="${params}"]`).addClass('is-selected');
    });
  }

  checkActive();

  $('.js-sorting-button').on('click', function () {
    const $this = $(this);
    const param = $this.attr('data-toggle').substr(1);
    if ($this.hasClass('is-active')) {
      $('.js-sorting-tag').removeClass('is-selected');
      $(`.js-sorting-tag[data-tag="${param}"]`).addClass('is-selected');
      checkActive();
      $('.js-sorting-item').removeClass('is-down');
    } else {
      $(`.js-sorting-tag[data-tag="${param}"]`).removeClass('is-selected');
      checkActive();
      $('.js-sorting-item').removeClass('is-down');
    }
    $('.js-sorting').masonry('reloadItems');
  });

  // показ скрытых блоков в проектах мобильная версия
  $('.js-project-more').on('click', function () {
    const $this = $(this);
    const $buttonText = $this.find('.js-project-more-text');
    const $projectItem = $this.closest('.js-sorting-item');
    const $projectInfo = $projectItem.find('.js-project-content');
    const heightItem = $projectItem.innerHeight();
    const heightContent = $projectInfo.innerHeight();

    if ($this.hasClass('is-active')) {
      $this.removeClass('is-active');
      $buttonText.text('Show information');
      $projectItem.innerHeight(heightItem - heightContent);
      $projectInfo.slideUp();
      masonryGrid();
    } else {
      $this.addClass('is-active');
      $buttonText.text('Close information');
      $projectItem.innerHeight(heightItem + heightContent);
      $projectInfo.slideDown();
      masonryGrid();
    }
  });

  // форма обратной связи
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    fetch('/', {
      method: 'POST',
      headers: {'Content-Type': 'multipart/form-data'},
      body: new URLSearchParams(formData).toString(),
    });
  };
  document.querySelector('.form').addEventListener('submit', handleSubmit);
});
