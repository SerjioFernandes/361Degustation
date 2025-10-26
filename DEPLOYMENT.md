# 🚀 Deployment Guide - 361Degustation

This guide will help you deploy your 361Degustation website to production.

---

## 📋 Pre-Deployment Checklist

Before deploying, ensure you have:

- ✅ All features tested locally
- ✅ MongoDB Atlas account set up
- ✅ Stripe live API keys
- ✅ Production email account configured
- ✅ Domain name (optional but recommended)
- ✅ All environment variables ready

---

## 🌐 Deploy to Vercel (Recommended)

Vercel is the easiest and most recommended deployment platform for Next.js applications.

### Step 1: Prepare Your Repository

```bash
# Initialize git if not already done
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - 361Degustation"

# Push to GitHub
git remote add origin <your-github-repo-url>
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to [Vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repository
4. Configure your project:
   - **Framework Preset:** Next.js
   - **Root Directory:** `./`
   - **Build Command:** `next build`
   - **Output Directory:** `.next`

### Step 3: Add Environment Variables

In Vercel dashboard, go to **Settings > Environment Variables** and add:

```env
# MongoDB (IMPORTANT: Use MongoDB Atlas, not localhost!)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/361degustation

# NextAuth
NEXTAUTH_SECRET=<generate-new-secret-with-openssl-rand-base64-32>
NEXTAUTH_URL=https://your-domain.vercel.app

# Stripe (IMPORTANT: Use LIVE keys for production!)
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=pk_live_your_live_public_key
STRIPE_SECRET_KEY=sk_live_your_live_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Email
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### Step 4: Deploy!

Click **Deploy** and wait for the build to complete. Your site will be live at `https://your-project.vercel.app`

---

## 🗄️ MongoDB Atlas Setup

### Create a Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up or sign in
3. Click "Build a Database"
4. Choose **FREE** shared cluster
5. Select a region close to your users
6. Click "Create Cluster"

### Configure Database Access

1. Go to **Database Access**
2. Click "Add New Database User"
3. Create username and password (save these!)
4. Set privileges to "Read and write to any database"

### Configure Network Access

1. Go to **Network Access**
2. Click "Add IP Address"
3. For Vercel deployment, click "Allow Access from Anywhere" (0.0.0.0/0)
   - ⚠️ This is safe because authentication is still required
   - For extra security, you can add Vercel's IP ranges

### Get Connection String

1. Go to **Database > Connect**
2. Choose "Connect your application"
3. Copy the connection string
4. Replace `<password>` with your database user password
5. Replace `<dbname>` with `361degustation`

Example:
```
mongodb+srv://admin:MyPassword123@cluster0.xxxxx.mongodb.net/361degustation
```

### Seed Production Database

After deployment, run the seed script once:

```bash
# Install MongoDB tools
npm install -g mongodb

# Or use the seed script with production URI
MONGODB_URI=<your-atlas-uri> npx ts-node scripts/seed.ts
```

---

## 💳 Stripe Production Setup

### Get Live API Keys

1. Go to [Stripe Dashboard](https://dashboard.stripe.com)
2. Complete your account setup (business info, banking details)
3. Switch to **Live mode** (toggle in dashboard)
4. Go to **Developers > API keys**
5. Copy your **Live** keys:
   - **Publishable key** (starts with `pk_live_`)
   - **Secret key** (starts with `sk_live_`)

### Setup Webhooks (Important!)

Webhooks allow Stripe to notify your app about payment events:

1. Go to **Developers > Webhooks**
2. Click "Add endpoint"
3. Set endpoint URL: `https://your-domain.vercel.app/api/webhooks/stripe`
4. Select events to listen to:
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
5. Copy the **Signing secret** (starts with `whsec_`)

### Test Live Payments

⚠️ **Important:** In live mode, only real credit cards work. Test cards won't work!

To test without actual charges:
1. Use your own credit card
2. Immediately refund the payment in Stripe dashboard

---

## 📧 Production Email Setup

### Gmail Setup

1. **Enable 2-Factor Authentication**
   - Go to Google Account settings
   - Security > 2-Step Verification

2. **Generate App Password**
   - Go to [App Passwords](https://myaccount.google.com/apppasswords)
   - Select "Mail" and your device
   - Copy the generated password
   - Use this as `EMAIL_PASS` in environment variables

### Alternative: SendGrid (Professional Option)

For high-volume emails, consider using SendGrid:

1. Sign up at [SendGrid.com](https://sendgrid.com)
2. Get API key
3. Update `lib/email.ts` to use SendGrid instead of Nodemailer

---

## 🔐 Security Best Practices

### Environment Variables

- ✅ Never commit `.env.local` to git
- ✅ Use different secrets for production
- ✅ Generate new `NEXTAUTH_SECRET` for production:
  ```bash
  openssl rand -base64 32
  ```

### Database Security

- ✅ Use strong database passwords
- ✅ Limit network access when possible
- ✅ Enable MongoDB encryption at rest
- ✅ Regularly backup your database

### API Keys

- ✅ Keep Stripe keys secret
- ✅ Use environment variables, never hardcode
- ✅ Rotate keys if compromised
- ✅ Monitor Stripe dashboard for suspicious activity

---

## 🌍 Custom Domain Setup

### Add Custom Domain to Vercel

1. Go to your project in Vercel
2. Click **Settings > Domains**
3. Add your domain (e.g., `361degustation.com`)
4. Follow DNS configuration instructions

### Update Environment Variables

After adding custom domain, update:
```env
NEXTAUTH_URL=https://361degustation.com
```

### Configure DNS

Add these DNS records (at your domain registrar):

**For root domain:**
```
Type: A
Name: @
Value: 76.76.21.21
```

**For www subdomain:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

---

## 📊 Monitoring & Maintenance

### Vercel Analytics

Enable Vercel Analytics for insights:
1. Go to **Analytics** in Vercel dashboard
2. Enable Web Analytics
3. View real-time traffic and performance

### Error Tracking

Consider adding error tracking:
- [Sentry](https://sentry.io) - Error monitoring
- [LogRocket](https://logrocket.com) - Session replay

### Regular Backups

**MongoDB Atlas Backups:**
1. Go to **Backup** in Atlas dashboard
2. Configure automated backups
3. Set retention period

### Updates

Keep dependencies updated:
```bash
# Check for updates
npm outdated

# Update dependencies
npm update

# Update Next.js
npm install next@latest react@latest react-dom@latest
```

---

## 🐛 Troubleshooting Production Issues

### Build Fails on Vercel

**Error:** TypeScript errors
```bash
# Fix locally first
npm run build

# Check for errors
npm run lint
```

### Database Connection Fails

**Error:** "MongoServerError: Authentication failed"
- ✅ Check username and password in connection string
- ✅ Verify database user has correct permissions
- ✅ Check if IP is whitelisted in Network Access

### Stripe Webhooks Not Working

**Error:** Payment succeeds but order not created
- ✅ Verify webhook endpoint URL is correct
- ✅ Check webhook signing secret matches
- ✅ View webhook logs in Stripe dashboard

### Emails Not Sending

**Error:** "Invalid login"
- ✅ Use App Password, not regular Gmail password
- ✅ Verify EMAIL_USER and EMAIL_PASS are correct
- ✅ Check if 2FA is enabled on Gmail

### CORS Errors

**Error:** "CORS policy blocked"
- ✅ Ensure NEXTAUTH_URL matches your domain exactly
- ✅ Check that domain is configured in Vercel
- ✅ Verify SSL certificate is active

---

## 🎉 Post-Deployment

### Test Everything

- ✅ Browse menu
- ✅ Add items to cart
- ✅ Complete checkout with test payment
- ✅ Check order confirmation email
- ✅ View order in user account
- ✅ Test admin dashboard
- ✅ Update order status
- ✅ Add/edit products

### Launch Checklist

- ✅ All features working
- ✅ Mobile responsive
- ✅ SEO meta tags present
- ✅ SSL certificate active (https)
- ✅ Error pages customized
- ✅ Analytics enabled
- ✅ Social media links updated
- ✅ Contact information correct

---

## 📈 Scaling Tips

As your business grows:

1. **Upgrade MongoDB Plan**
   - More storage and bandwidth
   - Better performance

2. **Use CDN for Images**
   - Cloudinary or AWS S3
   - Faster image loading

3. **Enable Caching**
   - Vercel Edge Network
   - Redis for sessions

4. **Monitor Performance**
   - Vercel Analytics
   - Google PageSpeed Insights

---

## 🆘 Support Resources

- **Vercel Documentation:** https://vercel.com/docs
- **Next.js Documentation:** https://nextjs.org/docs
- **MongoDB Atlas Support:** https://www.mongodb.com/cloud/atlas/support
- **Stripe Documentation:** https://stripe.com/docs

---

## 🎯 Production Checklist

Before going live:

- [ ] MongoDB Atlas configured
- [ ] All environment variables set in Vercel
- [ ] Stripe live keys added
- [ ] Email service working
- [ ] Database seeded with products
- [ ] Admin account created
- [ ] Custom domain configured (optional)
- [ ] SSL/HTTPS enabled
- [ ] All pages tested
- [ ] Mobile responsiveness verified
- [ ] Payment flow tested
- [ ] Email confirmations working
- [ ] Analytics enabled
- [ ] Backups configured

---

<div align="center">
  <h2>🚀 Ready to Launch!</h2>
  <p>Your 361Degustation website is now live and ready to serve customers!</p>
</div>

