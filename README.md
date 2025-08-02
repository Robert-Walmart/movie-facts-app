# Movie Facts Web App

A full-stack web application that allows users to sign in with Google OAuth, save their favorite movie, and discover interesting AI-generated facts about it.

## 🎬 Features

- **Google OAuth Authentication** - Secure sign-in with Google accounts
- **User Profile Display** - Shows user's name, email, and profile photo from Google
- **Favorite Movie Management** - First-time users can set their favorite movie
- **AI-Generated Movie Facts** - Uses OpenAI API to generate interesting facts about the user's favorite movie
- **Dynamic Content** - Get new movie facts on each page refresh
- **Protected Routes** - Automatic redirects for unauthenticated users
- **Responsive Design** - Works on desktop and mobile devices

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Styling**: Tailwind CSS
- **Authentication**: NextAuth.js with Google Provider
- **Database**: PostgreSQL with Prisma ORM
- **AI Integration**: OpenAI GPT-3.5-turbo API
- **Deployment**: Vercel-ready

## 📋 Prerequisites

Before running this application, make sure you have:

- Node.js 18+ installed
- PostgreSQL database (local or cloud)
- Google Cloud Console account
- OpenAI API account

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd movie-facts-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-here

# Google OAuth Credentials
GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Database
DATABASE_URL="postgresql://username:password@localhost:5432/moviefacts"

# OpenAI API
OPENAI_API_KEY=your-openai-api-key
```

### 4. Set Up Database

```bash
# Initialize Prisma
npx prisma generate

# Run database migrations
npx prisma migrate dev --name init

# (Optional) View your database
npx prisma studio
```

### 5. Run the Application

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## ⚙️ Configuration Guide

### Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API
4. Configure OAuth consent screen:
   - Set app name and developer email
   - Add test users (your email)
5. Create OAuth client credentials:
   - **Type**: Web application
   - **Authorized JavaScript origins**: `http://localhost:3000`
   - **Authorized redirect URIs**: `http://localhost:3000/api/auth/callback/google`
6. Copy Client ID and Client Secret to your `.env.local`

### OpenAI API Setup

1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Create an account and add billing information
3. Generate an API key
4. Add the key to your `.env.local` file

### Database Setup

#### Option 1: Local PostgreSQL
```bash
# Install PostgreSQL
# Create database
createdb moviefacts

# Update DATABASE_URL in .env.local
DATABASE_URL="postgresql://username:password@localhost:5432/moviefacts"
```

#### Option 2: Cloud Database (Recommended)
- **Vercel Postgres**: Easy integration with Vercel
- **Supabase**: Free tier with good PostgreSQL hosting
- **Railway**: Simple PostgreSQL hosting
- **Neon**: Serverless PostgreSQL

## 📁 Project Structure

```
movie-facts-app/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   ├── auth/[...nextauth]/   # NextAuth.js configuration
│   │   ├── movie-fact/           # Movie facts API
│   │   └── update-movie/         # Update favorite movie API
│   ├── login/                    # Login page
│   ├── Dashboard.tsx             # Main dashboard component
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Home page
├── components/                   # React components
│   ├── MovieModal.tsx            # Movie selection modal
│   └── SessionProvider.tsx       # NextAuth session provider
├── lib/                          # Utility libraries
│   ├── auth.ts                   # Authentication configuration
│   ├── openai.ts                 # OpenAI integration
│   └── prisma.ts                 # Prisma client
├── prisma/                       # Database schema and migrations
│   └── schema.prisma             # Database schema
├── .env.local                    # Environment variables (create this)
├── package.json                  # Dependencies
└── README.md                     # This file
```

## 🔒 Security Features

- **Environment Variables**: Sensitive data stored securely
- **Session Management**: Secure session handling with NextAuth.js
- **Protected Routes**: Server-side authentication checks
- **CSRF Protection**: Built-in CSRF protection
- **Secure Cookies**: HTTPOnly and Secure cookie flags

## 🧪 Testing

### Manual Testing Checklist

- [ ] Google OAuth login works
- [ ] First-time users see movie selection modal
- [ ] User profile displays correctly (name, email, photo)
- [ ] Movie facts are generated and displayed
- [ ] "Get New Fact" button fetches different facts
- [ ] Logout works and redirects to login
- [ ] Protected routes redirect unauthenticated users
- [ ] Responsive design works on mobile

### Running Tests

```bash
# Add your test commands here
npm test
```

## 🚀 Deployment

### Deploy to Vercel

1. **Connect your repository** to Vercel
2. **Set environment variables** in Vercel dashboard
3. **Update Google OAuth settings**:
   - Add your production domain to Authorized JavaScript origins
   - Add production callback URL: `https://yourdomain.com/api/auth/callback/google`
4. **Deploy**

### Environment Variables for Production

```env
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your-production-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
DATABASE_URL=your-production-database-url
OPENAI_API_KEY=your-openai-api-key
```

## 🐛 Troubleshooting

### Common Issues

**"OAuth client was not found" Error:**
- Verify Client ID and Client Secret in `.env.local`
- Check that you're using the correct Google Cloud project
- Ensure redirect URI is exactly: `http://localhost:3000/api/auth/callback/google`

**"Access Blocked" Error:**
- Add your email as a test user in Google Cloud Console
- Or publish your OAuth consent screen for public access

**Database Connection Issues:**
- Verify DATABASE_URL format
- Ensure PostgreSQL is running
- Check database permissions

**OpenAI API Errors:**
- Verify API key is correct
- Check OpenAI account billing status
- Ensure you have sufficient API credits

### Getting Help

1. Check the browser console for error messages
2. Review server logs in terminal
3. Verify all environment variables are set correctly
4. Test each component individually

## 📖 Key Learning Points

This project demonstrates:

- **Modern Next.js App Router** patterns
- **TypeScript** for type safety
- **Server-side authentication** with NextAuth.js
- **Database operations** with Prisma ORM
- **External API integration** (OpenAI)
- **OAuth 2.0 flow** implementation
- **Protected route patterns**
- **Environment variable management**
- **Error handling** and user experience

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🔗 Useful Links

- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [OpenAI API Documentation](https://platform.openai.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

**Built with ❤️ for the Software Engineer Assessment**