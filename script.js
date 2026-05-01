// --- 1. TOGGLE NAVBAR UNTUK MOBILE ---
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x'); // Ubah ikon ke 'X'
    navbar.classList.toggle('active');
};

// --- 2. SCROLL SECTIONS ACTIVE LINK ---
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });

    // Sticky Navbar
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    // Hapus toggle icon dan navbar saat link diklik (scroll)
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
};

// --- 3. FITUR MUSIK ---
const music = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

musicBtn.addEventListener("click", () => {
    if (music.paused) {
        music.play();
        musicBtn.innerHTML = "<i class='bx bx-pause'></i> Pause";
    } else {
        music.pause();
        musicBtn.innerHTML = "<i class='bx bx-play'></i> Musik";
    }
});

const contactForm = document.getElementById('contact-form');
const sendBtn = document.getElementById('btn-send');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    // Ubah teks tombol saat mengirim
    sendBtn.innerText = 'Sending...';
    sendBtn.disabled = true;

    // Masukkan ID dari EmailJS kamu
    const serviceID = 'service_beifnlu';
    const templateID = 'template_3fcx6je';

    emailjs.sendForm(serviceID, templateID, this)
        .then(() => {
            sendBtn.innerText = 'Send Message';
            sendBtn.disabled = false;
            alert('Pesan berhasil terkirim! Cek inbox email kamu.');
            contactForm.reset(); // Kosongkan form
        }, (err) => {
            sendBtn.innerText = 'Send Message';
            sendBtn.disabled = false;
            alert('Gagal mengirim: ' + JSON.stringify(err));
        });
});

// 1. Fitur Typing Effect di Welcome Screen
const typingText = document.querySelector('.typing-text');
const name = "Ballnatic Portfolio"; // Ganti dengan nama kamu/brand kamu
let charIndex = 0;

function type() {
    if (charIndex < name.length) {
        typingText.textContent += name.charAt(charIndex);
        charIndex++;
        setTimeout(type, 100);
    }
}

// 2. Menghilangkan Welcome Screen setelah loading selesai
window.addEventListener('load', () => {
    // Mulai animasi mengetik
    type();

    // Tunggu 3 detik (agar pengunjung bisa melihat sambutan) lalu hilangkan
    setTimeout(() => {
        const welcomeScreen = document.getElementById('welcome-screen');
        welcomeScreen.classList.add('fade-out');
        
        // Opsional: Aktifkan scroll body setelah welcome screen hilang
        document.body.style.overflow = 'auto';
    }, 3500);
});

// Tambahkan ini di CSS awal kamu agar saat loading tidak bisa di-scroll
// body { overflow: hidden; }

const themeIcon = document.getElementById('theme-icon');
const body = document.body;

// Cek jika user sebelumnya sudah memilih mode tertentu
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'light') {
    body.classList.add('light-mode');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
}

themeIcon.onclick = () => {
    body.classList.toggle('light-mode');
    
    if (body.classList.contains('light-mode')) {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'light'); // Simpan pilihan
    } else {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'dark'); // Simpan pilihan
    }
};

const filterButtons = document.querySelectorAll('.filter-btn');
const items = document.querySelectorAll('.item-box');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Hapus class active dari semua tombol
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Tambahkan ke tombol yang diklik
        button.classList.add('active');

        const target = button.getAttribute('data-target');

        items.forEach(item => {
            if (target === 'all') {
                item.style.display = 'block';
            } else {
                if (item.classList.contains(target)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            }
        });
    });
});