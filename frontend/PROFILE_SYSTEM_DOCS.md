# User Profile System Documentation

## Overview
A complete user profile and account management system for the e-commerce application with all essential features for managing user information, addresses, orders, and preferences.

## Components Created

### 1. **ProfilePage** (`/src/pages/ProfilePage.jsx`)
The main profile page component with a tabbed interface.

#### Features:
- **Overview Tab**: Display and manage personal information
- **Addresses Tab**: Manage multiple delivery addresses
- **Orders Tab**: View order history and status
- **Preferences Tab**: Manage notification preferences

#### File Information:
```
- Path: /src/pages/ProfilePage.jsx
- Route: /profile
- Navbar Integration: Profile icon navigates to /profile
```

#### Key Features:
✅ Profile card with avatar/initials
✅ Personal information display
✅ Edit profile button
✅ Tab-based navigation
✅ Responsive design for all devices
✅ Smooth animations with Framer Motion

---

### 2. **EditProfileForm** (`/src/components/EditProfileForm.jsx`)
Modal form component for editing user profile information.

#### Fields:
- First Name *
- Last Name *
- Email Address *
- Phone Number *
- Date of Birth *
- Gender *

#### Validations:
```javascript
- First/Last Name: Required
- Email: Required + Valid email format
- Phone: Required + Valid phone format (10+ digits)
- Date of Birth: Required
- Gender: Required (Male/Female/Other)
```

#### Features:
✅ Form validation with error messages
✅ Real-time error clearing on input
✅ Success notification after update
✅ Modal dialog with backdrop
✅ Cancel and Update buttons
✅ Data persists in Zustand store

---

### 3. **AddressCard** (`/src/components/AddressCard.jsx`)
Component for displaying and managing individual addresses.

#### Address Fields:
- Label (Home/Work/Other) *
- Street Address *
- City *
- State *
- Zip Code (6 digits) *
- Country *
- Default Address (checkbox)

#### Features:
✅ Add new address button
✅ Edit existing addresses
✅ Delete addresses with confirmation
✅ Set default address
✅ Form validation
✅ Default address badge
✅ Inline editing mode

---

## Zustand Store Updates

### User State Structure:
```javascript
user: {
  id: "user_001",
  firstName: "Chandan",
  lastName: "Gowda",
  email: "chandan@example.com",
  phone: "+91 9876543210",
  profileImage: null,
  dateOfBirth: "1995-05-15",
  gender: "Male",
  createdAt: new Date().toISOString(),
  addresses: [
    {
      id: 1,
      label: "Home",
      street: "123 Main Street",
      city: "Bangalore",
      state: "Karnataka",
      zipCode: "560001",
      country: "India",
      isDefault: true,
    },
  ],
  preferences: {
    newsletter: true,
    smsNotifications: false,
    emailNotifications: true,
  },
  orderHistory: [
    {
      id: "ORD001",
      date: "2024-11-20",
      total: 5999,
      status: "Delivered",
      items: 3,
    },
  ],
}
```

### New Store Actions:

#### 1. Update Profile
```javascript
const updateUserProfile = useStore((state) => state.updateUserProfile);
updateUserProfile({
  firstName: "New Name",
  email: "newemail@example.com"
});
```

#### 2. Add Address
```javascript
const addUserAddress = useStore((state) => state.addUserAddress);
addUserAddress({
  label: "Work",
  street: "456 Office Street",
  city: "Bangalore",
  state: "Karnataka",
  zipCode: "560025",
  country: "India",
  isDefault: false,
});
```

#### 3. Update Address
```javascript
const updateUserAddress = useStore((state) => state.updateUserAddress);
updateUserAddress(addressId, { city: "Mumbai", state: "Maharashtra" });
```

#### 4. Remove Address
```javascript
const removeUserAddress = useStore((state) => state.removeUserAddress);
removeUserAddress(addressId);
```

#### 5. Update Preferences
```javascript
const updateUserPreferences = useStore((state) => state.updateUserPreferences);
updateUserPreferences({ newsletter: false, smsNotifications: true });
```

---

## Routes

Add to your `App.jsx`:
```javascript
import ProfilePage from "./pages/ProfilePage";

<Route path="/profile" element={<ProfilePage />} />
```

---

## Styling & Design

### Theme:
- **Background**: Black with white/red accents
- **Primary Color**: Red (#EF4444)
- **Text Colors**: White, Gray-400
- **Effects**: Backdrop blur, glassmorphism, smooth transitions

### Responsive Breakpoints:
- Mobile: Full width with stacked layout
- Tablet: 2-column layout for some sections
- Desktop: Full grid and sidebar layouts

### Component Features:
✅ Smooth Framer Motion animations
✅ Hover effects and transitions
✅ Loading states
✅ Error boundaries
✅ Accessible form inputs
✅ Mobile-first design

---

## Usage Examples

### Display Profile Information
```jsx
import ProfilePage from "./pages/ProfilePage";
import { useNavigate } from "react-router-dom";

// In your navigation
<button onClick={() => navigate("/profile")}>
  My Profile
</button>
```

### Access User Data in Components
```jsx
import useStore from "../store/useStore";

const user = useStore((state) => state.user);

// Access specific fields
const { firstName, email, addresses, preferences } = user;
```

### Update Profile Programmatically
```jsx
import useStore from "../store/useStore";

const updateUserProfile = useStore((state) => state.updateUserProfile);

const handleProfileUpdate = () => {
  updateUserProfile({
    firstName: "Updated Name",
    phone: "+91 9876543211"
  });
};
```

---

## Required Dependencies
Already installed in your project:
- `react` (v19.2.0)
- `react-router-dom` (v7.10.0)
- `zustand` (v5.0.9)
- `framer-motion` (v12.23.25)
- `react-icons` (v5.5.0)
- `tailwindcss` (v4.1.17)

---

## Features Summary

### Personal Profile
- ✅ View profile information
- ✅ Edit profile details
- ✅ Update personal information
- ✅ Profile image support (ready for implementation)
- ✅ Member since date display

### Address Management
- ✅ Add multiple addresses
- ✅ Edit addresses
- ✅ Delete addresses
- ✅ Set default address
- ✅ Address labels (Home/Work/Other)
- ✅ Full address validation

### Order History
- ✅ View past orders
- ✅ Order status display
- ✅ Order date and total
- ✅ Expandable order details (ready for implementation)

### Preferences
- ✅ Newsletter subscription toggle
- ✅ Email notifications toggle
- ✅ SMS notifications toggle
- ✅ Save preferences

### Data Persistence
- ✅ Zustand store management
- ✅ State updates across app
- ✅ Ready for backend API integration

---

## Future Enhancements

1. **Backend Integration**
   - Connect to API endpoints for data persistence
   - User authentication
   - Profile image upload

2. **Additional Features**
   - Password change form
   - Security/Privacy settings
   - Order tracking with real-time updates
   - Saved payment methods
   - Wishlist management
   - Reviews and ratings history

3. **Notifications**
   - Toast notifications for updates
   - Success/error messages
   - Confirmation dialogs

---

## Testing

### Manual Testing Checklist:
- [ ] Navigate to /profile from navbar
- [ ] View all tabs (Overview, Addresses, Orders, Preferences)
- [ ] Edit profile and verify updates
- [ ] Add new address
- [ ] Edit existing address
- [ ] Delete address with confirmation
- [ ] Set default address
- [ ] Toggle preference checkboxes
- [ ] Test form validation
- [ ] Test on mobile/tablet/desktop
- [ ] Verify animations work smoothly

---

## Support

For questions or issues, check:
1. Console errors
2. Zustand store state (Redux DevTools)
3. Network requests (if backend integrated)
4. Component props and state values

---

## File Structure
```
src/
├── pages/
│   └── ProfilePage.jsx          # Main profile page
├── components/
│   ├── EditProfileForm.jsx      # Profile edit modal
│   ├── AddressCard.jsx          # Address management card
│   └── Navbar.jsx               # Updated with profile link
└── store/
    └── useStore.js              # Updated with profile actions
```

---

Generated: December 4, 2025
Version: 1.0.0
