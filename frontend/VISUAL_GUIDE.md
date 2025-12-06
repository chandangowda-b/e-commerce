# 📸 Visual Navigation & Feature Guide

## Navigation Map

```
HOME (/)
├── [NOT LOGGED IN]
│   ├── Click "Sign Up" → /register
│   │   └── Fill form → Create Account → /login
│   │
│   └── Click "Login" → /login
│       └── Enter credentials → /
│
└── [LOGGED IN]
    ├── Click User Profile → /profile
    │   └── View/Edit Profile, Addresses, Orders, Preferences
    │
    ├── Click Logout → /
    │   └── Logged out successfully
    │
    └── Continue shopping normally
```

---

## Login Page Sections

### 1. Header
```
CarCare (logo)
"Welcome back to your automotive hub"
```

### 2. Login Form
```
Email Address *
  └─ Format: user@example.com
  └─ Icon: Envelope
  
Password *
  └─ Min 6 characters
  └─ Icon: Lock
  └─ Visibility Toggle: Eye icon
```

### 3. Quick Links
```
[Remember me checkbox] [Forgot Password?]
```

### 4. Submit
```
[LOGIN] button (with loading spinner)
```

### 5. Demo Notice
```
Blue box: "Demo Credentials: demo@example.com / demo123"
```

### 6. Social Login
```
[Google] [GitHub] (ready for integration)
```

### 7. Sign Up Link
```
"Don't have an account?" → [Sign Up link]
```

---

## Register Page Sections

### 1. Header
```
CarCare (logo)
"Create your account and start shopping"
```

### 2. Personal Information
```
First Name * ──────  Last Name *
  └─ Min 2 chars     └─ Min 2 chars

Email Address *
  └─ Must be unique
  
Password *          Confirm Password *
  └─ Min 6 chars    └─ Must match
  └─ Must have:     └─ Visibility toggle
     • Uppercase
     • Lowercase
     • Number
```

### 3. Contact Information
```
Phone Number *      Date of Birth *
  └─ 10+ digits     └─ Date picker

Gender *
  └─ Dropdown: Male/Female/Other
```

### 4. Preferences
```
☑ Subscribe to newsletter
☑ I agree to Terms & Privacy *
```

### 5. Submit
```
[CREATE ACCOUNT] button (with loading spinner)
```

### 6. Social Signup
```
[Google] [GitHub]
```

### 7. Login Link
```
"Already have an account?" → [Login link]
```

---

## Navbar States

### When NOT Logged In:
```
┌─────────────────────────────────────────────┐
│ CarCare    [Search]    [LOGIN] [SIGN UP]    │
└─────────────────────────────────────────────┘
```

### When Logged In:
```
┌─────────────────────────────────────────────┐
│ CarCare    [Search]    [John ⌄]  🎧  🛒    │
│                    ┌──────────────────┐     │
│                    │ John Doe         │     │
│                    │ john@example.com │     │
│                    ├──────────────────┤     │
│                    │ My Profile       │     │
│                    ├──────────────────┤     │
│                    │ Logout           │     │
│                    └──────────────────┘     │
└─────────────────────────────────────────────┘
```

---

## Demo Flow - Step by Step

### 1. Start
```
Homepage → See "Sign Up" button in navbar
```

### 2. Register
```
Click "Sign Up" → Fill registration form:
  First Name: John
  Last Name: Doe
  Email: john@test.com
  Password: Test123
  Confirm: Test123
  Phone: +91 9876543210
  DOB: 1995-05-15
  Gender: Male
  ☑ Newsletter
  ☑ I agree to terms
→ Click "Create Account"
→ See success message
→ Redirected to /login
```

### 3. Login with Demo
```
Email: demo@example.com
Password: demo123
→ Click "Login"
→ Redirected to home
→ See user in navbar dropdown
```

### 4. Access Profile
```
Click on "John" dropdown → Click "My Profile"
→ See /profile page
→ View profile information
→ Edit profile
→ Manage addresses
→ View order history
→ Set preferences
```

### 5. Logout
```
Click on "John" dropdown → Click "Logout"
→ Logged out
→ Login/Sign Up buttons reappear
→ Redirected to home
```

---

## Form Validation Visual

### Real-time Validation (as you type):

```
❌ Email
Enter valid email like: user@example.com

✅ Email
john@example.com

---

❌ Password (3 chars)
Needs uppercase, lowercase, number

⚠️ Password (Pass12)
Missing number

✅ Password
SecurePass123
```

---

## Error Messages

### Registration Errors:
```
"Email already registered"          [Red banner]
"Passwords do not match"            [Red banner]
"Invalid email format"              [Red text below field]
"Password must be at least 6 chars" [Red text below field]
"Invalid phone format"              [Red text below field]
```

### Login Errors:
```
"Invalid email or password"  [Red banner]
"Login failed"               [Red banner]
"Network error"              [Red banner]
```

---

## Responsive Views

### Mobile (< 640px):
```
Logo
Search (hidden)
Hamburger menu

[Full-width form]
[Stacked inputs]
[Full-width buttons]

User dropdown below icons
```

### Tablet (640px - 1024px):
```
Logo
[Search box]
Some icons visible

[Form in container]
[2-column inputs where possible]
[Good spacing]

User dropdown on right
```

### Desktop (> 1024px):
```
Logo
[Full search bar]
All icons visible

[Centered form]
[Multiple columns]
[All features visible]

User dropdown with hover effects
```

---

## Loading States

### During Login/Register:
```
Button shows:
┌────────────────────┐
│  ⟳ Logging in...   │  ← Spinning indicator
└────────────────────┘

Form fields disabled
Submit button disabled (opacity 50%)
```

### Success State:
```
"Registration successful!" ✅
Redirecting in 1.5 seconds...
```

### Error State:
```
╔═══════════════════════════════════╗
║ ✗ Email already registered      ║
╚═══════════════════════════════════╝
Form remains enabled for retry
```

---

## Local Storage Data

### After Login:
```
localStorage = {
  authToken: "eyJhbGc...",
  user: {
    id: "user_001",
    firstName: "John",
    lastName: "Doe",
    email: "john@example.com",
    phone: "+91 9876543210",
    ...
  }
}
```

### After Logout:
```
localStorage = {
  // Empty
}

Store state = {
  isAuthenticated: false,
  user: null,
  authToken: null
}
```

---

## Component Hierarchy

```
App
├── Routes
│   ├── LoginPage
│   │   ├── Form
│   │   └── Links
│   │
│   ├── RegisterPage
│   │   ├── Form
│   │   └── Links
│   │
│   ├── ProfilePage (shows when authenticated)
│   │   ├── EditProfileForm (modal)
│   │   └── AddressCard
│   │
│   └── Home
│       ├── Navbar ← Shows auth status
│       └── ...
```

---

## Authentication Flow Chart

```
┌─────────────┐
│   Start     │
└──────┬──────┘
       │
       ├─→ Not Logged In
       │   ├─→ "Sign Up" → RegisterPage
       │   │   └─→ Fill form → Create Account
       │   │       └─→ Success → LoginPage
       │   │
       │   └─→ "Login" → LoginPage
       │       └─→ Enter credentials
       │           └─→ Success → Set auth token → Home
       │               └─→ Error → Show message
       │
       └─→ Logged In (session restored)
           ├─→ View navbar with user
           ├─→ Access protected pages (/profile)
           ├─→ Click logout
           │   └─→ Clear session → Show login buttons
           │
           └─→ On page refresh
               └─→ checkAuth() restores session
                   └─→ User stays logged in
```

---

## Color Scheme

### Primary:
```
Red: #EF4444 (accent, buttons)
Black: #000000 (background)
White: #FFFFFF (text)
```

### Secondary:
```
Gray-400: #9CA3AF (secondary text)
White/10: rgba(255,255,255,0.1) (backgrounds)
White/20: rgba(255,255,255,0.2) (hover)
Red/20: rgba(239,68,68,0.2) (error backgrounds)
```

### States:
```
Success: #10B981 (green)
Error: #EF4444 (red)
Warning: #F59E0B (amber)
Info: #3B82F6 (blue)
```

---

## Icons Used

```
FaEnvelope  → Email fields
FaLock      → Password fields
FaEye       → Show password
FaEyeSlash  → Hide password
FaUser      → Profile/user icon
FaPhone     → Phone number
FaCalendar  → Date of birth
FaCheck     → Success
FaX         → Close/Cancel
FaSignOutAlt → Logout
FaShoppingCart → Cart (existing)
```

---

## Button States

```
Normal:
┌─────────────┐
│ Login       │ (Red background)
└─────────────┘

Hover:
┌─────────────┐
│ Login       │ (Darker red, slight scale up)
└─────────────┘

Loading:
┌──────────────────┐
│ ⟳ Logging in...  │ (Disabled, opacity 50%)
└──────────────────┘

Disabled:
┌─────────────┐
│ Login       │ (Gray, 50% opacity)
└─────────────┘
```

---

## Success/Error Messages

### Success (Green):
```
╔════════════════════════════════════╗
║ ✓ Registration successful!         ║
║   Redirecting to login...          ║
╚════════════════════════════════════╝
```

### Error (Red):
```
╔════════════════════════════════════╗
║ ✗ Email already registered         ║
╚════════════════════════════════════╝
```

### Info (Blue):
```
╔════════════════════════════════════╗
║ ℹ Demo: demo@example.com           ║
╚════════════════════════════════════╝
```

---

## Accessibility Features

```
✅ Form labels for all inputs
✅ Error messages linked to fields
✅ Keyboard navigation support
✅ Password visibility toggle
✅ ARIA labels (ready to add)
✅ Semantic HTML structure
✅ Sufficient color contrast
✅ Focus indicators on buttons
```

---

**Visual Guide Created:** December 4, 2025
