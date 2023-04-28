lazyload($('img[data-src]'));

// всплывающие заголовки
$(".section-title").each(anime);
function anime() {
	var thisTitle = $(this);
	var accent = thisTitle.children('.section-title__accent');
	var offsetTop = thisTitle.offset().top - $(window).height();

	if ($(document).scrollTop() > offsetTop + 50) {
		accent.addClass('active');
	}
	$(window).scroll(function (event) {
		offsetTop = thisTitle.offset().top - $(window).height();
		if ($(document).scrollTop() > offsetTop + 50) {
			accent.addClass('active');
		}
	});
}

$('.section-title').not('h1').not('.no-anim').addClass('animation');
setTimeout(function () {
	$('h1.section-title').addClass('visible');
}, 500)

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

// select
let select = document.querySelectorAll('select');
select.forEach(function (item) {
	if (item) {
		customSelect(item);
	}
})

// форма поиска
let searchInput = document.getElementById("inputSearch");
if (searchInput) searchInput.addEventListener('input', search);

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
if (tickerRow) {
	let tickerLength = tickerRow.querySelectorAll('.ticker__item').length;
	tickerRow.style.animationDuration = tickerLength * 8 + 's';

	let ticker = tickerRow.querySelector('.ticker__wrap');
	let tickerDouble = ticker.cloneNode(true);
	ticker.after(tickerDouble)
}

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
let requestPopup = document.querySelector('.popup-request');
let openRequestPopup = document.querySelectorAll('.request-open');

let confPopup = document.querySelector('.popup-conf');
let openConfPopup = document.querySelectorAll('.conf');

let orderPopup = document.querySelector('.popup-order');
let openOrderPopup = document.querySelectorAll('.order-open');

// открытие popup
openPopup(openConfPopup, confPopup);
openPopup(openOrderPopup, orderPopup);
openPopup(openRequestPopup, requestPopup);

function openPopup(btnOpen, popup) {
	btnOpen.forEach(function (item) {
		item.addEventListener('click', function (e) {
			e.preventDefault();
			popup.classList.add('active');
			document.body.classList.add('lock');
		});
	})
}

// закрытие popup
let popups = document.querySelectorAll('.popup');
popups.forEach(function (popup) {
	let body = popup.querySelector(".popup__body");
	let close = popup.querySelector(".popup__close");
	let nothnx = popup.querySelector(".popup__nothnx");

	popup.addEventListener('click', (e) => {
		const withinBoundaries = e.composedPath().includes(body);
		if (!withinBoundaries) closePopup(popup);
	})

	close.addEventListener('click', function () {
		closePopup(popup)
	});

	if (nothnx) {
		nothnx.addEventListener('click', function () {
			closePopup(popup)
		});
	};

})

function closePopup(popup) {
	popup.classList.remove('active');
	document.body.classList.remove('lock');
}

// checkbox 
let agreeForms = document.querySelectorAll('.agree-form');
agreeForms.forEach(function (agreeForm) {
	let mainBtn = agreeForm.querySelector('.main-btn');
	let checkbox = agreeForm.querySelectorAll('.agree__checkbox');

	checkbox.forEach(function (item) {
		item.classList.add('check');

		item.addEventListener('click', function () {
			item.classList.toggle('check');
			let checkboxCheck = agreeForm.querySelectorAll('.agree__checkbox.check');

			if (checkbox.length != checkboxCheck.length) {
				mainBtn.setAttribute('disabled', 'disabled');
			} else {
				mainBtn.removeAttribute('disabled', 'disabled');
			}
			mainBtn.classList.toggle('disabled');
		})
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
			},
			mail: {
				required: true,
				email: true,
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
					// window.location.href = "thanks.html";
				},
				error: function (response) {
					window.location.href = "404.html";
				},
			});
		},
	});
});

// accordion
let accordionItem = document.querySelectorAll('.accordion__item');
accordionItem.forEach(function (item) {
	item.addEventListener('click', function () {
		item.classList.toggle('active')
	})
})

const offerSwiper = new Swiper('.offer__swiper', {
	loop: false,
	speed: 600,
	centeredSlides: false,
	touchRatio: 1,
	slidesPerView: 'auto',
	simulateTouch: true,
	mousewheel: true,
	keyboard: true,

	navigation: {
		nextEl: '.offer__arrow-next',
		prevEl: '.offer__arrow-prev',
	},

	pagination: {
		clickable: true,
		type: 'bullets',
		el: '.offer__pagination',
	},
});


let questions = document.querySelectorAll('.question__item');
questions.forEach(function (question) {
	question.querySelector('.question__name').addEventListener('click', function () {
		question.classList.toggle('active');
		let questionText = question.querySelector('.question__text');
		let maxHeightVW = questionText.scrollHeight / (window.innerWidth / 100) + 0.5 + "vw";
		let maxHeightREM = (questionText.scrollHeight / (window.innerWidth / 100)) * 3.125 + 0.5 + "vw";

		if (questionText.style.maxHeight) {
			questionText.style.maxHeight = null;
		} else {
			if (window.innerWidth > 768) {
				questionText.style.maxHeight = maxHeightVW;
			} else {
				questionText.style.maxHeight = maxHeightREM;
			}
		}
	});
})

let seo = document.querySelector('.seo');
if (seo) {
	let seoWrap = seo.querySelector('.seo__wrap');
	let seoBtn = seo.querySelector('.seo__btn-open');

	seoBtn.addEventListener('click', function () {
		seoWrap.classList.toggle('visible');
		seoBtn.classList.toggle('active');
	})
}

// tabs
$('.hero__tab').click(function () {
	$(this).toggleClass("active");
	$(".hero__tab").not(this).removeClass("active");
})

// кнопка показать еще
let btnMore = document.querySelectorAll('.btn-more');
if (btnMore) {
	btnMore.forEach(function (btn) {
		let btnParent = btn.parentNode.querySelector('ul');
		let listItem = btnParent.querySelectorAll('li');

		if (listItem.length < 13) {
			btn.classList.add('hidden');
		}
		if (btn) {
			btn.addEventListener('click', function () {
				listItem.forEach(function (li) {
					li.classList.add('visible');
				})
				btn.classList.add('hidden');
			})
		}
	});
}

// подсчет всех карточек с шаблонами на странице
cardsCount = document.querySelector('.cards-count');
if (cardsCount) {
	let cards = document.querySelectorAll('.template-item').length;
	cardsCount.innerHTML = cards;
}

// калькулятор
let calcForm = document.querySelector('.calculate__form');
// получаем начальную цену из отмеченного radioinput
if (calcForm) {
	let totalPrice = calcForm.querySelector('.item-price__total span');
	let defaultTotalPrice = calcForm.querySelector('input[type=radio][checked]').parentNode.querySelector('.calculate__price').innerHTML;

	// получаем стоимость отмечанных доп услуг по дефолту
	let chekedCheckboxs = calcForm.querySelectorAll('input[type=checkbox][checked]');
	let sum = 0;
	chekedCheckboxs.forEach(item => {
		item.classList.add('checked')
		let priceItem = Number(item.parentNode.querySelector('.calculate__price').innerHTML);
		sum += priceItem
	})

	// суммируем начальную стоимость + доп.услуги и передаем значение в html
	totalPrice.innerHTML = parseInt(defaultTotalPrice) + sum;
	let newPrice = Number(totalPrice.innerHTML);

	// высчитываем полную цену без скидки и передаем значение в html
	let oldPrice = calcForm.querySelector('.item-price__old');
	if (oldPrice) {
		let discount = calcForm.querySelector('.item-price__discount').innerHTML;
		var discountCount = Number(discount.replace(/\D/g, ''));
		var oldCount = calcForm.querySelector('.item-price__number span');
		let defaultOldPrice = Math.round((newPrice * 100) / (100 - discountCount));
		oldCount.innerHTML = defaultOldPrice;
		var editOld = 0;
	}

	let calcInputs = calcForm.querySelectorAll('.calculate__input');
	calcInputs.forEach(function (calcInput) {
		let price = Number(calcInput.parentNode.querySelector('.calculate__price').innerHTML);

		calcInput.addEventListener('change', function () {
			calcInput.classList.toggle('checked')
			if (calcInput.classList.contains('checked')) {
				calcInput.setAttribute('checked', 'checked')
			} else {
				calcInput.removeAttribute('checked')
			}

			if (calcInput.type == 'checkbox') {
				if (calcInput.checked) {
					newPrice += price
				} else {
					newPrice -= price
				}

			} else if (calcInput.type == 'radio') {
				let chekedCheckboxs = calcForm.querySelectorAll('input[type=checkbox][checked]');
				let sumPrice = 0;
				chekedCheckboxs.forEach(item => {
					let priceItem = Number(item.parentNode.querySelector('.calculate__price').innerHTML);
					sumPrice += priceItem
				})
				newPrice = price + sumPrice
			}
			editOld = Math.round((newPrice * 100) / (100 - discountCount));
			oldCount.innerHTML = editOld;
			totalPrice.innerHTML = newPrice;
		})
	})
}

$(document).mouseleave(function () {
	if (event.clientY < 3) {
		let leave = 1;
		if (+$.cookie('leave-popup')) {
			leave = 0;
		}
		if (leave) {
			$('.popup-wait').addClass('active');
			$.cookie('leave-popup', 1, { expires: 7 });
		}
	}
});