const API_URL = 'http://localhost:3000/api';

const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const bookingForm = document.getElementById('bookingForm');
const bookingHistoryList = document.getElementById('bookingHistory');
const viewBookingsBtn = document.getElementById('viewBookings');

const authContainer = document.getElementById('authContainer');
const bookingContainer = document.getElementById('bookingContainer');

let token = localStorage.getItem('token');

// Show login and register forms if not logged in
if (!token) {
  authContainer.style.display = 'block';
  bookingContainer.style.display = 'none';
} else {
  authContainer.style.display = 'none';
  bookingContainer.style.display = 'block';
  fetchBookingHistory();
}

// Handle user login
loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (response.ok) {
      token = data.token;
      localStorage.setItem('token', token);
      authContainer.style.display = 'none';
      bookingContainer.style.display = 'block';
      fetchBookingHistory();
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error(error);
  }
});

// Handle user registration
registerForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const email = document.getElementById('regEmail').value;
  const password = document.getElementById('regPassword').value;

  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });
    const data = await response.json();
    if (response.ok) {
      alert('Registration successful!');
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error(error);
  }
});

// Handle taxi booking
bookingForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const pickup = document.getElementById('pickup').value;
  const dropoff = document.getElementById('dropoff').value;
  const date = document.getElementById('date').value;

  try {
    const response = await fetch(`${API_URL}/book`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ pickup, dropoff, date }),
    });
    const data = await response.json();
    if (response.ok) {
      alert('Booking successful!');
      fetchBookingHistory();
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error(error);
  }
});

// Fetch booking history
async function fetchBookingHistory() {
  try {
    const response = await fetch(`${API_URL}/history`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    bookingHistoryList.innerHTML = '';
    data.forEach(booking => {
      const li = document.createElement('li');
      li.textContent = `Pickup: ${booking.pickup}, Dropoff: ${booking.dropoff}, Date: ${new Date(booking.date).toLocaleString()}`;
      bookingHistoryList.appendChild(li);
    });
  } catch (error) {
    console.error(error);
  }
}
