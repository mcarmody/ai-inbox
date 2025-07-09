import { useCompletions } from './useCompletions';
import { Email } from './data';

export interface AnalyzedEmail extends Email {
  isCritical?: boolean;
  isAnalyzing?: boolean;
}

export const useEmailAnalysis = () => {
  const { getChatCompletion, loading } = useCompletions();

  const analyzeEmailCriticality = async (email: Email): Promise<boolean> => {
    console.log(`Analyzing email ${email.message_id} from ${email.sender}...`);
    
    const prompt = `
Please analyze the following email and determine if it should be considered "critical" or "not critical".

Consider an email critical if it:
- Contains urgent requests or deadlines
- Is from someone in a position of authority (boss, client, political figures, etc.)
- Contains words indicating emergency or high priority
- Requires immediate action or response
- Contains important business/personal matters that can't wait

Email Details:
Sender: ${email.sender}
Subject: ${email.subject}
Body: ${email.body}

Please respond with only "CRITICAL" or "NOT_CRITICAL" (no explanation needed).
    `;

    try {
      console.log('Sending request to OpenAI API...');
      const response = await getChatCompletion(prompt);
      console.log('Received response from OpenAI:', response);
      
      const result = response?.trim().toUpperCase();
      console.log(`Analysis result for email ${email.message_id}: ${result}`);
      return result === 'CRITICAL';
    } catch (error) {
      console.error('Error analyzing email:', error);
      // Default to not critical if analysis fails
      return false;
    }
  };

  const analyzeMultipleEmails = async (emails: Email[]): Promise<AnalyzedEmail[]> => {
    console.log(`Starting analysis of ${emails.length} emails...`);
    const analyzedEmails: AnalyzedEmail[] = [];
    
    for (const email of emails) {
      try {
        console.log(`Processing email ${email.message_id}...`);
        const isCritical = await analyzeEmailCriticality(email);
        analyzedEmails.push({
          ...email,
          isCritical,
          isAnalyzing: false
        });
        console.log(`Completed analysis for email ${email.message_id}. Critical: ${isCritical}`);
      } catch (error) {
        console.error(`Error analyzing email ${email.message_id}:`, error);
        analyzedEmails.push({
          ...email,
          isCritical: false,
          isAnalyzing: false
        });
      }
    }
    
    console.log(`Completed analysis of all ${emails.length} emails`);
    return analyzedEmails;
  };

  return {
    analyzeEmailCriticality,
    analyzeMultipleEmails,
    loading
  };
}; 