const JSCCommon = {
	menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),

	modalCall() {
		const link = '[data-fancybox="modal"], .link-modal-js, .link-modal';

		Fancybox.bind(link, {
			arrows: false,
			// infobar: false,
			touch: false,
			trapFocus: false,
			placeFocusBack: false,
			infinite: false,
			dragToClose: false,
			type: 'inline',
			autoFocus: false,
			groupAll: false,
			groupAttr: false,
			// showClass: "fancybox-throwOutUp",
			// hideClass: "fancybox-throwOutDown",
			l10n: {
				CLOSE: "Закрыть",
				Escape: "Закрыть",
				NEXT: "Вперед",
				PREV: "Назад",
				MODAL: "Вы можете закрыть это модальное окно с помощью клавиши ESC.",
				ERROR: "Что-то пошло не так. Пожалуйста, повторите попытку позже",
				IMAGE_ERROR: "Изображение не найдено",
				ELEMENT_NOT_FOUND: "HTML-элемент не найден",
				AJAX_NOT_FOUND: "Ошибка при загрузке AJAX: не найдено",
				AJAX_FORBIDDEN: "Ошибка при загрузке AJAX: запрещено",
				IFRAME_ERROR: "Ошибка загрузки iframe",
			},
		});
		document.querySelectorAll(".modal-close-js").forEach(el => {
			el.addEventListener("click", () => {
				Fancybox.close();
			})
		})
		Fancybox.bind('[data-fancybox]', {
			placeFocusBack: false,
		});
		document.addEventListener('click', (event) => {
			let element = event.target.closest(link)
			if (!element) return;
			let modal = document.querySelector("#" + element.dataset.src);
			const data = element.dataset;

			function setValue(val, elem) {
				if (elem && val) {
					const el = modal.querySelector(elem)
					el.tagName == "INPUT"
						? el.value = val
						: el.innerHTML = val;
					// console.log(modal.querySelector(elem).tagName)
				}
			}
			setValue(data.title, '.ttu');
			setValue(data.text, '.after-headline');
			setValue(data.btn, '.btn');
			setValue(data.order, '.order');
		})
	},
	// tabs  .
	tabscostume(tab) {
		let tabs = {
			Btn: [].slice.call(document.querySelectorAll(`.${tab}__btn`)),
			BtnParent: [].slice.call(document.querySelectorAll(`.${tab}__caption`)),
			Content: [].slice.call(document.querySelectorAll(`.${tab}__content`)),
		}
		tabs.Btn.forEach((element, index) => {
			element.addEventListener('click', () => {
				if (!element.classList.contains('active')) {
					//turn off old
					let oldActiveEl = element.closest(`.${tab}`).querySelector(`.${tab}__btn.active`);
					let oldActiveContent = tabs.Content[index].closest(`.${tab}`).querySelector(`.${tab}__content.active`);

					oldActiveEl.classList.remove('active');
					oldActiveContent.classList.remove('active')

					//turn on new(cklicked el)
					element.classList.add('active');
					tabs.Content[index].classList.add('active');
				}
			})
		})
	},
	// /tabs

	inputMask() {
		// mask for input
		let InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
		InputTel.forEach(element => element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}"));
		Inputmask("+9(999)999-99-99").mask(InputTel);
	},
	// /inputMask
	ifie() {
		var isIE11 = !!window.MSInputMethodContext && !!document.documentMode;
		if (isIE11) {
			document.body.insertAdjacentHTML("beforeend", '<div class="browsehappy">	<p class=" container">К сожалению, вы используете устаревший браузер. Пожалуйста, <a href="http://browsehappy.com/" target="_blank">обновите ваш браузер</a>, чтобы улучшить производительность, качество отображаемого материала и повысить безопасность.</p></div>');
		}
	},
	heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01;
		// Then we set the value in the --vh custom property to the root of the document
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		// We listen to the resize event
		window.addEventListener('resize', () => {
			// We execute the same script as before
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}, { passive: true });
	},
	getCurrentYear(el) {
		let now = new Date();
		let currentYear = document.querySelector(el);
		if (currentYear) currentYear.innerText = now.getFullYear();
	},
	//taken from good planet
	customRange() {
		$(".range-wrap").each(function () {
			let _this = $(this);
			var $d3 = _this.find(".slider-js");

			var slider = $d3.ionRangeSlider({
				skin: "round",
				type: "double",
				grid: false,
				grid_snap: false,
				hide_min_max: true,
				hide_from_to: true,
				onStart: function (data) {
					_this.find('.minus').val(data.from);
					_this.find('.plus').val(data.to);
				},
				onChange: function (data) {
					_this.find('.minus').val(data.from);
					_this.find('.plus').val(data.to);
				},
				onFinish: function (data) {
					_this.find('.minus').val(data.from);
					_this.find('.plus').val(data.to);
				},
				onUpdate: function (data) {
					_this.find('.minus').val(data.from);
					_this.find('.plus').val(data.to);
				}
			});
			var $d3_instance = slider.data("ionRangeSlider");
			$(this).on('change  input  cut  copy  paste', '.minus', function () {
				var th = $(this);
				var data = th.val();
				var min = +data;
				// th.val(data + ' т')
				console.log(1);
				$d3_instance.update({
					from: min,
				})
			});

			$(this).on('change  input  cut  copy  paste', '.plus', function () {
				var th = $(this);
				var data = th.val();
				var max = +data;

				//max => new val of max inp
				//min => value of the min inp

				let min = Number(document.querySelector('.range-result.range-result--minus.minus').value);
				if (min >= max) {
					min = 0;
					$d3_instance.update({
						from: min,
						to: max,
					});
				}
				else {
					$d3_instance.update({
						to: max,
					});
				}
			});
			// $d3.on("change", function () {
			// 	var $inp = $(this);
			// 	var from = $inp.prop("value"); // reading input value
			// 	var from2 = $inp.data("from"); // reading input data-from attribute

			// 	_this.find('range-result--minus').val(from); // FROM value
			// 	_this.find('range-result--plus').val(from); // FROM value
			// });


		})
	},
	//taken from good planet
	makeDDGroup(qSelecorts){
		for (let parentSelect of qSelecorts){
			let parents = document.querySelectorAll(parentSelect);

			if (parents){
				// childHeads, kind of funny))
				for (const parent of parents) {
					let ChildHeads = parent.querySelectorAll('.dd-head-js');

					$(ChildHeads).click(function (){
						let clickedHead = this;

						$(ChildHeads).each(function (){
							if (this === clickedHead){
								//parent element gain toggle class, style head change via parent
								$(this.parentElement).toggleClass('active');
								$(this.parentElement).find('.dd-content-js').slideToggle(function (){
									$(this).toggleClass('active');
								});
							}
							else{
								$(this.parentElement).removeClass('active');
								$(this.parentElement).find('.dd-content-js').slideUp(function (){
									$(this).removeClass('active');
								});
							}
						});
					});
				}

			}

		}
	},
	init(){
		this.makeDDGroup([
			'.footer-dd-group-js',
			'.cat-aside-dd-js',
			'.mob-menu-dd-js',
			'.pa-orders-dd-js',
			'.delivery-group-dd-js',
			'.order-content-dd-js'
		]);
	}


};



if (document.readyState !== 'loading') {
	JSCCommon.init()
} else {
	document.addEventListener('DOMContentLoaded', JSCCommon.init);
}