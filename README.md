# AI Email Inbox

A React TypeScript application for managing and analyzing emails with AI-powered criticality detection.

## Features

- 📧 **Email List View**: Browse all emails with previews
- 🔍 **Email Detail View**: View complete email information
- 🤖 **AI Analysis**: Automatically categorize emails as critical or regular
- 🎨 **Modern UI**: Clean, responsive design
- ⚡ **Fast**: Built with Vite for optimal performance

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory and add your OpenAI API key:

```env
VITE_OPENAI_API_KEY=your-openai-api-key-here
```

**Alternative**: If you prefer not to use environment variables during development, you can temporarily add your API key directly in `src/env.ts`:

```typescript
export const RESTRICTED_OPEN_AI_API_KEY = 'your-openai-api-key-here';
```

### 3. Run the Development Server

```bash
npm run dev
```

The app will open in your browser at `http://localhost:3000`.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── App.tsx           # Main application component
├── App.css          # Application styles
├── data.ts          # Sample email data
├── emailAnalysis.ts # AI email analysis logic
├── useCompletions.ts # OpenAI API integration
├── env.ts           # Environment variables
└── index.tsx        # Application entry point
```

## How It Works

1. **Email Display**: The app loads sample emails from `data.ts`
2. **AI Analysis**: Each email is analyzed using OpenAI's GPT-3.5-turbo model
3. **Categorization**: Emails are categorized as "Critical" or "Regular" based on:
   - Urgency indicators
   - Authority level of sender
   - Emergency keywords
   - Action requirements
4. **Visual Organization**: Critical emails are highlighted and shown first

## Customization

- **Email Data**: Modify `src/data.ts` to add your own email data
- **Analysis Criteria**: Adjust the AI prompt in `src/emailAnalysis.ts`
- **Styling**: Update `src/App.css` for custom styling
- **AI Model**: Change the model in `src/useCompletions.ts`

## Dependencies

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **OpenAI** - AI analysis functionality

## Notes

- Requires an OpenAI API key for the email analysis feature
- The app runs entirely in the browser (no backend required)
- Sample data includes Hitchhiker's Guide to the Galaxy themed emails 