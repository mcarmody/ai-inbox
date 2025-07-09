// Environment variables for the application
// In production, use environment variables. For development, you can set your API key here temporarily.
// use this format and rename this file to env.ts to use environment variables

export const RESTRICTED_OPEN_AI_API_KEY = 'your-openai-api-key';

// Add other environment variables as needed
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'; 