'use strict';
class JSCCommon {

	// tabs  .
	static tabscostume(tab) {
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
	}
	// /tabs


	//taken from good planet
	static makeDDGroup(qSelecorts) {
		console.log(11111);
		for (let parentSelect of qSelecorts) {
			let parents = document.querySelectorAll(parentSelect);

			if (parents) {
				// childHeads, kind of funny))
				for (const parent of parents) {
					let ChildHeads = parent.querySelectorAll('.dd-head-js');

					$(ChildHeads).click(function () {
						let clickedHead = this;

						$(ChildHeads).each(function () {
							if (this === clickedHead) {
								//parent element gain toggle class, style head change via parent
								$(this.parentElement).toggleClass('active');
								$(this.parentElement).find('.dd-content-js').slideToggle(function () {
									$(this).toggleClass('active');
								});
							}
							else {
								$(this.parentElement).removeClass('active');
								$(this.parentElement).find('.dd-content-js').slideUp(function () {
									$(this).removeClass('active');
								});
							}
						});
					});
				}

			}

		}
	}

	static init() {
		JSCCommon.makeDDGroup([
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