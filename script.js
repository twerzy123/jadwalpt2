// script.js - Updated with Chat Views Logic

const users = {
  "budi":  { password: "123", role: "karyawan", name: "Budi Santoso", position: "Operator Line A" },
  "admin": { password: "admin123", role: "admin", name: "Ahmad Supervisor", position: "Administrator" }
};

function handleLogin(e) {
  e.preventDefault();
  const username = document.getElementById('username').value.trim().toLowerCase();
  const password = document.getElementById('password').value;
  const user = users[username];

  if (user && user.password === password) {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('role', user.role);
    localStorage.setItem('name', user.name);
    localStorage.setItem('position', user.position);
    window.location.href = "index.html";
  } else {
    alert("Username atau password salah!");
  }
}

function handleLogout() {
  localStorage.clear();
  window.location.href = "login.html";
}

function setupPage() {
  const role = localStorage.getItem('role');
  const name = localStorage.getItem('name');
  const position = localStorage.getItem('position');

  if (!localStorage.getItem('isLoggedIn')) {
    window.location.href = "login.html";
    return;
  }

  document.getElementById('user-name').textContent = name;
  document.getElementById('user-role').textContent = position;

  // Seleksi Navigasi
  const navHomeKaryawan = document.getElementById('nav-home-karyawan');
  const navChatKaryawan = document.getElementById('nav-chat-karyawan');
  const navDashAdmin = document.getElementById('nav-dash-admin');
  const navChatAdmin = document.getElementById('nav-chat-admin');

  if (role === "admin") {
    document.getElementById('admin-view').classList.remove('hidden');
    document.getElementById('role-badge').innerHTML = `<span class="bg-red-500 text-white px-3 py-1 rounded-full">ADMIN</span>`;
    
    // Tampilkan Navigasi Admin
    navDashAdmin.style.display = 'flex';
    navChatAdmin.style.display = 'flex';
    navHomeKaryawan.style.display = 'none';
    navChatKaryawan.style.display = 'none';

    // Set nav aktif awal
    navDashAdmin.classList.add('active');
  } else {
    document.getElementById('karyawan-view').classList.remove('hidden');
    document.getElementById('role-badge').innerHTML = `<span class="bg-teal-500 text-white px-3 py-1 rounded-full">KARYAWAN</span>`;
    
    // Tampilkan Navigasi Karyawan
    navDashAdmin.style.display = 'none';
    navChatAdmin.style.display = 'none';
    navHomeKaryawan.style.display = 'flex';
    navChatKaryawan.style.display = 'flex';

    // Set nav aktif awal
    navHomeKaryawan.classList.add('active');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', handleLogin);
  }

  if (document.getElementById('user-name')) {
    setupPage();
    document.getElementById('logout-btn').addEventListener('click', handleLogout);
  }

  // Bottom nav click untuk semua view
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      
      const viewId = item.getAttribute('data-view');
      if (viewId) {
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');

        document.querySelectorAll('.view').forEach(v => v.classList.add('hidden'));
        document.getElementById(viewId).classList.remove('hidden');
      }
    });
  });
});