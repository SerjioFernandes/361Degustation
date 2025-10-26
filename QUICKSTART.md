# ⚡ 5-Minute Quick Start

Get 361Degustation running in 5 minutes!

## Step 1: Install Dependencies (1 min)

```bash
npm install
```

## Step 2: Create Environment File (2 min)

Create `.env.local` file with this content:

```env
# MongoDB
MONGODB_URI=mongodb://localhost:27017/361degustation

# NextAuth Secret (run: openssl rand -base64 32)
NEXTAUTH_SECRET=put-your-generated-secret-here
NEXTAUTH_URL=http://localhost:3000

# Stripe Test Keys (from https://dashboard.stripe.com/test/apikeys)
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_test_your_key_here
STRIPE_SECRET_KEY=sk_test_your_key_here

# Gmail (use app password from https://myaccount.google.com/apppasswords)
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password-here
```

## Step 3: Start MongoDB & Seed Database (1 min)

```bash
# Terminal 1: Start MongoDB
mongod

# Terminal 2: Seed database
npm run seed
```

This creates:
- ✅ Admin: `admin@361degustation.com` / `Admin@361!`
- ✅ 20+ sample products

## Step 4: Start Development Server (1 min)

```bash
npm run dev
```

## 🎉 Done!

Open [http://localhost:3000](http://localhost:3000)

**Test Card:** `4242 4242 4242 4242` (any future date, any CVC)

---

## ⚠️ Don't have time to setup services?

### Quick MongoDB (No Install)

Use MongoDB Atlas (free):
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Get connection string
4. Update `MONGODB_URI` in `.env.local`

### Quick Stripe (Test Mode)

1. Sign up at [Stripe](https://stripe.com)
2. Copy test keys from [Dashboard](https://dashboard.stripe.com/test/apikeys)
3. Add to `.env.local`

### Quick Email (Optional)

Skip email for now - orders will work, just no confirmation emails.

---

## 📖 Need More Details?

See `SETUP.md` for detailed instructions.

---

## 🆘 Quick Troubleshooting

**MongoDB Error?**
```bash
# Install MongoDB or use Atlas (see above)
```

**Stripe Error?**
```bash
# Check you added STRIPE_SECRET_KEY to .env.local
# Restart server: Ctrl+C then npm run dev
```

**Port 3000 in use?**
```bash
npm run dev -- -p 3001
```

---

## ✅ Quick Test

1. Visit http://localhost:3000
2. Browse menu at `/menu`
3. Add items to cart
4. Login with `admin@361degustation.com` / `Admin@361!`
5. Go to `/admin` to manage everything

**You're ready to go!** 🚀

