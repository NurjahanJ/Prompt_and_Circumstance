import OpenAI from 'openai';

/**
 * Creates and returns an OpenAI client instance using the API key from environment variables
 * @returns {OpenAI} OpenAI client instance
 */
const getOpenAIInstance = () => {
  const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
  
  if (!apiKey) {
    console.error('OpenAI API key is missing. Please check your .env file.');
    throw new Error('OpenAI API key is missing. Make sure REACT_APP_OPENAI_API_KEY is set in your .env file.');
  }
  
  return new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true // This allows the API key to be used in the browser
  });
};

/**
 * Formats a conversation history into the format expected by the OpenAI API
 * @param {Array} messages - Array of message objects from the app state
 * @returns {Array} - Formatted messages for the OpenAI API
 */
export const formatConversationForOpenAI = (messages) => {
  return messages.map(msg => ({
    role: msg.sender === 'user' ? 'user' : 'assistant',
    content: msg.text
  }));
};

/**
 * Sends a message to the OpenAI API and returns the response
 * @param {Array} messages - Array of message objects with role and content
 * @returns {Promise<string>} - The assistant's response text
 */
export const sendMessageToOpenAI = async (messages) => {
  try {
    // Create a new instance for each request
    const openai = getOpenAIInstance();
    
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // You can change this to other models like "gpt-4" if you have access
      messages: messages,
      temperature: 0.7,
      max_tokens: 1000,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    throw new Error(`Failed to get response from OpenAI: ${error.message}`);
  }
};
