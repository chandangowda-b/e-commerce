# Backend API Integration Guide

## Overview
This guide shows how to connect the authentication system to your backend API.

## API Base URL

Set your API base URL. In production, use environment variables:

```javascript
// utils/api.js or constants.js
const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

export default API_BASE_URL;
```

---

## Authentication Endpoints

### 1. Register Endpoint

**Endpoint:** `POST /api/auth/register`

**Current Implementation** (in `useStore.js`):
```javascript
// BEFORE: Demo code
const newUser = {
  id: `user_${Date.now()}`,
  email: userData.email,
  firstName: userData.firstName,
  // ...
};
```

**Replace with:**
```javascript
const response = await fetch(`${API_BASE_URL}/auth/register`, {
  method: 'POST',
  headers: { 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}` // if needed
  },
  body: JSON.stringify({
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    password: userData.password,
    phone: userData.phone,
    dateOfBirth: userData.dateOfBirth,
    gender: userData.gender,
    newsletter: userData.newsletter
  })
});

if (!response.ok) {
  const error = await response.json();
  throw new Error(error.message || 'Registration failed');
}

const data = await response.json();
// data should contain: { user, token, message }
```

**Request Body:**
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "SecurePass123",
  "phone": "+91 9876543210",
  "dateOfBirth": "1995-05-15",
  "gender": "Male",
  "newsletter": true
}
```

**Expected Response (Success - 201):**
```json
{
  "success": true,
  "message": "Registration successful",
  "user": {
    "id": "user_123",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+91 9876543210",
    "dateOfBirth": "1995-05-15",
    "gender": "Male",
    "createdAt": "2024-12-04T10:30:00Z",
    "addresses": [],
    "preferences": {
      "newsletter": true,
      "emailNotifications": true,
      "smsNotifications": false
    },
    "orderHistory": []
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Expected Response (Error - 400):**
```json
{
  "success": false,
  "message": "Email already registered"
}
```

---

### 2. Login Endpoint

**Endpoint:** `POST /api/auth/login`

**Current Implementation** (in `useStore.js`):
```javascript
// BEFORE: Demo code
const user = state.registeredUsers.find(
  (u) => u.email === credentials.email
);
```

**Replace with:**
```javascript
const response = await fetch(`${API_BASE_URL}/auth/login`, {
  method: 'POST',
  headers: { 
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    email: credentials.email,
    password: credentials.password
  })
});

if (!response.ok) {
  const error = await response.json();
  throw new Error(error.message || 'Login failed');
}

const data = await response.json();
// data should contain: { user, token, message }
const token = data.token;
```

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Expected Response (Success - 200):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_123",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+91 9876543210",
    "profileImage": null,
    "dateOfBirth": "1995-05-15",
    "gender": "Male",
    "createdAt": "2024-12-04T10:30:00Z",
    "addresses": [
      {
        "id": 1,
        "label": "Home",
        "street": "123 Main Street",
        "city": "Bangalore",
        "state": "Karnataka",
        "zipCode": "560001",
        "country": "India",
        "isDefault": true
      }
    ],
    "preferences": {
      "newsletter": true,
      "emailNotifications": true,
      "smsNotifications": false
    },
    "orderHistory": []
  }
}
```

**Expected Response (Error - 401):**
```json
{
  "success": false,
  "message": "Invalid email or password"
}
```

---

### 3. Logout Endpoint (Optional)

**Endpoint:** `POST /api/auth/logout`

```javascript
const response = await fetch(`${API_BASE_URL}/auth/logout`, {
  method: 'POST',
  headers: { 
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }
});

// Then clear local state
localStorage.removeItem("authToken");
localStorage.removeItem("user");
```

---

### 4. Refresh Token Endpoint (Optional)

**Endpoint:** `POST /api/auth/refresh`

```javascript
const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
  method: 'POST',
  headers: { 
    'Authorization': `Bearer ${oldToken}`
  }
});

const data = await response.json();
const newToken = data.token;

// Update store with new token
updateAuthToken(newToken);
localStorage.setItem("authToken", newToken);
```

---

## Error Handling

### Add to `useStore.js`:

```javascript
// Better error handling helper
const handleApiError = (error) => {
  if (error.response) {
    // Server responded with error status
    return error.response.data.message || 'Server error';
  } else if (error.request) {
    // Request made but no response
    return 'Network error. Please check your connection.';
  } else {
    return error.message || 'Unknown error occurred';
  }
};
```

---

## Token Management

### Store Token:
```javascript
// In login/register actions
localStorage.setItem("authToken", token);
set({ authToken: token });
```

### Retrieve Token:
```javascript
const token = localStorage.getItem("authToken");
```

### Use in API Calls:
```javascript
const token = localStorage.getItem("authToken");

fetch(`${API_BASE_URL}/user/profile`, {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});
```

### Token Expiry Handling:
```javascript
const checkTokenExpiry = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/verify`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });
    
    if (response.status === 401) {
      // Token expired, logout user
      logout();
      navigate('/login');
    }
  } catch (error) {
    console.error('Token verification failed:', error);
  }
};
```

---

## API Interceptor (Optional)

Create an API wrapper to automatically include auth token:

```javascript
// utils/apiClient.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:5000/api'
});

// Add auth token to every request
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle 401 errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default apiClient;
```

---

## Complete Integration Example

Replace the login function in `useStore.js`:

```javascript
login: async (credentials) => {
  set({ isLoading: true, authError: null });
  try {
    const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
    
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Login failed');
    }

    const data = await response.json();
    const { token, user } = data;

    // Validate token format
    if (!token || typeof token !== 'string') {
      throw new Error('Invalid token received from server');
    }

    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(user));

    set({
      isAuthenticated: true,
      user,
      authToken: token,
    });

    return { success: true, message: 'Login successful' };

  } catch (error) {
    const errorMessage = error.message || 'Login failed';
    set({ authError: errorMessage });
    return { success: false, message: errorMessage };

  } finally {
    set({ isLoading: false });
  }
},
```

---

## Environment Variables

Create `.env` file in project root:

```env
# .env
REACT_APP_API_URL=http://localhost:5000/api

# Or for production:
REACT_APP_API_URL=https://api.yoursite.com/api
```

Access in code:
```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL;
```

---

## CORS Configuration

If API is on different domain, backend needs CORS:

```javascript
// Backend (Express example)
const cors = require('cors');

app.use(cors({
  origin: ['http://localhost:3000', 'https://yoursite.com'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

---

## Testing with Postman

### Register Endpoint:
```
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "password": "SecurePass123",
  "phone": "+91 9876543210",
  "dateOfBirth": "1995-05-15",
  "gender": "Male"
}
```

### Login Endpoint:
```
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

---

## Security Best Practices

### Frontend:
✅ Never hardcode API URLs
✅ Use environment variables
✅ Store tokens securely
✅ Validate all user input
✅ Use HTTPS in production
✅ Clear tokens on logout
✅ Implement token expiry handling

### Backend:
✅ Hash passwords (never store plain text)
✅ Validate all inputs server-side
✅ Use JWT or session tokens
✅ Implement rate limiting
✅ Use HTTPS only
✅ CORS configuration
✅ SQL injection prevention
✅ CSRF protection

---

## Common Issues & Solutions

### Issue: 401 Unauthorized
**Solution:** Token expired or invalid. Refresh token or redirect to login.

### Issue: CORS errors
**Solution:** Ensure backend has CORS enabled for your frontend domain.

### Issue: Token not persisting
**Solution:** Check localStorage is enabled in browser settings.

### Issue: 400 Bad Request
**Solution:** Verify request body matches backend expectations.

---

## Testing Checklist

- [ ] Register endpoint works
- [ ] Login endpoint works
- [ ] Token stored in localStorage
- [ ] User data persists on page refresh
- [ ] Token included in subsequent requests
- [ ] 401 errors redirect to login
- [ ] Logout clears token and user data
- [ ] Token refresh works (if implemented)
- [ ] CORS configured correctly

---

Generated: December 4, 2025
Version: 1.0.0
