// оптимизация загрузки
var myScroll;
function loaded() {
	// myScroll = new IScroll('.main', {
	// 	disablePointer: true,
	// 	disableMouse: true,
	// });
}

// select
let select = document.querySelectorAll('select');
select.forEach(function (item) {
	if (item) {
		customSelect(item);
	}
})

// форма поиска
let searchInput = document.getElementById("inputSearch");
searchInput.addEventListener('input', search);

function search() {
	let filter = searchInput.value.toUpperCase();
	let list = document.querySelector(".form-search__list");
	let item = list.querySelectorAll('li');
	list.classList.add('visible')

	for (let i = 0; i < item.length; i++) {
		if (item[i].innerHTML.toUpperCase().indexOf(filter) > -1) {
			item[i].classList.remove('hidden')
		} else {
			item[i].classList.add('hidden')
		}
	}
	if (list.querySelectorAll('li.hidden').length == item.length) {
		list.classList.remove('visible')
	}

	item.forEach(function (e) {
		e.addEventListener('click', function () {
			let link = e.querySelector('a').innerHTML;
			searchInput.value = link;
			list.classList.remove('visible')
		})
	})

	if (searchInput.value == '') {
		list.classList.remove('visible')
	}

	let form = searchInput.closest('.form-search');
	document.addEventListener('click', (e) => {
		const withinBoundaries = e.composedPath().includes(form);

		if (!withinBoundaries) {
			list.classList.remove('visible')
		}
	})
}

// бегущая строка
let tickerRow = document.querySelector('.ticker__row');
let tickerLength = tickerRow.querySelectorAll('.ticker__item').length;
tickerRow.style.animationDuration = tickerLength * 4 + 's';

let ticker = tickerRow.querySelector('.ticker__wrap');
let tickerDouble = ticker.cloneNode(true);
ticker.after(tickerDouble)

// submenu mobile
if (window.innerWidth < 768) {
	let submenuLink = document.querySelectorAll('.nav__link--arrow');
	submenuLink.forEach(function (item) {
		let submenuParent = item.parentNode;
		item.addEventListener('click', function () {
			submenuParent.classList.toggle('open')
		})
	})
}


// burger
let nav = document.querySelector('.nav');
let header = document.querySelector('header');
let burger = header.querySelector('.header__burger');

function closeMenu() {
	burger.classList.remove('active');
	nav.classList.remove('active');
	header.classList.remove('active');
	document.body.classList.remove('lock');
}

burger.addEventListener('click', function () {
	burger.classList.toggle('active');
	nav.classList.toggle('active');
	header.classList.toggle('active');
	document.body.classList.toggle('lock');

	let links = nav.querySelectorAll('a');
	links.forEach(function (link) {
		if (!link.classList.contains('nav__link--arrow')) {
			link.addEventListener('click', closeMenu)
		}
	})

	document.addEventListener('click', (e) => {
		const clickin = e.composedPath().includes(nav);
		const clickin2 = e.composedPath().includes(header);
		if (!clickin && !clickin2) closeMenu();
	})

})



// popup
// let requestPopup = document.querySelector('.popup-request');
// let openRequestPopup = document.querySelectorAll('.callback-popup');

// let mapPopup = document.querySelector('.popup-map');
// let openMapPopup = document.querySelector('.header__address-link');

// let confPopup = document.querySelector('.popup-conf');
// let openConfPopup = document.querySelectorAll('.conf');

// открытие формы звонка
// openRequestPopup.forEach(function (item) {
// 	item.addEventListener('click', function () {
// 		requestPopup.classList.add('active');
// 		document.body.classList.add('lock');
// 	});
// })


// checkbox 
let checkbox = document.querySelectorAll('.agree__checkbox');
checkbox.forEach(function (item) {
	let mainBtn = item.closest('form').querySelector('.main-btn');
	item.classList.add('check');

	item.addEventListener('click', function () {
		item.classList.toggle('check');
		if (!item.classList.contains('check')) {
			mainBtn.setAttribute('disabled', 'disabled');
		} else {
			mainBtn.removeAttribute('disabled', 'disabled');
		}
		mainBtn.classList.toggle('disabled');
	})
})

// кнопка наверх
let heightOfHero = document.querySelector('.hero').offsetHeight;
let btnUp = document.querySelector('.btn-top');
window.addEventListener('scroll', function () {
	if (window.pageYOffset > heightOfHero - 400) {
		btnUp.classList.add('active')
	} else {
		btnUp.classList.remove('active')
	}
});
if (btnUp) {
	btnUp.addEventListener('click', function () {
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	})
}





// маска на телефон
$("input[type='tel']").mask('+7(999)999-99-99');
jQuery.validator.addMethod("checkMaskPhone", function (value, element) {
	return /\+\d{1}\(\d{3}\)\d{3}-\d{2}-\d{2}/g.test(value);
});

// валидация формы
$('[data-form-validate-js]').each(function () {
	var form = $(this);

	form.validate({
		errorClass: "validate_error",
		rules: {
			phone: {
				required: true,
				checkMaskPhone: true,
			}
		},
		errorPlacement: function (error, element) { },
		submitHandler: function () {
			var data = form.serialize();
			var action = form.attr('action');
			var method = form.attr('method');

			$.ajax({
				type: method,
				url: action,
				data: data,
				success: function (response) {
					window.location.href = "thanks.html";
				},
				error: function (response) {
					window.location.href = "404.html";
				},
			});
		},
	});
});

$('[data-download-form-js]').each(function () {
	var form = $(this);

	form.validate({
		errorClass: "validate_error",
		rules: {
			phone: {
				required: true,
				checkMaskPhone: true
			}
		},
		errorPlacement: function (error, element) { },
		submitHandler: function () {
			var data = form.serialize();
			var action = form.attr('action');
			var method = form.attr('method');
			var link = document.createElement('a');
			var file = form.attr('data-download-form-js');

			link.setAttribute('href', file);
			link.setAttribute('download', '');

			$.ajax({
				type: method,
				url: action,
				data: data,
				success: function (response) {
					window.location.href = "thanks.html";
					link.click();
				},
				error: function (response) {
					window.location.href = "404.html";
				},
			});
		},
	});
});


// плавная прокрутка
$("[data-anchor-btn-js]").on("click", function (event) {
	event.preventDefault();
	var headerHeight = $('header').height();

	var target = $(this).attr('href');

	if ($(target).length) {
		if (window.innerWidth > 768) {
			var offset = ($(target).offset().top) - 50;
		} else {
			var offset = ($(target).offset().top) - headerHeight + 40;
		}

		let scroll = $(window).scrollTop();
		let windowHeight = $(window).height();

		if (offset > scroll) {
			var time = Math.round(offset / windowHeight) * 1000;
		} else {
			var time = Math.round((scroll - offset) / windowHeight) * 300;
		}

		$('body,html').animate({
			scrollTop: offset
		}, time);
	} else {
		window.location.href = "index.html";
	}
});


// всплывающие заголовки
$(".section-title").not('.no-anim').each(anime);
$(".anim").each(anime);
function anime() {
	var thisTitle = $(this);
	var accent = thisTitle.children('.section-title__accent');
	var offsetTop = thisTitle.offset().top - $(window).height();
	if ($(document).scrollTop() > offsetTop) {
		thisTitle.addClass('fade-in');
		accent.addClass('active');
	}
	$(window).scroll(function (event) {
		offsetTop = thisTitle.offset().top - $(window).height();
		if ($(document).scrollTop() > offsetTop) {
			thisTitle.addClass('fade-in');
			accent.addClass('active');
		}
	});
}


// accordion
let accordionItem = document.querySelectorAll('.accordion__item');
accordionItem.forEach(function (item) {
	item.addEventListener('click', function () {
		item.classList.toggle('active')
	})
})

// анимация подгрузки контента при скролле
$(window).on('scroll', function () {
	$('.animation').each(function () {
		var element = $(this);

		if (!(element.hasClass('visible'))) {
			var scroll = $(window).scrollTop(),
				position = element.offset().top,
				windowHeight = $(window).height();

			if ((scroll + windowHeight) > position) {
				element.addClass('visible');
			};
		};
	});
});

let offerSwiper = new Swiper('.offer__swiper', {
	loop: false,
	speed: 600,
	centeredSlides: false,
	slidesPerView: 'auto',
	touchRatio: 1,
	simulateTouch: true,
	mousewheel: true,
	keyboard: true,
	// cssMode: true,

	pagination: {
		clickable: true,
		type: 'bullets',
		el: '.offer__pagination',
	},

	navigation: {
		nextEl: '.offer__arrow-next',
		prevEl: '.offer__arrow-prev',
	},
});