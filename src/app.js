document.addEventListener('alpine:init', () => {
	Alpine.data('products', () => ({
		items: [
			{ id: 1, name: 'Robusta Brazil1', img: '01.jpg', price: 15000 },
			{ id: 2, name: 'Robusta Brazil2', img: '02.jpg', price: 20000 },
			{ id: 3, name: 'Robusta Brazil3', img: '03.jpg', price: 25000 },
			{ id: 4, name: 'Robusta Brazil4', img: '04.jpg', price: 30000 },
			{ id: 5, name: 'Robusta Brazil5', img: '05.jpg', price: 35000 },
			{ id: 6, name: 'Robusta Brazil6', img: '06.jpg', price: 40000 },
			{ id: 7, name: 'Robusta Brazil7', img: '07.jpg', price: 45000 },
			{ id: 8, name: 'Robusta Brazil8', img: '08.jpg', price: 50000 },
			{ id: 9, name: 'Robusta Brazil9', img: '09.jpg', price: 55000 },
			{ id: 10, name: 'Robusta Brazil10', img: '10.jpg', price: 15000 },
			{ id: 11, name: 'Robusta Brazil11', img: '11.jpg', price: 15000 },
			{ id: 12, name: 'Robusta Brazil12', img: '12.jpg', price: 20000 },
			{ id: 13, name: 'Robusta Brazil13', img: '13.jpg', price: 25000 },
			{ id: 14, name: 'Robusta Brazil14', img: '14.jpg', price: 30000 },
			{ id: 15, name: 'Robusta Brazil15', img: '15.jpg', price: 35000 },
			{ id: 16, name: 'Robusta Brazil16', img: '16.jpg', price: 40000 },
			{ id: 17, name: 'Robusta Brazil17', img: '17.jpg', price: 45000 },
			{ id: 18, name: 'Robusta Brazil18', img: '18.jpg', price: 50000 },
			{ id: 19, name: 'Robusta Brazil19', img: '19.jpg', price: 55000 },
			{ id: 20, name: 'Robusta Brazil20', img: '20.jpg', price: 15000 },
			{ id: 21, name: 'Robusta Brazil21', img: '21.jpg', price: 15000 },
			{ id: 22, name: 'Robusta Brazil22', img: '22.jpg', price: 20000 },
			{ id: 23, name: 'Robusta Brazil23', img: '23.jpg', price: 25000 },
			{ id: 24, name: 'Robusta Brazil24', img: '24.jpg', price: 30000 },
			{ id: 25, name: 'Robusta Brazil25', img: '25.jpg', price: 35000 },
			{ id: 26, name: 'Robusta Brazil26', img: '26.jpg', price: 40000 },
			{ id: 27, name: 'Robusta Brazil27', img: '27.jpg', price: 45000 },
			{ id: 28, name: 'Robusta Brazil28', img: '28.jpg', price: 50000 },
			{ id: 29, name: 'Robusta Brazil29', img: '29.jpg', price: 55000 },
			{ id: 30, name: 'Robusta Brazil30', img: '30.jpg', price: 55000 },
		],
	}));

	Alpine.store('cart', {
		items: [],
		quantity: 0,
		total: 0,
      
		add(newItem) {
			// cek isi keranjang.
			const cartItem = this.items.find((item) => item.id === newItem.id);
			// jika kosong
			if (!cartItem) {
				this.items.push({ ...newItem, quantity: 1, total: newItem.price });
				this.quantity++;
				this.total += newItem.price;
			} else {
				// jika ada
				this.items = this.items.map((item) => {
					// jika barang beda
					if (item.id !== newItem.id) {
						return items;
					} else {
						// jika sudah ada, tambah quantity dan totalnya
						item.quantity++;
						item.total = item.price * item.quantity;
						this.quantity++;
						this.total += item.price;
						return item;
					}
				});
			}
		},
		remove(id) {
			// cek isi keranjang.
			const cartItem = this.items.find((item) => item.id === id);
			// Jika barang lebih dari 1
			if (cartItem.quantity > 1) {
				this.items = this.items.map((item) => {
					// Telusuri id
					if (item.id !== id) {
						return item;
					} else {
						item.quantity--;
						item.total = item.price * item.quantity;
						this.quantity--;
						this.total -= item.price;
						return item;
					}
				});
			} else if (cartItem.quantity === 1) {
				// Jika barangnya sisa 1
				this.items = this.items.filter(item => item.id !== id);
				this.quantity--;
				this.total -= cart.item.price;
			};
		},
	});
});

// Form Validation
const checkoutButton = document.querySelector("checkout-button");
checkoutButton.disabled = true;

const form = document.querySelector("#checkout-form");
form.addEventListener('keyup', function () {
	for (let i = 0; i < form.elements.length; i++) {
		if (form.elements[i].value.length !== 0) {
         checkoutButton.classList.remove('disabled');
         checkoutButton.classList.add('disabled');
      } else {
         return false;
      }
	}
	checkoutButton.disabled = false;
	checkoutButton.classList.remove('disabled');
});

// Kirim data ketika tombol checkout disumbit.
checkoutButton.addEventListener('click', function (e) {
	e.preventDefault();
	const formData = new FormData(form);
	const data = new URLSearchParams(formData);
	const objData = Object.fromEntries(data).items;
   console.log(objData);
});





// JavaScript Demo: Intl.NumberFormat
// const number = 1234567.89;
// console.log(new Intl.NumberFormat('id-ID').format(number));
// console.log(new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number));
// console.log(new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'USD' }).format(number));
// console.log(new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'EUR' }).format(number));

const rupiah = (number) => {
	return new Intl.NumberFormat('id-ID', {
		style: 'currency',
		currency: 'IDR',
		minimumFractionDigits: 0,
	}).format(number);
};
