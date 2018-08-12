'use strict';

window.onload = function() {
	
	var request = document.querySelector('.form__request');
	var openBtn = document.querySelector('button.form__content');
	var counter = true;
	
	openBtn.addEventListener('click', function() {
		if(counter) {
			
			request.classList.add("opened");
			counter = !counter;

		} else {
			request.classList.remove('opened');
			counter = !counter;
		}	

	});
	
}
