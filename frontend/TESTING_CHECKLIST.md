# 🧪 Complete Testing Checklist

## Before Testing
- [ ] Stop dev server (if running)
- [ ] Run `npm run dev`
- [ ] Wait for compilation to complete
- [ ] Open http://localhost:5173 (or your dev URL)
- [ ] Open browser DevTools (F12)

---

## Registration Testing

### Form Validation
- [ ] **First Name**
  - [ ] Empty → Shows error
  - [ ] 1 character → Shows error
  - [ ] Valid → No error
  
- [ ] **Last Name**
  - [ ] Empty → Shows error
  - [ ] 1 character → Shows error
  - [ ] Valid → No error

- [ ] **Email**
  - [ ] Empty → Shows error
  - [ ] Invalid format (no @) → Shows error
  - [ ] Invalid format (no .com) → Shows error
  - [ ] Valid format → No error

- [ ] **Password**
  - [ ] Empty → Shows error
  - [ ] Less than 6 chars → Shows error
  - [ ] No uppercase → Shows error
  - [ ] No lowercase → Shows error
  - [ ] No number → Shows error
  - [ ] Valid (Test123) → No error

- [ ] **Confirm Password**
  - [ ] Doesn't match password → Shows error
  - [ ] Matches password → No error

- [ ] **Phone**
  - [ ] Empty → Shows error
  - [ ] Less than 10 digits → Shows error
  - [ ] Valid (+91 9876543210) → No error

- [ ] **Date of Birth**
  - [ ] Empty → Shows error
  - [ ] Valid date → No error

- [ ] **Gender**
  - [ ] Not selected → Shows error
  - [ ] Selected (Male/Female/Other) → No error

- [ ] **Terms Checkbox**
  - [ ] Not checked → Shows error
  - [ ] Checked → No error

### Form Features
- [ ] **Password Visibility Toggle**
  - [ ] Click eye icon → Password shows as dots
  - [ ] Click eye icon again → Password visible as text
  
- [ ] **Confirm Password Visibility Toggle**
  - [ ] Works independently from password

- [ ] **Newsletter Checkbox**
  - [ ] Can check/uncheck without error

- [ ] **Clear on Input**
  - [ ] Typing in a field → Error for that field clears
  - [ ] But other errors remain

### Submission
- [ ] **Loading State**
  - [ ] Click "Create Account"
  - [ ] Button shows spinner and "Creating Account..."
  - [ ] Button is disabled during submission
  - [ ] Form fields are disabled
  
- [ ] **Success**
  - [ ] Green success message appears
  - [ ] "Redirecting to login..." appears
  - [ ] Redirected to /login after 1.5 seconds

- [ ] **Duplicate Email**
  - [ ] Register with new email (e.g., test@example.com)
  - [ ] Try registering again with same email
  - [ ] See error: "Email already registered"

### Navigation
- [ ] **To Login**
  - [ ] "Already have an account?" link works
  - [ ] Navigates to /login

- [ ] **Links in Terms**
  - [ ] "Terms and Conditions" link works
  - [ ] "Privacy Policy" link works

---

## Login Testing

### Form Validation
- [ ] **Email**
  - [ ] Empty → Shows error
  - [ ] Invalid format → Shows error
  - [ ] Valid → No error

- [ ] **Password**
  - [ ] Empty → Shows error
  - [ ] Less than 6 chars → Shows error
  - [ ] Valid → No error

### Form Features
- [ ] **Password Visibility Toggle**
  - [ ] Click eye → Password hidden (dots)
  - [ ] Click eye → Password visible

- [ ] **Remember Me Checkbox**
  - [ ] Can check/uncheck

- [ ] **Forgot Password Link**
  - [ ] Link is clickable (currently goes to /forgot-password)

### Submission with Demo Account
- [ ] **Valid Demo Credentials**
  - [ ] Email: demo@example.com
  - [ ] Password: demo123
  - [ ] Click Login
  - [ ] Shows loading spinner
  - [ ] Redirects to home page
  - [ ] User appears in navbar dropdown

- [ ] **Invalid Email**
  - [ ] Enter: notfound@example.com
  - [ ] Enter password: demo123
  - [ ] Click Login
  - [ ] See error: "Invalid email or password"

- [ ] **Invalid Password**
  - [ ] Email: demo@example.com
  - [ ] Password: wrongpass
  - [ ] Click Login
  - [ ] See error: "Invalid email or password"

- [ ] **Empty Fields**
  - [ ] Leave both empty
  - [ ] Click Login
  - [ ] See field validation errors

### Demo Notice
- [ ] **Blue Demo Box**
  - [ ] Visible on page
  - [ ] Shows correct demo credentials
  - [ ] "demo@example.com / demo123"

### Navigation
- [ ] **To Register**
  - [ ] "Don't have an account?" link works
  - [ ] Navigates to /register

- [ ] **Social Buttons**
  - [ ] Google button visible (ready for integration)
  - [ ] GitHub button visible (ready for integration)

---

## Authentication State Testing

### Session Persistence
- [ ] **Login and Refresh**
  - [ ] Login with demo account
  - [ ] Refresh page (F5)
  - [ ] Still logged in ✅
  - [ ] User still in navbar dropdown

- [ ] **Check LocalStorage**
  - [ ] Open DevTools → Application → Local Storage
  - [ ] Should see `authToken` entry
  - [ ] Should see `user` entry with JSON data

- [ ] **Multi-tab Test**
  - [ ] Login in tab 1
  - [ ] Open tab 2 to same site
  - [ ] Should be logged in automatically (localStorage shared)

### Session Expiry
- [ ] **Clear LocalStorage**
  - [ ] DevTools → Application → Local Storage → Clear
  - [ ] Refresh page
  - [ ] Should be logged out
  - [ ] Login/Signup buttons appear

### Logout Functionality
- [ ] **Logout Button**
  - [ ] Login first
  - [ ] Click user dropdown
  - [ ] See "Logout" option
  - [ ] Click Logout
  - [ ] Logged out successfully
  - [ ] Login/Signup buttons reappear
  - [ ] Redirected to home

- [ ] **LocalStorage Cleared**
  - [ ] After logout, check DevTools
  - [ ] `authToken` should be gone
  - [ ] `user` should be gone

---

## Navbar Testing

### Not Logged In State
- [ ] **Buttons Visible**
  - [ ] "Login" button visible
  - [ ] "Sign Up" button visible
  - [ ] Profile icon NOT visible
  - [ ] Cart icon visible

- [ ] **Login Button Click**
  - [ ] Goes to /login

- [ ] **Sign Up Button Click**
  - [ ] Goes to /register

### Logged In State
- [ ] **User Display**
  - [ ] User first name shows in dropdown trigger
  - [ ] Dropdown appears on click

- [ ] **Dropdown Menu**
  - [ ] Shows user's name
  - [ ] Shows user's email
  - [ ] Shows "My Profile" link
  - [ ] Shows "Logout" link

- [ ] **My Profile Link**
  - [ ] Click "My Profile"
  - [ ] Navigates to /profile
  - [ ] Shows profile page

- [ ] **Logout Link**
  - [ ] Click "Logout"
  - [ ] Logged out
  - [ ] Redirected to home
  - [ ] Login/Signup buttons appear

---

## UI/UX Testing

### Animations
- [ ] **Page Load**
  - [ ] Smooth fade-in animation
  - [ ] Background gradients appear
  - [ ] Content staggered animation

- [ ] **Button Hover**
  - [ ] Scale slightly up
  - [ ] Color changes to darker shade
  - [ ] Smooth transition

- [ ] **Input Focus**
  - [ ] Red outline appears
  - [ ] Subtle scale up

- [ ] **Error Messages**
  - [ ] Fade in smoothly
  - [ ] Red color
  - [ ] Below or next to field

- [ ] **Success Messages**
  - [ ] Slide down and fade in
  - [ ] Green color

### Responsiveness
- [ ] **Desktop (1920px+)**
  - [ ] All elements visible
  - [ ] Proper spacing
  - [ ] Forms centered
  - [ ] All features work

- [ ] **Laptop (1024-1920px)**
  - [ ] Forms readable
  - [ ] Buttons easy to click
  - [ ] No overflow
  - [ ] Good spacing

- [ ] **Tablet (768-1024px)**
  - [ ] Forms stack properly
  - [ ] Inputs are full width
  - [ ] Buttons are full width
  - [ ] Text readable
  - [ ] No horizontal scroll

- [ ] **Mobile (375-768px)**
  - [ ] Forms fit screen
  - [ ] Inputs full width
  - [ ] Buttons large enough to tap
  - [ ] Font sizes readable
  - [ ] No layout breaks
  - [ ] Proper margins

### Dark Theme
- [ ] **Colors**
  - [ ] Background is black
  - [ ] Text is white/light gray
  - [ ] Red accents visible
  - [ ] Good contrast

- [ ] **Backdrop Blur**
  - [ ] Cards have blur effect
  - [ ] Professional look
  - [ ] Text readable over blur

- [ ] **Gradients**
  - [ ] Background gradients visible
  - [ ] Button gradients work
  - [ ] Smooth color transitions

---

## Error Handling Testing

### Network Errors
- [ ] **When Backend Not Available**
  - [ ] Try to login
  - [ ] See appropriate error message
  - [ ] Form remains enabled for retry

- [ ] **Slow Network**
  - [ ] Loading spinner shows
  - [ ] User can wait
  - [ ] Times out if too long (network dependent)

### Form Errors
- [ ] **Multiple Errors**
  - [ ] Can have multiple fields with errors
  - [ ] Each shows its own error message
  - [ ] User can fix each field

- [ ] **Error Clearing**
  - [ ] Start typing in error field
  - [ ] Error message clears
  - [ ] Other errors remain

### API Errors
- [ ] **Duplicate Email**
  - [ ] Register → email already exists
  - [ ] See "Email already registered" error

- [ ] **Wrong Credentials**
  - [ ] Login with wrong password
  - [ ] See "Invalid email or password" error

---

## Browser Compatibility

- [ ] **Chrome/Edge**
  - [ ] All features work
  - [ ] No console errors
  
- [ ] **Firefox**
  - [ ] All features work
  - [ ] No console errors

- [ ] **Safari**
  - [ ] All features work
  - [ ] No console errors

---

## Console Checking

- [ ] **No Errors**
  - [ ] Open DevTools (F12)
  - [ ] Check Console tab
  - [ ] No red error messages

- [ ] **No Warnings**
  - [ ] No yellow warnings
  - [ ] (Some may be from dependencies - OK)

- [ ] **No Unhandled Rejections**
  - [ ] Check for "Uncaught" messages
  - [ ] None should appear

---

## Performance Testing

- [ ] **Page Load Time**
  - [ ] Login page loads quickly
  - [ ] Register page loads quickly
  - [ ] No long delays

- [ ] **Form Input Response**
  - [ ] Typing smooth
  - [ ] No lag
  - [ ] Validation instant

- [ ] **Navigation**
  - [ ] Page transitions smooth
  - [ ] No flashing/flickering

---

## Integration Testing

### With Existing App
- [ ] **Can Still Shop**
  - [ ] Add items to cart (while logged in)
  - [ ] Proceed to checkout

- [ ] **Profile Works**
  - [ ] Login
  - [ ] Go to /profile
  - [ ] Profile page loads
  - [ ] Can edit profile
  - [ ] Can manage addresses

- [ ] **Cart Integration**
  - [ ] Cart count shows
  - [ ] Can add to cart
  - [ ] Can view cart

---

## Final Sign-Off Checklist

- [ ] All registration fields validate
- [ ] Registration creates user successfully
- [ ] Login works with demo account
- [ ] Login fails appropriately with wrong credentials
- [ ] Session persists on page refresh
- [ ] Logout works and clears session
- [ ] Navbar shows correct state (logged in/out)
- [ ] All animations smooth
- [ ] Responsive on mobile/tablet/desktop
- [ ] No console errors
- [ ] Links work correctly
- [ ] Error messages clear
- [ ] Loading states show
- [ ] Success messages appear
- [ ] Can navigate between pages
- [ ] Profile page accessible when logged in
- [ ] All form validations work
- [ ] UI matches dark theme
- [ ] All icons display correctly
- [ ] Social buttons present (ready for integration)

---

## Sign-Off

**Tested by:** [Your Name]
**Date:** [Today's Date]
**Status:** ✅ Ready for Production / 🔧 Needs Fixes

**Notes:**
_List any issues found_

---

**Testing Checklist Version:** 1.0.0
**Created:** December 4, 2025
