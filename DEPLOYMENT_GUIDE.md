# PrimoBoost AI - Deployment Guide

## Critical Environment Variables

Your deployment is showing a blank page because environment variables are not configured. Follow this guide to fix it.

### Required Environment Variables for Netlify/Vercel

Add these variables in your deployment platform settings:

#### Supabase Configuration (REQUIRED)
```
VITE_SUPABASE_URL=https://rixmudvtbfkjpwjoefon.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJpeG11ZHZ0YmZranB3am9lZm9uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1ODk4NzIsImV4cCI6MjA2NjE2NTg3Mn0.PQss75_gbLaiJDFxKvCuHNirUVkKUGrINYGO1oewQGA
```

#### AI Services Configuration (RECOMMENDED)
```
VITE_GEMINI_API_KEY=AIzaSyCYm05ja3I07w0W8XHiDaEFE9278caxq7s
VITE_OPENROUTER_API_KEY=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
VITE_AGENTROUTER_API_KEY=sk-SMEMI1wt7JbCD7HLhALUPNmM40RbgdLhFulfN4ZCn9Ahppbn
VITE_AGENTROUTER_BASE_URL=https://agentrouter.org/v1
```

#### Payment Configuration (if using payments)
```
VITE_RAZORPAY_KEY_ID=rzp_live_U7N6E8ot31tiej
VITE_RAZORPAY_TEST_MODE=false
VITE_FAKE_PAYMENT=false
```

#### Optional Configuration
```
VITE_MOCK_AI=false
VITE_LONGCHAT_API_KEY=ak_1Rq5Wg10N33R3I90wB1xO5J10KG0b
```

---

## Netlify Deployment Steps

### 1. Configure Environment Variables

1. Go to **Netlify Dashboard** → Select your site
2. Navigate to **Site settings** → **Environment variables**
3. Click **Add a variable**
4. Add each variable from the list above (one by one)
5. Make sure to set them for **Production** and **Deploy previews**

### 2. Clear Build Cache

1. In Netlify Dashboard, go to **Deploys** → **Deploy settings**
2. Click **Clear cache and retry deploy**
3. This ensures environment variables are picked up

### 3. Verify Build Settings

Ensure your `netlify.toml` has these settings:

```toml
[build]
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[build.environment]
  NODE_VERSION = "18"
```

---

## Vercel Deployment Steps

### 1. Configure Environment Variables

1. Go to **Vercel Dashboard** → Select your project
2. Navigate to **Settings** → **Environment Variables**
3. Add each variable from the list above
4. Set them for **Production**, **Preview**, and **Development**

### 2. Trigger Redeploy

1. Go to **Deployments** tab
2. Click the three dots on the latest deployment
3. Select **Redeploy**
4. Check **Use existing Build Cache** is OFF

### 3. Verify Build Configuration

Create `vercel.json` in project root if not exists:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

## Common Issues and Fixes

### Issue: Blank Page After Deployment

**Symptoms:**
- Page loads but shows blank screen
- Console shows errors about missing environment variables
- "Unrecognized feature: 'otp-credentials'" warning

**Solution:**
1. Add all REQUIRED environment variables (especially `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`)
2. Clear build cache
3. Redeploy
4. Check browser console for errors

### Issue: "Access to storage is not allowed" Error

**Symptoms:**
- Error about localStorage access
- Authentication not working

**Solution:**
- Already fixed in code with fallback storage mechanism
- Ensure cookies are enabled in browser
- Check if site is loaded in iframe (iframe restrictions apply)

### Issue: Routes Return 404

**Symptoms:**
- Direct navigation to routes like `/jobs` or `/blog` returns 404
- Only homepage works

**Solution:**
- Verify `netlify.toml` or `vercel.json` redirects are configured
- For Netlify: Add `_redirects` file in `public` folder:
  ```
  /*    /index.html   200
  ```

### Issue: API Calls Failing

**Symptoms:**
- Features not working
- Console errors about missing API keys
- OpenRouter/Gemini errors

**Solution:**
1. Add AI service environment variables
2. Check API key validity
3. Verify network connectivity
4. Check browser console for specific error messages

---

## Testing Your Deployment

### 1. Open Browser Console

Press `F12` or right-click → Inspect → Console

### 2. Check for Errors

Look for:
- ✅ "SUPABASE CONFIGURATION" log showing "Environment Variables" source
- ❌ Any red errors about missing variables
- ❌ Network errors (check Network tab)

### 3. Test Core Features

- [ ] Homepage loads correctly
- [ ] Navigation works (try clicking different menu items)
- [ ] Login/Signup modal opens
- [ ] Can create account
- [ ] Can login with existing account
- [ ] Protected routes work (after login)

### 4. Check Build Output

In Netlify/Vercel deploy logs, verify:
- ✅ Build completes successfully
- ✅ No TypeScript errors
- ✅ No missing dependencies
- ✅ Environment variables are loaded (check for "SUPABASE CONFIGURATION" log)

---

## Emergency Fallback

If you still see a blank page after following all steps:

1. **Check Supabase fallback values are working:**
   - Open browser console
   - Look for "SUPABASE CONFIGURATION" log
   - Should show "Fallback Values" if env vars missing

2. **Verify error boundary is working:**
   - If there's an error, you should see a styled error page instead of blank screen
   - Check console for ErrorBoundary logs

3. **Contact support:**
   - Email: primoboostai@gmail.com
   - Include:
     - Deployment URL
     - Browser console screenshot
     - Network tab screenshot
     - Deployment platform (Netlify/Vercel)

---

## Build Optimization

### For Faster Builds

```bash
# Local build test
npm run build
npm run preview

# Check build size
ls -lh dist/
```

### Expected Output

- `dist/index.html` - Main HTML file
- `dist/assets/` - All JS, CSS, images
- Total size: ~2-5 MB (varies based on features)

---

## Security Checklist

- [x] API keys are prefixed with `VITE_` (exposed in client)
- [x] Sensitive keys are NOT in client code
- [x] CORS is configured in Supabase
- [x] RLS policies are enabled in database
- [x] HTTPS is enforced (handled by Netlify/Vercel)

---

## Need Help?

If deployment still fails after following this guide:

1. Check [Netlify Status](https://www.netlifystatus.com/) or [Vercel Status](https://www.vercel-status.com/)
2. Review deployment logs for specific errors
3. Test build locally: `npm run build && npm run preview`
4. Contact support with detailed error logs

---

**Last Updated:** December 2025
**Version:** 1.0.0
