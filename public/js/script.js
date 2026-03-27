// ==========================================
// ARSITEKTUR MVP: LOGIKA BISNIS & UI (Sesi 3)
// ==========================================

// 1. DATABASE SEMENTARA (Simulasi Array Data Produk)
// Nanti di UAS, data ini akan diambil dari MySQL via CodeIgniter.
const dataProduk = [
    { id: 1, nama: "Visual Branding", harga: 2000000, icon: "fa-palette" },
    { id: 2, nama: "Social Media Design", harga: 1500000, icon: "fa-mobile-screen" },
    { id: 3, nama: "Content & Creative Concept", harga: 2500000, icon: "fa-lightbulb" }
];

// STATE APLIKASI (Variabel untuk melacak status transaksi)
let totalKeranjang = 0;
let jumlahItem = 0;

// MENANGKAP ELEMEN HTML (DOM Selection)
// Ini adalah cara JavaScript mencari elemen di index.html
const btnTampilkan = document.getElementById('btn-tampilkan-produk');
const katalogContainer = document.getElementById('katalog-container');
const displayTotal = document.getElementById('display-total');
const badgeKeranjang = document.getElementById('cart-badge');
const btnCheckout = document.getElementById('btn-checkout');
const promoAlert = document.getElementById('promo-alert');


// ==========================================
// TUGAS 1: LOOPS (Otomatisasi Tampilan UI)
// ==========================================
btnTampilkan.addEventListener('click', function() {
    // Menghapus pesan kosong
    katalogContainer.innerHTML = ''; 

    // TODO MAHASISWA: Gunakan 'for loop' untuk menampilkan dataProduk ke layar.
    // Petunjuk: Loop dari 0 sampai dataProduk.length
    
    for (let i = 0; i < dataProduk.length; i++) {
        // Membuat elemen HTML untuk setiap produk
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
        // Menyuntikkan HTML ke dalam container
        katalogContainer.innerHTML += produkCard;
    }

    // Ubah status tombol setelah diklik
    btnTampilkan.disabled = true;
    btnTampilkan.innerHTML = '<i class="fa-solid fa-check"></i> Data Dimuat';
});


// ==========================================
// TUGAS 2: LOGIKA TRANSAKSI (Fungsi Beli)
// ==========================================
function tambahKeKeranjang(hargaProduk) {
    // 1. Update State (Data)
    totalKeranjang += hargaProduk;
    jumlahItem += 1;

    // 2. Update UI (DOM Manipulation)
    badgeKeranjang.textContent = jumlahItem;
    displayTotal.textContent = 'Rp ' + totalKeranjang.toLocaleString('id-ID');
    
    // Aktifkan tombol checkout karena keranjang sudah tidak kosong
    btnCheckout.classList.remove('disabled');

    // Panggil fungsi pengecekan promo
    cekPromoOtomatis();
}


// ==========================================
// TUGAS 3: CONDITIONALS (Logika Promo Bisnis)
// ==========================================
function cekPromoOtomatis() {
    const teksPromo = document.getElementById('promo-text');
    
    // TODO MAHASISWA: Buat logika IF/ELSE. 
    // Jika totalKeranjang LEBIH DARI Rp 2.000.000, berikan pesan diskon.
    // Jika tidak, hilangkan pesan diskon/beri pesan upselling.

    if (totalKeranjang > 5000000) {
        // Tampilkan peringatan promo
        promoAlert.classList.remove('d-none');
        promoAlert.classList.replace('alert-info', 'alert-success');
        teksPromo.textContent = "Selamat! Anda berhak mendapatkan Diskon 10% saat Checkout.";
    } else {
        // Sembunyikan peringatan jika total turun (opsional untuk keranjang dinamis)
        // Untuk saat ini, kita beri dorongan upselling
        promoAlert.classList.remove('d-none');
        teksPromo.textContent = `Tambah Rp ${(5000000 - totalKeranjang).toLocaleString('id-ID')} lagi untuk mendapatkan Diskon 10%!`;
    }
}


// ==========================================
// TUGAS 4: EVENT LISTENER (Titik Konversi Akhir)
// ==========================================
btnCheckout.addEventListener('click', function() {
    // Feedback visual seketika untuk meredakan kecemasan pengguna (DOM Manipulation)
    btnCheckout.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Memproses Pesanan...';
    btnCheckout.classList.replace('btn-primary', 'btn-success');
    
    // Simulasi jeda server (nanti akan diganti dengan request CodeIgniter)
    setTimeout(() => {
        alert(`Transaksi Berhasil!\nTotal Pembayaran: Rp ${totalKeranjang.toLocaleString('id-ID')}\nTerima kasih telah berbelanja.`);
        
        // Reset aplikasi setelah transaksi selesai
        location.reload(); 
    }, 1500);
});