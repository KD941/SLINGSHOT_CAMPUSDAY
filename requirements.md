# Project Requirements

## Frontend Requirements (React)
1. **Pages/Views**:
   - **Dashboard**: High-level overview of today's plan, streaks, and quick actions.
   - **Health Check (Analysis)**: Charts/Graphs (e.g., Recharts or Chart.js) showing habit trends, dietary adherence, and Gemini-generated health insights.
   - **Calendar**: Interactive calendar interface reflecting upcoming events (marathons, weddings) and daily meal plans.
   - **Fasting & Regimens**: Interface to set, manage, and track weekly fasting routines and recovery days.
2. **Components Component Library**: Use a modern component library (e.g., TailwindCSS + shadcn/ui or Material UI) for a clean, responsive layout.
3. **State Management**: Context API or Zustand / Redux for managing user session, health data, and preferences.
4. **Push Notifications/Alerts**: In-app toasts or progressive web app (PWA) notifications for the periodic "Pulse Exercises" (e.g., every 8 hours).

## Backend Requirements (Node.js/Express)
1. **API Endpoints**:
   - `GET /api/dashboard`: Fetch daily summary.
   - `POST /api/events`: Sync or add calendar events.
   - `GET /api/analysis`: Aggregate user data for the health check page.
   - `POST /api/settings/exercise-frequency`: Configure the hour interval for exercise suggestions.
2. **AI Integration Service (Gemini API)**:
   - **Food Suggestion Generator**: Prompt the Gemini API with user context (upcoming events, current health data) to generate the "Food of the Day".
   - **Exercise Generator**: Prompt Gemini API to generate fun, context-appropriate mini-exercises.
   - **Health Analyst**: Analyze time-series health data and output human-readable insights.
3. **Cron Jobs / Schedulers**:
   - Daily cron job to trigger the "Food of the Day" generation and store it in Firestore.
   - Interval-based jobs (or calculated on-the-fly) to trigger "fun exercises" based on user configuration.
4. **Authentication (Optional but recommended)**: Firebase Auth middleware to secure standard routes.

## AI & Data Processing Requirements
- Maintain conversation context or structured prompt templates for the Gemini API to ensure consistent JSON outputs.
- Data privacy: Strip Personally Identifiable Information (PII) before sending contextual data to the Gemini API.
