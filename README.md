# Sports Aggregator

## Project Overview

Sports Aggregator is a comprehensive web application that provides real-time sports news, fixtures, and summaries across multiple sports including football, basketball, and cricket. The project uses a modern tech stack with a React frontend and Node.js backend, leveraging various APIs to aggregate sports data and provide an engaging user experience.

## Key Features

- **Live Sports Fixtures**: Real-time updates for football, basketball, and cricket matches
- **Sports News Aggregation**: Curated news from multiple sources, categorized by sport
- **AI-Powered Summaries**: News summaries generated using Google's Gemini AI
- **Smart Caching**: Firebase-based caching system for optimal performance
- **Responsive Design**: Mobile-first approach using TailwindCSS
- **Dark Mode**: System-wide theme support

## Architecture

```
sports-aggregator/
├── frontend/           # React + Vite frontend application
├── backend/            # Node.js + Express backend server
└── shared/            # Shared configurations and utilities
```

### Technology Stack

#### Frontend
- React 18
- Vite
- TailwindCSS
- Framer Motion
- React Router DOM
- Axios

#### Backend
- Node.js
- Express.js
- Firebase Realtime Database
- Google Gemini AI
- External Sports APIs

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)
- Firebase account
- API keys for:
  - Sports data providers
  - News services
  - Google Gemini AI

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd sports-aggregator
```

2. Install dependencies for both frontend and backend:
```bash
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
npm install
```

3. Configure environment variables:
```bash
# Create .env file in project root
cp .env.example .env
```

4. Start the development servers:
```bash
# Terminal 1 - Start backend server
cd backend
npm start

# Terminal 2 - Start frontend development server
cd frontend
npm run dev
```

## Environment Variables

Create a `.env` file in the project root:

```env
# API Keys
SPORTS_APP=your_sports_api_key
CRICKET_APP=your_cricket_api_key
NEWS_APP=your_news_api_key
GEMINI_APP=your_gemini_api_key

# Firebase Configuration
FIREBASE_DATABASE_URL=your_firebase_url

# API Endpoints
FIXTURES_FOOTBALL_ENDPOINT=endpoint_url
FIXTURES_BASKETBALL_ENDPOINT=endpoint_url
FIXTURES_CRICKET_ENDPOINT=endpoint_url
NEWS_ALL_ENDPOINT=endpoint_url
NEWS_FOOTBALL_ENDPOINT=endpoint_url
NEWS_BASKETBALL_ENDPOINT=endpoint_url
NEWS_CRICKET_ENDPOINT=endpoint_url

# Server Configuration
PORT=5000
```
