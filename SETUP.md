# ⚡ Quick Setup Guide - 361Degustation

This is a quick start guide to get your 361Degustation website running locally in minutes.

---

## 🎯 Prerequisites

Make sure you have these installed:
- **Node.js** v18+ ([Download](https://nodejs.org/))
- **MongoDB** ([Download](https://www.mongodb.com/try/download/community)) OR [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) account
- **Git** ([Download](https://git-scm.com/))

---

## 🚀 Quick Start (5 Minutes)

### 1. Clone and Install

```bash
# Clone the repository
cd 361DE

# Install dependencies
npm install
```

### 2. Setup Environment Variables

Create `.env.local` file in the root directory:

```env
# MongoDB (choose one)
# Option A - Local MongoDB:
MONGODB_URI=mongodb://localhost:27017/361degustation

# Option B - MongoDB Atlas (free cloud):
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/361degustation

# NextAuth (generate with: openssl rand -base64 32)
NEXTAUTH_SECRET=your-generated-secret-here
NEXTAUTH_URL=http://localhost:3000

# Stripe Test Keys (get from https://dashboard.stripe.com/test/apikeys)
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_your_public_key
STRIPE_SECRET_KEY=sk_test_your_secret_key

# Email (use Gmail App Password)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### 3. Setup Database

**Option A - Local MongoDB:**
```bash
# Start MongoDB
mongod

# In a new terminal, seed the database
npm run seed
```

**Option B - MongoDB Atlas:**
```bash
# Just seed the database (it will connect to Atlas)
npm run seed
```

This creates:
- ✅ 20+ sample sushi products
- ✅ Admin account: `admin@361degustation.com` / `Admin@361!`

### 4. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

## 🔑 Default Credentials

**Admin Account:**
- Email: `admin@361degustation.com`
- Password: `Admin@361!`

**Stripe Test Cards:**
- Success: `4242 4242 4242 4242`
- Expiry: Any future date
- CVC: Any 3 digits

---

## 📦 What's Included?

After setup, you'll have:

- ✅ Beautiful landing page
- ✅ Full menu with 20+ products
- ✅ Shopping cart
- ✅ Stripe checkout
- ✅ User authentication
- ✅ Order tracking
- ✅ Admin dashboard
- ✅ Email notifications
- ✅ Gallery & additional pages

---

## 🛠️ Detailed Setup Steps

### Step 1: Get Stripe Test Keys

1. Sign up at [Stripe](https://stripe.com)
2. Go to [Developers > API Keys](https://dashboard.stripe.com/test/apikeys)
3. Copy **Test** keys (not live keys!)
4. Add to `.env.local`

### Step 2: Get Gmail App Password

1. Enable 2FA on your Gmail account
2. Go to [App Passwords](https://myaccount.google.com/apppasswords)
3. Create app password for "Mail"
4. Use this password (not your regular Gmail password)
5. Add to `.env.local`

### Step 3: MongoDB Atlas Setup (Optional)

If you don't want to install MongoDB locally:

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Create database user
4. Whitelist IP: `0.0.0.0/0` (allow all)
5. Get connection string
6. Add to `.env.local` as `MONGODB_URI`

### Step 4: Generate NEXTAUTH_SECRET

```bash
# On Mac/Linux:
openssl rand -base64 32

# On Windows (PowerShell):
[Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Maximum 256 }))
```

Copy the output and add to `.env.local`

---

## 🎨 Customization

### Change Colors

Edit `tailwind.config.js`:

```javascript
colors: {
  primary: '#1a1a1a',      // Change this
  accent: {
    red: '#dc2626',        // Change this
    gold: '#d4af37',       // Change this
  },
}
```

### Add Your Logo

Replace text logo in `components/layout/Navbar.tsx` with an image:

```tsx
<Image 
  src="/logo.png" 
  alt="361Degustation" 
  width={150} 
  height={50} 
/>
```

### Update Restaurant Info

Edit `components/layout/Footer.tsx` with your:
- Address
- Phone number
- Email
- Hours

---

## 📱 Testing the Website

### Test User Flow

1. **Browse Products**
   - Visit `/menu`
   - Filter by category
   - View product details

2. **Add to Cart**
   - Add items to cart
   - Update quantities
   - View cart at `/cart`

3. **Create Account**
   - Go to `/auth/register`
   - Create a test account

4. **Checkout**
   - Proceed to checkout
   - Choose delivery/pickup
   - Use test card: `4242 4242 4242 4242`
   - Complete payment

5. **Track Order**
   - Check email for confirmation
   - View order at `/orders`
   - See order details

### Test Admin Flow

1. **Login as Admin**
   - Go to `/auth/signin`
   - Email: `admin@361degustation.com`
   - Password: `Admin@361!`

2. **Manage Products**
   - Go to `/admin/products`
   - Add new product
   - Edit existing product
   - Toggle availability

3. **Manage Orders**
   - Go to `/admin/orders`
   - Update order status
   - View order details

---

## 🐛 Common Issues

### MongoDB Connection Error

**Error:** `Failed to connect to MongoDB`

**Solutions:**
- Make sure MongoDB is running: `mongod`
- Check `MONGODB_URI` in `.env.local`
- For Atlas, check network access allows your IP

### Stripe Payment Fails

**Error:** `No API key provided`

**Solutions:**
- Check `STRIPE_SECRET_KEY` in `.env.local`
- Make sure you're using **test** keys
- Restart dev server after adding env vars

### Email Not Sending

**Error:** `Invalid login`

**Solutions:**
- Use App Password, not regular Gmail password
- Enable 2FA on Gmail first
- Check `EMAIL_USER` and `EMAIL_PASS`

### Port Already in Use

**Error:** `Port 3000 is already in use`

**Solutions:**
```bash
# Kill process on port 3000
# Mac/Linux:
lsof -ti:3000 | xargs kill -9

# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or use different port:
npm run dev -- -p 3001
```

---

## 📚 Project Structure

```
361DE/
├── app/                  # Next.js pages and API routes
│   ├── page.tsx         # Landing page
│   ├── menu/            # Menu page
│   ├── cart/            # Cart page
│   ├── checkout/        # Checkout
│   ├── orders/          # Order tracking
│   ├── admin/           # Admin dashboard
│   └── api/             # API endpoints
├── components/          # React components
├── models/              # Database models
├── lib/                 # Utilities
├── store/               # State management
├── scripts/             # Database seeds
├── .env.local          # Environment variables
└── package.json        # Dependencies
```

---

## 🎓 Next Steps

After local setup:

1. **Customize Content**
   - Update "Our Story" page
   - Add your own products
   - Replace sample images

2. **Configure Email**
   - Setup custom email domain
   - Customize email templates

3. **Test Thoroughly**
   - Test all user flows
   - Test on mobile devices
   - Test payment processing

4. **Deploy to Production**
   - See `DEPLOYMENT.md` for details
   - Deploy to Vercel
   - Configure custom domain

---

## 🆘 Need Help?

- 📖 **Full Documentation:** See `README.md`
- 🚀 **Deployment Guide:** See `DEPLOYMENT.md`
- 🐛 **Issues:** Create an issue on GitHub
- 💬 **Questions:** Contact info@361degustation.com

---

## ✅ Setup Checklist

- [ ] Node.js installed
- [ ] Repository cloned
- [ ] Dependencies installed (`npm install`)
- [ ] `.env.local` created with all variables
- [ ] MongoDB running (or Atlas configured)
- [ ] Database seeded (`npm run seed`)
- [ ] Dev server started (`npm run dev`)
- [ ] Website accessible at http://localhost:3000
- [ ] Can login with admin credentials
- [ ] Test payment completes successfully

---

<div align="center">
  <h2>🍱 You're All Set!</h2>
  <p>Start building your premium sushi restaurant website!</p>
</div>

