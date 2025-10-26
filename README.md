# 361Degustation - Premium Sushi Restaurant Website

<div align="center">
  <h1>🍣 361Degustation</h1>
  <p><strong>Beyond Perfection</strong></p>
  <p>A fully functional, production-ready website for a premium sushi restaurant with online ordering, delivery/pickup, and admin management.</p>
</div>

---

## 🌟 Features

### Customer Features
- ✨ **Beautiful Landing Page** with hero section and Japanese minimalist design
- 🍱 **Interactive Menu** with category filtering and detailed product views
- 🛒 **Shopping Cart** with real-time updates and item management
- 💳 **Stripe Payment Integration** for secure checkout
- 🚚 **Delivery & Pickup Options** with order tracking
- 👤 **User Authentication** (login/register)
- 📧 **Email Confirmations** for orders
- 📱 **Fully Responsive** design for all devices

### Admin Features
- 📊 **Admin Dashboard** for managing the restaurant
- 📦 **Order Management** with status updates
- 🍽️ **Product Management** (add, edit, delete menu items)
- 📈 **Real-time Order Tracking**

### Design
- 🎨 Modern Japanese aesthetic with black, white, red, and gold colors
- ⚡ Smooth animations and transitions with Framer Motion
- 🎯 SEO optimized with metadata
- ♿ Accessible and user-friendly

---

## 🛠️ Technology Stack

### Frontend
- **Next.js 14** (App Router)
- **React 18**
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (animations)
- **Zustand** (state management)

### Backend
- **Next.js API Routes**
- **MongoDB** with Mongoose
- **NextAuth.js** (authentication)
- **Stripe** (payments)
- **Nodemailer** (email notifications)

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB** (local or MongoDB Atlas)
- **Stripe Account** (for payments)
- **Email Account** (for notifications - Gmail recommended)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd 361DE
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory and add the following variables:

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/361degustation
# Or use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/361degustation

# NextAuth
NEXTAUTH_SECRET=your-secret-key-here
# Generate with: openssl rand -base64 32
NEXTAUTH_URL=http://localhost:3000

# Stripe
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_your_stripe_public_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Email (Gmail recommended)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
# Get app password from: https://myaccount.google.com/apppasswords

# Admin Credentials (default admin account)
ADMIN_EMAIL=admin@361degustation.com
ADMIN_PASSWORD=Admin@361!
```

### 4. Setup MongoDB

#### Option A: Local MongoDB
```bash
# Install MongoDB on your system
# macOS: brew install mongodb-community
# Windows: Download from mongodb.com
# Linux: Follow mongodb.com instructions

# Start MongoDB
mongod --dbpath /path/to/data/directory
```

#### Option B: MongoDB Atlas (Cloud)
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get your connection string
4. Update `MONGODB_URI` in `.env.local`

### 5. Setup Stripe

1. Create a [Stripe Account](https://stripe.com)
2. Get your **test** API keys from the Dashboard
3. Add them to `.env.local`

**Test Card Numbers:**
- Success: `4242 4242 4242 4242`
- Any future expiry date
- Any 3-digit CVC

### 6. Setup Email (Gmail)

1. Enable 2-Factor Authentication on your Gmail account
2. Generate an **App Password**: [Generate Here](https://myaccount.google.com/apppasswords)
3. Add your email and app password to `.env.local`

### 7. Seed the Database (Optional)

Run the seed script to add sample products and create an admin user:

```bash
npm run seed
```

This will create:
- 20+ sample sushi products
- An admin account (admin@361degustation.com / Admin@361!)

### 8. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Project Structure

```
361DE/
├── app/                      # Next.js App Router
│   ├── (pages)/
│   │   ├── page.tsx          # Landing page
│   │   ├── menu/             # Menu page
│   │   ├── cart/             # Shopping cart
│   │   ├── checkout/         # Checkout page
│   │   ├── orders/           # Order tracking
│   │   ├── story/            # Our Story page
│   │   ├── gallery/          # Gallery page
│   │   ├── contact/          # Contact page
│   │   ├── auth/             # Authentication pages
│   │   └── admin/            # Admin dashboard
│   ├── api/                  # API routes
│   │   ├── auth/             # NextAuth endpoints
│   │   ├── products/         # Product CRUD
│   │   ├── orders/           # Order management
│   │   └── payment/          # Stripe integration
│   ├── globals.css           # Global styles
│   └── layout.tsx            # Root layout
├── components/               # React components
│   ├── layout/              # Navbar, Footer
│   └── checkout/            # Checkout form
├── models/                   # MongoDB models
│   ├── User.ts
│   ├── Product.ts
│   └── Order.ts
├── lib/                      # Utility functions
│   ├── mongodb.ts           # Database connection
│   └── email.ts             # Email service
├── store/                    # State management
│   └── cartStore.ts         # Shopping cart state
├── types/                    # TypeScript types
├── public/                   # Static assets
├── .env.local               # Environment variables
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.js
```

---

## 🎯 Key Pages

| Page | Route | Description |
|------|-------|-------------|
| **Landing** | `/` | Hero section, features, specials, testimonials |
| **Menu** | `/menu` | Browse products with filtering and search |
| **Cart** | `/cart` | View and manage cart items |
| **Checkout** | `/checkout` | Complete order with Stripe payment |
| **Orders** | `/orders` | Track order status |
| **Order Detail** | `/orders/[id]` | View specific order details |
| **Our Story** | `/story` | Restaurant philosophy and history |
| **Gallery** | `/gallery` | Photo gallery of dishes |
| **Contact** | `/contact` | Contact form and information |
| **Sign In** | `/auth/signin` | User login |
| **Register** | `/auth/register` | Create account |
| **Admin Dashboard** | `/admin` | Admin overview |
| **Manage Orders** | `/admin/orders` | Update order statuses |
| **Manage Products** | `/admin/products` | CRUD operations for menu items |

---

## 👤 User Accounts

### Customer Account
After registering, customers can:
- Place orders
- Track order history
- Save delivery addresses
- Receive email confirmations

### Admin Account
**Default Admin:**
- Email: `admin@361degustation.com`
- Password: `Admin@361!`

Admin capabilities:
- View all orders
- Update order statuses
- Add/edit/delete products
- Manage inventory

---

## 💳 Testing Payments

Use Stripe's test card numbers:

| Card | Number | Result |
|------|--------|--------|
| **Success** | 4242 4242 4242 4242 | Payment succeeds |
| **Decline** | 4000 0000 0000 0002 | Card declined |
| **3D Secure** | 4000 0027 6000 3184 | Requires authentication |

- **Expiry:** Any future date
- **CVC:** Any 3 digits
- **ZIP:** Any valid ZIP code

---

## 📧 Email Notifications

Order confirmation emails are automatically sent to customers after successful payment. The email includes:
- Order number
- Itemized list
- Total amount
- Delivery/pickup information
- Estimated delivery time

---

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to change the color scheme:

```javascript
colors: {
  primary: '#1a1a1a',      // Black
  accent: {
    red: '#dc2626',        // Red
    gold: '#d4af37',       // Gold
  },
}
```

### Logo
Replace the logo text in `components/layout/Navbar.tsx` with an image if desired.

### Images
- Update product images in the admin panel
- Replace hero images in `app/page.tsx`
- Use your own gallery images in `app/gallery/page.tsx`

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Add environment variables in Vercel dashboard
5. Deploy!

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Environment Variables on Vercel
Add all variables from `.env.local` to your Vercel project settings.

### Important for Production:
- Use **MongoDB Atlas** (not local MongoDB)
- Use **live Stripe keys** (not test keys)
- Set `NEXTAUTH_URL` to your production domain
- Generate a new `NEXTAUTH_SECRET`

---

## 📝 Database Seed Data

The seed script creates sample products in these categories:
- **Nigiri** (Salmon, Tuna, Yellowtail, etc.)
- **Sashimi** (Premium cuts)
- **Maki Rolls** (California, Spicy Tuna, Dragon, etc.)
- **Special Rolls** (Chef's creations)
- **Appetizers** (Edamame, Gyoza, etc.)
- **Desserts** (Mochi, Green Tea Ice Cream)
- **Drinks** (Sake, Tea, Sodas)

---

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: Failed to connect to MongoDB
```
**Solution:** Ensure MongoDB is running and `MONGODB_URI` is correct.

### Stripe Payment Fails
```
Error: No API key provided
```
**Solution:** Check that `STRIPE_SECRET_KEY` is set correctly in `.env.local`.

### Email Not Sending
```
Error: Invalid login
```
**Solution:** 
- Use an App Password, not your regular Gmail password
- Enable "Less secure app access" (not recommended) OR use App Passwords

### NextAuth Error
```
Error: [next-auth][error][NO_SECRET]
```
**Solution:** Ensure `NEXTAUTH_SECRET` is set in `.env.local`.

---

## 📜 Scripts

```json
{
  "dev": "next dev",           // Start development server
  "build": "next build",       // Build for production
  "start": "next start",       // Start production server
  "lint": "next lint",         // Run ESLint
  "seed": "ts-node scripts/seed.ts"  // Seed database
}
```

---

## 🔐 Security

- Passwords are hashed with **bcryptjs**
- Authentication with **NextAuth.js**
- Secure payment processing with **Stripe**
- Environment variables for sensitive data
- HTTPS required in production

---

## 📄 License

This project is created for educational and commercial use.

---

## 🙏 Acknowledgments

- Design inspiration from modern Japanese aesthetics
- Food images from Unsplash
- Icons from React Icons
- Built with Next.js, React, and TypeScript

---

## 📞 Support

For issues or questions:
- **Email:** info@361degustation.com
- **GitHub Issues:** Create an issue in this repository

---

<div align="center">
  <h2>🍱 Beyond Perfection - 361Degustation</h2>
  <p>Built with ❤️ and precision</p>
</div>

