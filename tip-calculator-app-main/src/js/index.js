const bill = document.getElementById('bill');
const nPeoples = document.getElementById('nPeoples');
const tipOptions = document.querySelector('.select-tip');

tipOptions.addEventListener('click',e => {
	if (e.target && e.target.tagName == 'BUTTON') {
		document.querySelectorAll('.btn-tip').forEach((btn,index) => {
			if (btn.classList.item('1') == 'btn-tip--active') {
				btn.classList.remove('btn-tip--active');
				if (index !== 5) {
					btn.style.background = 'hsl(183, 100%, 15%)';
				} else {
					btn.style.background = 'hsl(189, 41%, 97%)';
				}
			}
		})
		const btn = e.target;
		btn.classList.add('btn-tip--active');
		btn.style.background = 'hsl(172, 67%, 45%)';

		if (btn.innerText == 'Custom') {
			btn.setAttribute('contenteditable','true');
			btn.addEventListener('keyup',e => {
				if (e.key == 'Enter') {
					btn.removeAttribute('contenteditable');
				}
			})
		}
	}
})

nPeoples.addEventListener('keyup',e => {
	if (e.key == 'Enter') {
		const btnTip = document.querySelector('.btn-tip--active')
		comprobarDatos(bill,btnTip,nPeoples.value.trim());
		
	}
})

const comprobarDatos = (bill,tipOption,nPeoples) => {
	let error = false;
	if (isNaN(bill.value.trim())) {
		bill.style.border = '1px solid red';
		console.log('Tiene que ser un numero')
		error = true;
	}
	else {
		if (bill.value.trim() <= 0) {
			bill.style.border = '1px solid red';
			console.log('No puede ser menor o igual a Cero')
			error = true;
		}
	}
	if (tipOption == null || isNaN(tipOption.innerText.split('%')[0])) {
		const container = document.querySelector('.select-tip');
		container.style.outline = '3px solid red';
		container.style.outlineOffset = '3px'
		error = true
	}

	if (isNaN(nPeoples) || parseFloat(nPeoples) <= 0) {
		error = true;
	}

	if (!error) {
		let porcent = tipOption.innerText.split('%')[0];
		let data = calcularPropina(bill.value.trim(),porcent,nPeoples)
		document.getElementById('total').innerText = data[0];
		document.getElementById('tipAmount').innerText = data[1];
	}
}


const calcularPropina = (factura,porcentaje,personas) => {
	let porPersona = (factura * porcentaje / 100) / personas
	let total = factura / personas + porPersona;

	total = total.toString();
	total = total.substr(0,total.indexOf('.') + 3);
	return [total,porPersona]
}

calcularPropina(142.55,15,5);