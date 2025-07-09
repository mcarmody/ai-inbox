import OpenAI from 'openai';
import { useState } from 'react';
import { RESTRICTED_OPEN_AI_API_KEY } from './env';

const openai = new OpenAI({
  apiKey: RESTRICTED_OPEN_AI_API_KEY,
  dangerouslyAllowBrowser: true
});

type UseCompletionsActions = {
  getChatCompletion: (content: string) => Promise<string>,
}

type UseCompletionsState = {
  loading: boolean
}

export const useCompletions = (): UseCompletionsActions & UseCompletionsState => {
  const [loading, setLoading] = useState(false)
  
  const getChatCompletion = async (content: string) => {
    setLoading(true)
    const res = await openai.chat.completions.create({
      messages: [{ role: 'user', content}],
      model: 'gpt-3.5-turbo',
    });

    const message = res.choices[0]?.message
    setLoading(false)
    if (message) {
      return message.content
    } else {
      throw new Error('No response from LLM.')
    }
  }

  return {
    getChatCompletion,
    loading
  }
} 