document.addEventListener("alpine:init", () => {
	Alpine.data("products", () => ({
		items: [
			{ id: 1, name: "Robusta Brazil", img: "01.jpg", price: 15000 },
			{ id: 2, name: "Primo Passo", img: "02.jpg", price: 20000 },
			{ id: 3, name: "Arabica Blend", img: "03.jpg", price: 25000 },
			{ id: 4, name: "Aceh Mayo", img: "04.jpg", price: 30000 },
			{ id: 5, name: "Cyanide Cofe", img: "05.jpg", price: 35000 },
		],
	}));

	Alpine.store("cart", {
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
						return item;
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
				// Telusuri 1 per 1
				this.items = this.items.map((item) => {
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
				this.items = this.items.filter((item) => item.id !== id);
				this.quantity--;
				this.total -= cart.item.price;
			}
		},
	});
});

// Form Validation
const checkoutButton = document.querySelector(".checkout-button");
checkoutButton.disabled = true;

const form = document.querySelector("#checkoutForm");
form.addEventListener("keyup", function () {
	for (let i = 0; i < form.elements.length; i++) {
		if (form.elements[i].value.length !== 0) {
			checkoutButton.classList.remove("disabled");
			checkoutButton.classList.add("disabled");
		} else {
			return false;
		}
	}
	checkoutButton.disabled = false;
	checkoutButton.classList.remove("disabled");
});

// Kirim data ketika tombol checkout diklik.
checkoutButton.addEventListener("click", async function (e) {
	// checkoutButton.addEventListener("click", function (e) {
	e.preventDefault();
	const formData = new FormData(form);
	const data = new URLSearchParams(formData);
	const objData = Object.fromEntries(data);
	// console.log(objData);
	// const message = formatMessage(objData);
	// window.open("http://wa.me/62817377322?text=" + encodeURIComponent(message));

	// Minta token transaksi menggunakan ajax /fetch
	try {
		const response = await fetch("php/placeOrder.php", {
			// const response = fetch("php/placeOrder.php", {
			method: "POST",
			body: data,
		});
		const token = await response.text();
		// const token = response.text();
		// Trigger snap popup. @TODO: Replace TRANSACTION_TOKEN_HERE with your transaction token
		console.log(token);
		// window.snap.pay(token);
	} catch (err) {
		console.log(err.message);
	}
});

// Pesan WA
const formatMessage = (obj) => {
	return `Data Customer
	Nama: ${obj.name}
	Email: ${obj.email}
	No HP: ${obj.phone}

	Data Pesanan 
	${JSON.parse(obj.items).map((item) => `${item.name} (${item.quantity} x ${rupiah(item.total)}) \n`)}

	TOTAL: ${rupiah(obj.total)}
	
	Terima kasih.
	`;
};

// JavaScript Demo: Intl.NumberFormat
// const number = 1234567.89;
// console.log(new Intl.NumberFormat('id-ID').format(number));
// console.log(new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number));
// console.log(new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'USD' }).format(number));
// console.log(new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'EUR' }).format(number));
const rupiah = (number) => {
	return new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		minimumFractionDigits: 0,
	}).format(number);
};
