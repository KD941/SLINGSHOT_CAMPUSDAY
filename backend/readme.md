# HealthyBytes Backend

The backend service for the smart health applications, built with Node.js, Express, and Firebase Firestore. It integrates the Google Gemini API for intelligent, context-aware food and exercise recommendations.

## Features
- **Dashboard API**: Fetches the daily summary.
- **Events API**: Syncs user calendar events to provide context for AI recommendations.
- **AI Recommendations API**: Uses Gemini to generate "Food of the Day" and periodic fun exercises based on user context.

## Setup Instructions

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file based on `.env.example` or the provided keys:
   ```env
   PORT=5000
   GEMINI_API_KEY=your_api_key
   ```

3. Configure Firebase Admin SDK.

4. Run the server:
   ```bash
   node server.js
   ```

## Endpoints Summary

- `GET /api/dashboard`
- `POST /api/events`
- `GET /api/analysis`
- `GET /api/recommendations/food`
- `GET /api/recommendations/exercise`
