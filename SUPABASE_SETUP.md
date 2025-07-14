# Supabase Setup Checklist

## ✅ Completed Steps:
- [x] Environment variables configured
- [x] Database tables created
- [x] Authentication components built
- [x] Development server running
- [x] Fixed supabaseAdmin client issue
- [x] Image upload functionality implemented
- [x] Gallery display component created

## 🔧 Required Supabase Configuration:

### 1. Run the SQL Script:
1. Go to your Supabase dashboard: https://supabase.com/dashboard/project/yqjvpaswwxjlrlrkqcjt
2. Navigate to **Database > SQL Editor**
3. Copy and paste the entire contents of `supabase-setup.sql`
4. Click **Run** to execute the script

### 2. Create Storage Bucket:
1. Go to **Storage** in the Supabase dashboard
2. Create a new bucket named `gallery-images`
3. Set it to **Public** (so images can be viewed)
4. The SQL script should have created the bucket automatically, but verify it exists

### 3. Enable Email Authentication:
1. Go to your Supabase dashboard: https://supabase.com/dashboard/project/yqjvpaswwxjlrlrkqcjt
2. Navigate to **Authentication > Settings**
3. Under **Auth Providers**, make sure **Email** is enabled
4. Configure the following settings:
   - ✅ Enable email confirmations (recommended)
   - ✅ Enable secure email change (recommended)

### 2. Configure Email Templates (Optional):
1. Go to **Authentication > Email Templates**
2. Customize the confirmation and recovery email templates

### 3. Set up Row Level Security (RLS):
The SQL script should have already enabled RLS, but verify:
1. Go to **Database > Tables**
2. Check that `users` and `images` tables have RLS enabled
3. Verify that policies are in place

## 🧪 Testing the Gallery Application:

### Test Steps:
1. Open http://localhost:3003
2. Try to sign up with a test email
3. Check your email for confirmation (if enabled)
4. Try to sign in
5. Verify you see the dashboard with upload functionality
6. Test image upload by selecting an image file
7. Verify the image appears in the gallery
8. Test image deletion by hovering over an image and clicking delete

### Expected Behavior:
- ✅ Unauthenticated users see login form
- ✅ Successful signup/login redirects to dashboard
- ✅ Error messages appear for invalid credentials
- ✅ Upload component allows selecting images
- ✅ Images are uploaded to Supabase Storage
- ✅ Images appear in the gallery grid
- ✅ Images can be deleted
- ✅ Sign out button works

## 🐛 Troubleshooting:

### Common Issues:
1. **"Invalid API key"** - Check environment variables
2. **"Email not confirmed"** - Check email or disable email confirmation
3. **"Network error"** - Check Supabase project is active
4. **"RLS policy violation"** - Check database policies
5. **"Storage bucket not found"** - Ensure gallery-images bucket exists and is public
6. **"supabaseKey is required"** - Fixed: supabaseAdmin now only runs server-side

### Debug Steps:
1. Check browser console for errors
2. Check Supabase dashboard > Authentication > Users
3. Check Supabase dashboard > Storage > gallery-images
4. Check Supabase dashboard > Database > images table
5. Verify environment variables are loaded correctly
