let PCOM_ACC_REG_COUNT = 1;

let acc = document.querySelector('.pcom-accordion-wrapper');
let el = acc.firstElementChild;
while(el && el.tagName != 'H3') 
	el = el.nextElementSibling;
while(el != null) {
	// at this point, we're at an H3 and will process until end of the wrapper or the next H3
	
	// general region counter for unique IDs
	let id = 'pcom-acc-reg-' + PCOM_ACC_REG_COUNT;
	PCOM_ACC_REG_COUNT = PCOM_ACC_REG_COUNT + 1;
	
	let h3 = el;
	let text = h3.innerText;
	h3.innerHTML = '<button aria-expanded="false"><span class="fa fa-plus" aria-hidden="true"></span><span class="fa fa-minus" aria-hidden="true"></span><span>' + text + '</span></button>';
	let button = h3.querySelector('button');
	button.setAttribute('aria-controls', id);
	button.addEventListener('click', function(evt) {
		let b = evt.currentTarget;
		console.log(b);
		console.log(b.getAttribute('aria-controls'));
		if(b.getAttribute('aria-expanded') == 'true') {
			b.setAttribute('aria-expanded', 'false')
			document.getElementById(b.getAttribute('aria-controls')).style.display = 'none';
		}
		else {
			b.setAttribute('aria-expanded', 'true');
			document.getElementById(b.getAttribute('aria-controls')).style.display = 'block';
		}
	});
	let nodesToAdd = [];
	el = el.nextElementSibling;
	while(el && el.tagName != "H3") {
		nodesToAdd.push(el);
		el = el.nextElementSibling;
	}
	let region = document.createElement('div');
	region.id = id;
	region.style.display = 'none';
	for(e of nodesToAdd)
		region.appendChild(e);
	h3.after(region);
}

