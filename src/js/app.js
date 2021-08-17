$(document).ready(function () {
	// открытие закрытие главного меню
	$(".js-menu-open").on("click", function () {
		$(".js-menu").addClass("is-open");
	});

	$(".js-menu-close").on("click", function () {
		$(".js-menu").removeClass("is-open");
	});

	// открытие и закрытие по клику вне переключения языков
	$(".js-dropdown-button").on("click", function () {
		var $this = $(this);
		var $dropdown = $this.closest(".js-dropdown");
		$dropdown.toggleClass("is-active");
	});

	$(document).click(function (event) {
		if ($(event.target).closest(".js-dropdown").length)
			return;
		$(".js-dropdown").removeClass("is-active");
		event.stopPropagation();
	});

	// слайдер портфолио
	var swiper = new Swiper(".js-portfolio-slider", {
		spaceBetween: 30,
		breakpoints: {
			992: {
				slidesPerView: "auto",
				watchSlidesVisibility: true,
			}
		}
	});

	// анимация header при скроле
	var $header = $(".js-header");
	var lastScrollTop = 0;

	function fixedHeader() {
		if ($(window).scrollTop() > 70) {
			$header.addClass("is-scroll");
		}
		else {
			$header.removeClass("is-scroll");
		}
	}
	fixedHeader();

	$(window).scroll(function () {
		fixedHeader();

		var curPosition = $(this).scrollTop();
		if (curPosition > lastScrollTop) {
			$header.addClass("is-up");
		} else {
			$header.removeClass("is-up");
		}

		lastScrollTop = curPosition;
	});

	// слайдеры технологии
	var swiper = new Swiper(".js-technologies-slider", {
		spaceBetween: 60,
		speed: 6000,
		slidesPerView: "auto",
		watchSlidesVisibility: true,
		loop: true,
		loopFillGroupWithBlank: true,
		autoplay: {
			delay: 1,
			disableOnInteraction: false
		},
		breakpoints: {
			// when window width is >= 1024px
			1024: {
				autoplay: false
			}
		}
	});

	window.onwheel = function (e) {
		var animateSlider1 = document.querySelector('.js-animate-slider1').swiper;
		var animateSlider2 = document.querySelector('.js-animate-slider2').swiper;
		var animateSlider3 = document.querySelector('.js-animate-slider3').swiper;
		var val = e.deltaY;
		if (val > 0) {
			animateSlider1.slideNext(600);
			animateSlider2.slideNext(600);
			animateSlider3.slideNext(600);
		}
		else {
			animateSlider1.slidePrev(600);
			animateSlider2.slidePrev(600);
			animateSlider3.slidePrev(600);
		}
	}

	// слайдер команда
	var swiper = new Swiper(".js-team-slider", {
		spaceBetween: 14,
		slidesPerView: 3,
		slidesPerView: "auto",
		breakpoints: {
			// when window width is >= 768px
			768: {
				spaceBetween: 20,
				slidesPerView: 3,
			},

			// when window width is >= 992px
			992: {
				spaceBetween: 30,
			}
		}
	});

	// file
	$(".js-file-button").each(function () {
		var $fileInput = $(this);
		if ($fileInput.length > 0) {
			var fileCnt = 0;
			var $fileParent = $fileInput.closest(".js-file");
			var $fileData = $fileParent.find(".js-file-text");
			var $fileWrapper = $fileParent.find(".js-file-wrapper");
			var $fileDataWrapper = $fileParent.find(".js-file-data");

			$fileInput.on("change", function () {
				for (var i = 0; i < this.files.length; i++) {
					var file = this.files[i];
					fileCnt++;
					$fileData.text(file.name);
					$fileWrapper.hide();
					$fileDataWrapper.fadeIn();
				}
			});
		}
	});

	$(".js-file-remove").on("click", function () {
		var $this = $(this);
		var $fileParent = $this.closest(".js-file");
		var $fileWrapper = $fileParent.find(".js-file-wrapper");
		var $fileDataWrapper = $fileParent.find(".js-file-data");

		$fileDataWrapper.hide();
		$fileWrapper.fadeIn();
	});

	// кнопка вверх
	function showUp() {
		if ($(window).scrollTop() > 200) {
			$(".js-up").addClass("is-visible");
		}
		else {
			$(".js-up").removeClass("is-visible");
		}
	}

	showUp();

	$(window).scroll(function () {
		showUp();
	});

	$(".js-up").on("click", function () {
		$("body, html").animate({
			scrollTop: 0
		}, 1000);
	});

	// aнимация картинки hero
	$(".js-hero").on("mousemove", function (event) {
		console.log('move');
		$(".js-hero-circle").css({
			"top": event.pageY * 1 + 5 + "px",
			"left": event.pageX * 1 + 5 + "px"
		});
	});

	// плавный скрол к якорю
	$(".js-scroll-link").on("click", function (e) {
		e.preventDefault();
		var anchor = $(this).attr("href");
		var top = $(anchor).offset().top;
		$("html, body").animate({
			scrollTop: top
		}, 1000);
	});

	// валидация формы и показ сообщения после отправки
	$(".js-validate").validate({
		focusInvalid: false,
		submitHandler: function () {
			$(".js-validate-message").fadeIn();
			$(".js-validate")[0].reset();
			setTimeout(function () {
				$(".js-validate-message").fadeOut();
			}, 5000);
		}
	});

	// aнимация чисел
	var show_numbers = null;

	function animateNumber() {
		var wt = $(window).scrollTop();
		var wh = $(window).height();
		var et = $('.js-animate-block').offset().top;
		var eh = $('.js-animate-block').outerHeight();

		if (wt + wh >= et && wt + wh - eh * 2 <= et + (wh - eh)) {

			if (show_numbers == null || show_numbers == false) {

				$('.js-animate-number').each(function () {
					$(this).prop('Counter', 0).animate({
						Counter: $(this).attr('data-number')
					}, {
						duration: 1000,
						easing: 'swing',
						step: function (now) {
							$(this).text(Math.ceil(now));
						}
					});
				});
				setTimeout(function () {
					$(".js-animate-text").fadeIn();
				}, 1000);
			}
			show_numbers = true;
		}
	}

	animateNumber();
	$(window).scroll(function () {
		animateNumber();
	});

	// анимация белого фона
	var show_technologies = null;

	function animateTechnologies() {
		var wt = $(window).scrollTop();
		var wh = $(window).height();
		var et = $('.js-technologies').offset().top;
		var eh = $('.js-technologies').outerHeight();

		if (wt + wh >= et && wt + wh - eh * 2 <= et + (wh - eh)) {

			if (show_technologies == null || show_technologies == false) {

				$('.js-technologies').removeClass('is-start');
			}
			show_technologies = true;
		}
	}
	animateTechnologies();
	$(window).scroll(function () {
		animateTechnologies();
	});

	$('.js-accordion-button').on("click", function () {
		var $this = $(this);
		$this.toggleClass('is-active');
		$this.closest('.js-accordion').find('.js-accordion-block').slideToggle();
	});

	$('.js-accordion-button-inside').on("click", function () {
		var $this = $(this);
		$this.toggleClass('is-active');
		$this.closest('.js-accordion-inside').find('.js-accordion-block-inside').slideToggle();
	});
});