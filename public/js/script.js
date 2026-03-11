// ==========================================
// ARSITEKTUR MVP: LOGIKA BISNIS & UI (Sesi 3)
// ==========================================

// 1. DATABASE SEMENTARA (Startup: Makanan Sehat)
const dataProduk = [
    { id: 1, nama: "Salad Buah Premium", harga: 50000, icon: "fa-apple-whole" },
    { id: 2, nama: "Smoothie Bowl", harga: 75000, icon: "fa-bowl-food" },
    { id: 3, nama: "Catering Sehat Mingguan", harga: 5500000, icon: "fa-box-archive" }
];

let totalKeranjang = 0;
let jumlahItem = 0;

const btnTampilkan = document.getElementById('btn-tampilkan-produk');
const katalogContainer = document.getElementById('katalog-container');
const displayTotal = document.getElementById('display-total');
const badgeKeranjang = document.getElementById('cart-badge');
const btnCheckout = document.getElementById('btn-checkout');
const promoAlert = document.getElementById('promo-alert');

// TUGAS 1: LOOPS
btnTampilkan.addEventListener('click', function() {
    katalogContainer.innerHTML = ''; 
    for (let i = 0; i < dataProduk.length; i++) {
        let produkCard = `
            <div class="col-md-4">
                <div class="card product-card h-100 p-3 text-center border-primary border-opacity-25">
                    <i class="fa-solid ${dataProduk[i].icon} fa-3x text-primary mb-3 mt-2"></i>
                    <h5 class="card-title fw-bold">${dataProduk[i].nama}</h5>
                    <p class="card-text text-muted">Rp ${dataProduk[i].harga.toLocaleString('id-ID')}</p>
                    <button class="btn btn-outline-primary w-100" onclick="tambahKeKeranjang(${dataProduk[i].harga})">
                        + Tambah
                    </button>
                </div>
            </div>
        `;
        katalogContainer.innerHTML += produkCard;
    }
    btnTampilkan.disabled = true;
    btnTampilkan.innerHTML = '<i class="fa-solid fa-check"></i> Data Dimuat';
});

// TUGAS 2: LOGIKA TRANSAKSI
function tambahKeKeranjang(hargaProduk) {
    totalKeranjang += hargaProduk;
    jumlahItem += 1;

    badgeKeranjang.textContent = jumlahItem;
    displayTotal.textContent = 'Rp ' + totalKeranjang.toLocaleString('id-ID');
    
    btnCheckout.classList.remove('disabled');

    // Panggil fungsi promo
    cekPromoOtomatis();
}

// TUGAS 3: CONDITIONALS (Syarat Rp 5.000.000)
function cekPromoOtomatis() {
    const teksPromo = document.getElementById('promo-text');
    const batasPromo = 5000000; 

    if (totalKeranjang > batasPromo) {
        promoAlert.classList.remove('d-none');
        promoAlert.classList.replace('alert-info', 'alert-success');
        teksPromo.textContent = "Selamat! Anda berhak mendapat Diskon 10% karena belanja di atas Rp 5.000.000.";
    } else {
        promoAlert.classList.remove('d-none');
        teksPromo.textContent = `Tambah Rp ${(batasPromo - totalKeranjang).toLocaleString('id-ID')} lagi untuk dapat Diskon 10%!`;
    }
}

// TUGAS 4: EVENT LISTENER
btnCheckout.addEventListener('click', function() {
    btnCheckout.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Memproses Pesanan...';
    btnCheckout.classList.replace('btn-primary', 'btn-success');
    
    setTimeout(() => {
        alert(`Transaksi Berhasil!\nTotal Pembayaran: Rp ${totalKeranjang.toLocaleString('id-ID')}\nTerima kasih telah berbelanja.`);
        location.reload(); 
    }, 1500);
});