# 🚀 Deployment Guide: Vercel + Railway

## **Overview**
This guide will help you deploy your Forsa Analytics website using:
- **Frontend**: Vercel (React + Vite)
- **Backend**: Railway (Express.js API)
- **Custom Domain**: Your purchased domain

## **Phase 1: Deploy Backend to Railway**

### **Step 1: Prepare Railway Account**
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Create a new project

### **Step 2: Deploy Backend**
1. **Connect GitHub Repository**:
   - Click "Deploy from GitHub repo"
   - Select your repository
   - Choose the `contact-backend` folder

2. **Set Environment Variables**:
   - Go to Variables tab
   - Add these variables:
     ```
     GMAIL_USER=your-email@gmail.com
     GMAIL_PASS=your-gmail-app-password
     ```

3. **Deploy**:
   - Railway will automatically build and deploy
   - Note the generated URL (e.g., `https://your-app.up.railway.app`)

### **Step 3: Test Backend**
1. Visit your Railway URL
2. You should see: `{"status": "OK", "message": "Contact API is running"}`
3. Test the email endpoint with Postman or similar tool

## **Phase 2: Deploy Frontend to Vercel**

### **Step 1: Prepare Vercel Account**
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Import your repository

### **Step 2: Configure Build Settings**
1. **Framework Preset**: Vite
2. **Root Directory**: `vite-react`
3. **Build Command**: `npm run build`
4. **Output Directory**: `dist`
5. **Install Command**: `npm install`

### **Step 3: Update API Endpoint**
1. In your Railway dashboard, copy the backend URL
2. Update `vite-react/src/components/Contact.jsx`:
   ```javascript
   const response = await fetch('YOUR_RAILWAY_URL/send-email', {
   ```

### **Step 4: Deploy**
1. Click "Deploy"
2. Vercel will build and deploy your React app
3. Note the generated URL (e.g., `https://your-app.vercel.app`)

## **Phase 3: Connect Custom Domain**

### **Step 1: Configure Vercel Domain**
1. Go to your Vercel project dashboard
2. Click "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

### **Step 2: Configure Railway Domain (Optional)**
1. Go to your Railway project
2. Click "Settings" → "Domains"
3. Add a subdomain (e.g., `api.yourdomain.com`)

### **Step 3: Update Frontend API Call**
1. If you added a custom domain to Railway, update the API endpoint
2. Redeploy your frontend

## **Phase 4: Environment Variables**

### **Frontend (Vercel)**
No environment variables needed for basic deployment

### **Backend (Railway)**
```
GMAIL_USER=your-email@gmail.com
GMAIL_PASS=your-gmail-app-password
```

## **Phase 5: Testing**

### **Test Frontend**
1. Visit your custom domain
2. Navigate to contact form
3. Fill out and submit the form

### **Test Backend**
1. Check Railway logs for any errors
2. Verify email is received
3. Test API endpoint directly

## **Troubleshooting**

### **Common Issues**
1. **CORS Errors**: Backend is configured with CORS
2. **Build Failures**: Check package.json scripts
3. **Environment Variables**: Ensure they're set in Railway
4. **Domain Issues**: DNS propagation can take 24-48 hours

### **Useful Commands**
```bash
# Test backend locally
cd contact-backend
npm install
npm start

# Test frontend locally
cd vite-react
npm install
npm run dev
```

## **Costs**
- **Vercel**: Free tier (100GB bandwidth/month)
- **Railway**: Free tier (500 hours/month)
- **Custom Domain**: ~$10-15/year (domain registrar)

## **Support**
- **Vercel**: [vercel.com/docs](https://vercel.com/docs)
- **Railway**: [docs.railway.app](https://docs.railway.app)
- **GitHub**: Your repository issues

---

**🎉 Congratulations!** Your website is now live with a custom domain!
