# 🎬 MovieFinder - Movie Search Application

A responsive web application built with Next.js and TypeScript that allows users to search and browse movies/series using the OMDb API.

## ✨ Features

- **Smart Search**: Search for movies and TV series by title
- **Advanced Filters**: Filter results by type (Movie/Series) and year
- **Responsive Design**: Fully responsive design that works on desktop and mobile
- **Pagination**: Navigate through search results with smooth pagination
- **Movie Details**: Click on any movie to view detailed information
- **Loading States**: Smooth loading animations and error handling
- **Modern UI**: Beautiful, polished interface with hover effects and transitions

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- OMDb API key (free)

### Installation

1. **Get your OMDb API Key**
   - Go to [OMDb API](https://www.omdbapi.com/apikey.aspx)
   - Choose "FREE! (1,000 daily limit)"
   - Fill in your details and get your API key via email

2. **Set up the environment**
   - Open `.env.local` file in the project root
   - Replace `your_api_key_here` with your actual API key:
   ```
   NEXT_PUBLIC_OMDB_API_KEY=your_actual_api_key_here
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   - Navigate to [http://localhost:3000](http://localhost:3000)
   - Start searching for movies!

## 🛠️ Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Utility-first CSS framework for styling
- **OMDb API** - Movie database API for fetching movie data

## 📱 Features Overview

### Search & Display
- Search bar with real-time input
- Display results in responsive grid layout
- Show poster, title, type, and year for each movie
- 10 results per page with pagination

### Filters
- **Type Filter**: Filter between Movies and TV Series
- **Year Filter**: Filter by release year (dropdown with years from 1900 to current)
- Filters work in combination with search queries

### Movie Details (Bonus Feature)
- Click any movie card to open detailed modal
- Shows full movie information including:
  - Full plot
  - Cast and crew
  - Ratings
  - Release information
  - Awards and more

### Technical Features
- **Error Handling**: Graceful handling of API errors and edge cases
- **Loading States**: Skeleton loaders and spinners for better UX
- **Responsive Design**: Works perfectly on all device sizes
- **Accessibility**: Proper focus states and semantic HTML
- **Performance**: Optimized images and efficient API calls

## 🎯 Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── SearchBar.tsx      # Search input and filters
│   ├── MovieCard.tsx      # Individual movie card
│   ├── Pagination.tsx     # Pagination controls
│   ├── MovieDetailsModal.tsx  # Movie details modal
│   ├── LoadingAndError.tsx    # Loading and error states
│   └── index.ts           # Component exports
├── hooks/                 # Custom React hooks
│   └── useMovieSearch.ts  # Movie search logic
├── services/              # API services
│   └── omdb.ts           # OMDb API integration
└── types/                 # TypeScript type definitions
    └── movie.ts          # Movie-related types
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🌐 Deployment

This app can be deployed to any hosting platform that supports Next.js:

1. **Vercel** (Recommended)
   - Connect your GitHub repository
   - Add your `NEXT_PUBLIC_OMDB_API_KEY` in environment variables
   - Deploy automatically

2. **Netlify**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Add environment variables

3. **Other platforms**
   - Make sure to set the environment variable `NEXT_PUBLIC_OMDB_API_KEY`

## 📝 Assessment Requirements Checklist

✅ **Search & Display**
- [x] Search bar for movie/series names
- [x] Grid view with poster, title, type, year
- [x] 10 results per page
- [x] Proper pagination controls

✅ **Filters**
- [x] Type filter (Movie/Series)
- [x] Year of release filter
- [x] Combined filter functionality

✅ **Technical Requirements**
- [x] Next.js with TypeScript (mandatory)
- [x] Smooth UI/UX transitions
- [x] Fully responsive design
- [x] Proper state management
- [x] Loading states and error handling

✅ **Bonus Feature**
- [x] Movie details modal with full information

## 🎨 Design Highlights

- **Modern Interface**: Clean, professional design with subtle shadows and hover effects
- **Responsive Grid**: Adapts from 1 column on mobile to 5 columns on large screens
- **Smooth Animations**: Hover effects, loading animations, and page transitions
- **Accessibility**: Proper focus states, semantic HTML, and keyboard navigation
- **Error States**: Helpful error messages and retry functionality

## 🔍 API Usage

The app uses the OMDb API with HTTPS endpoints to avoid mixed content issues:
- Base URL: `https://www.omdbapi.com/`
- Search endpoint: `?s={query}&page={page}&type={type}&y={year}`
- Details endpoint: `?i={imdbID}&plot=full`

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

This is an assessment project, but suggestions for improvements are welcome!

---

**Built with ❤️ for the Applyo Frontend Developer Assessment**
