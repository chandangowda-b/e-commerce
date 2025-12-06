# Authentication System Documentation

## Overview
Complete user authentication system with registration, login, logout, and session management. Built with Zustand for state management and ready for backend API integration.

## Features Implemented

### 1. **Register Page** (`/src/pages/RegisterPage.jsx`)
Complete user registration with comprehensive form validation.

#### Route: `/register`

#### Registration Fields:
- **First Name** * (minimum 2 characters)
- **Last Name** * (minimum 2 characters)
- **Email Address** * (valid email format, unique)
- **Password** * (minimum 6 characters, must contain uppercase, lowercase, and number)
- **Confirm Password** * (must match password)
- **Phone Number** * (10+ digits)
- **Date of Birth** *
- **Gender** * (Male/Female/Other)
- **Newsletter Subscription** (checkbox, optional)
- **Terms & Conditions** * (required)

#### Features:
✅ Real-time form validation
✅ Password visibility toggle
✅ Error messages for each field
✅ Success notification on registration
✅ Loading state during submission
✅ Redirect to login on success
✅ Social signup buttons (ready for integration)
✅ Link to login page

---

### 2. **Login Page** (`/src/pages/LoginPage.jsx`)
Simple and secure login interface.

#### Route: `/login`

#### Login Fields:
- **Email Address** *
- **Password** *
- **Remember Me** (checkbox)

#### Features:
✅ Email format validation
✅ Password visibility toggle
✅ Error handling
✅ Loading state
✅ Remember me functionality (ready for implementation)
✅ Forgot password link (ready for implementation)
✅ Social login buttons (ready for integration)
✅ Link to registration page

#### Demo Credentials:
```
Email: demo@example.com
Password: demo123
```

---

### 3. **Updated Navbar**
Authentication-aware navigation with user profile dropdown.

#### Features:
✅ Shows login/signup buttons when not authenticated
✅ Shows user profile dropdown when authenticated
✅ User name display in dropdown
✅ Quick access to profile page
✅ Logout functionality
✅ Smooth animations and transitions

---

## Zustand Store - Authentication State

### State Properties:

```javascript
isAuthenticated: boolean        // Authentication status
isLoading: boolean             // Loading during auth operations
authError: string | null       // Error messages
authToken: string | null       // JWT/Auth token (stored in localStorage)
user: Object | null            // Current user data
registeredUsers: Array         // Demo user storage
```

### Store Actions:

#### 1. **Register User**
```javascript
const register = useStore((state) => state.register);

const result = await register({
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  password: "SecurePass123",
  phone: "+91 9876543210",
  dateOfBirth: "1995-05-15",
  gender: "Male",
  newsletter: true
});

// Returns: { success: boolean, message: string }
```

#### 2. **Login User**
```javascript
const login = useStore((state) => state.login);

const result = await login({
  email: "john@example.com",
  password: "SecurePass123"
});

// Returns: { success: boolean, message: string }
// On success: Sets isAuthenticated, user, authToken
```

#### 3. **Logout User**
```javascript
const logout = useStore((state) => state.logout);

logout();

// Clears: isAuthenticated, user, authToken, authError
// Removes: localStorage items (authToken, user)
```

#### 4. **Check Authentication**
```javascript
const checkAuth = useStore((state) => state.checkAuth);

useEffect(() => {
  checkAuth(); // Called on app initialization
}, []);

// Returns: boolean
// Restores session from localStorage if valid
```

#### 5. **Get Auth Status**
```javascript
const getAuthStatus = useStore((state) => state.getAuthStatus);

const status = getAuthStatus();
// Returns: { isAuthenticated, user, token }
```

#### 6. **Clear Auth Error**
```javascript
const clearAuthError = useStore((state) => state.clearAuthError);
clearAuthError();
```

#### 7. **Update Auth Token** (for token refresh)
```javascript
const updateAuthToken = useStore((state) => state.updateAuthToken);
updateAuthToken(newToken);
```

---

## Usage Examples

### Check User Authentication
```jsx
import useStore from "../store/useStore";

function ProtectedComponent() {
  const isAuthenticated = useStore((state) => state.isAuthenticated);
  const user = useStore((state) => state.user);

  if (!isAuthenticated) {
    return <div>Please login to access this page</div>;
  }

  return <div>Welcome {user.firstName}!</div>;
}
```

### Handle Login
```jsx
const handleLogin = async () => {
  const login = useStore((state) => state.login);
  
  const result = await login({
    email: formData.email,
    password: formData.password
  });

  if (result.success) {
    navigate("/");
  } else {
    console.error(result.message);
  }
};
```

### Access User Information
```jsx
const user = useStore((state) => state.user);

console.log(user.firstName);      // "John"
console.log(user.email);          // "john@example.com"
console.log(user.addresses);      // Array of addresses
console.log(user.preferences);    // User preferences
```

### Protected Routes (Ready to Implement)
```jsx
import { Navigate } from "react-router-dom";
import useStore from "../store/useStore";

function ProtectedRoute({ children }) {
  const isAuthenticated = useStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
}

// Usage in App.jsx
<Route 
  path="/profile" 
  element={
    <ProtectedRoute>
      <ProfilePage />
    </ProtectedRoute>
  } 
/>
```

---

## Backend Integration Guide

### Replace Demo Implementations

#### Register Endpoint:
```javascript
// In useStore.js register action, replace:
// const response = await fetch('/api/auth/register', {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify(userData)
// });
// const data = await response.json();
```

#### Login Endpoint:
```javascript
// In useStore.js login action, replace:
// const response = await fetch('/api/auth/login', {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify(credentials)
// });
// const data = await response.json();
// const token = data.token;
```

### Expected Backend Responses:

#### Register Response:
```json
{
  "success": true,
  "message": "Registration successful",
  "user": {
    "id": "user_123",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "token": "eyJhbGc..."
  }
}
```

#### Login Response:
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGc...",
  "user": {
    "id": "user_123",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "phone": "+91 9876543210",
    "addresses": [],
    "preferences": {}
  }
}
```

---

## Data Persistence

### LocalStorage
- **authToken**: Stores authentication token for session persistence
- **user**: Stores user data as JSON string

### Session Management
```javascript
// Automatic session restoration on app load
useEffect(() => {
  checkAuth();
}, []);

// Manual logout
logout(); // Clears both localStorage and store
```

---

## Security Features

### Implemented:
✅ Password visibility toggle
✅ Token-based authentication (JWT ready)
✅ LocalStorage for session persistence
✅ Password confirmation validation
✅ Email uniqueness validation
✅ Error handling and user feedback

### Ready to Implement:
🔄 HTTP-only cookies for token storage
🔄 HTTPS requirement
🔄 CORS security
🔄 Rate limiting
🔄 Password hashing (backend)
🔄 Token expiration and refresh
🔄 Two-factor authentication
🔄 Social OAuth integration

---

## File Structure

```
src/
├── pages/
│   ├── LoginPage.jsx          # Login form
│   ├── RegisterPage.jsx       # Registration form
│   └── ProfilePage.jsx        # User profile (requires login)
├── components/
│   └── Navbar.jsx             # Updated with auth UI
├── store/
│   └── useStore.js            # Auth actions and state
└── App.jsx                     # Auth initialization
```

---

## Routes Configuration

```jsx
// App.jsx
<Route path="/login" element={<LoginPage />} />
<Route path="/register" element={<RegisterPage />} />
<Route path="/profile" element={<ProfilePage />} />

// Protected routes (ready to add)
<Route 
  path="/checkout" 
  element={<ProtectedRoute><CheckoutPage /></ProtectedRoute>} 
/>
```

---

## Testing Checklist

### Registration:
- [ ] Fill form with valid data
- [ ] Submit and see success message
- [ ] Redirect to login page
- [ ] Try registering with same email (should fail)
- [ ] Test password validation
- [ ] Test email format validation
- [ ] Test phone format validation
- [ ] Test password mismatch error
- [ ] Test required field validation

### Login:
- [ ] Login with demo credentials
- [ ] See user in navbar dropdown
- [ ] Logout from dropdown
- [ ] Try invalid password (should fail)
- [ ] Try non-existent email (should fail)
- [ ] Session persists on page refresh
- [ ] Redirect on successful login

### Navigation:
- [ ] Login/Signup buttons visible when not authenticated
- [ ] User dropdown visible when authenticated
- [ ] Profile accessible only when logged in
- [ ] Logout clears session
- [ ] Cart works regardless of auth status

---

## Error Handling

### Common Errors:

```
"Email already registered"     // User already exists
"Invalid email or password"    // Wrong credentials
"Registration failed"          // Server error
"Login failed"                 // Server error
"Password must be at least 6 characters"
"Passwords do not match"
```

---

## Future Enhancements

1. **Email Verification**
   - Send verification email on registration
   - Verify email before account activation

2. **Password Recovery**
   - Forgot password page
   - Reset password via email link
   - Temporary password generation

3. **Social Authentication**
   - Google OAuth integration
   - GitHub OAuth integration
   - Facebook login

4. **Multi-Factor Authentication**
   - Two-factor authentication (2FA)
   - Authenticator app support

5. **Session Management**
   - Remember me for extended sessions
   - Device management
   - Session history
   - Logout from other devices

6. **Profile Enhancements**
   - Email change with verification
   - Phone number update
   - Security settings
   - Activity logs

---

## Required Dependencies

All are already installed:
- `react` (v19.2.0)
- `react-router-dom` (v7.10.0)
- `zustand` (v5.0.9)
- `framer-motion` (v12.23.25)
- `react-icons` (v5.5.0)
- `tailwindcss` (v4.1.17)

---

## Support

For debugging:
1. Check browser console for errors
2. Open DevTools and check localStorage
3. Monitor Network tab for API calls (when backend connected)
4. Check Zustand store state with Redux DevTools

---

Generated: December 4, 2025
Version: 1.0.0
