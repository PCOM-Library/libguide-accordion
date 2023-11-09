// Use mutation observer to remake profiles as they are loaded to limit flashing
const accordionObserver = new MutationObserver(function(mutations_list) {
	mutations_list.forEach(function(mutation) {
		for(added_node of mutation.addedNodes) {
			if(added_node.nodeType != 1)
				continue;
			if(!added_node.classList.contains('pcom-accordion-wrapper'))
				continue;
			processAccordionInstance(added_node);
		}
	});
});
if(document.querySelector('main'))
	accordionObserver.observe(document.querySelector('main'), { subtree: true, childList: true });

/* use to generate unique IDs on a page */
let PCOM_ACC_REG_COUNT = 1;

/* Process a single instance of .pcom-accordion-wrapper into a working accordion */
function processAccordionInstance(acc) {
	let el = acc.firstElementChild;
	while(el && el.nodeName != 'H3') 
		el = el.nextSibling;
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
		el = el.nextSibling;
		while(el && el.nodeName != "H3") {
			nodesToAdd.push(el);
			el = el.nextSibling;
		}
		let region = document.createElement('div');
		region.id = id;
		region.style.display = 'none';
		for(e of nodesToAdd)
			region.appendChild(e);
		h3.after(region);
	}
}

window.addEventListener('DOMContentLoaded', function(evt) {
	try {
		accordionObserver.disconnect();
	} catch(e) {
		console.error('Attempted to disconnect non-existent accordionObserver');
	}
});