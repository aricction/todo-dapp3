const { ChatOpenAI } = require('@langchain/openai');
const { PromptTemplate } = require('@langchain/core/prompts');
const { LLMChain } = require('langchain/chains');

class AIService {
    constructor() {
        this.llm = new ChatOpenAI({
            openAIApiKey: process.env.OPENAI_API_KEY,
            model: 'gpt-3.5-turbo-1106', // Correct model name
            maxTokens: 500,  // Fixed property name
        });
    }

    async enhancedTodo(todoTitle) {
        const prompt = new PromptTemplate({
            template: `
            Help me break down and enhance this TODO: {todo}
            Provide:
            - Detailed description
            - Estimated time to complete
            - Potential Subtasks
            - Suggested priority (low/medium/high)

            Response format:
            Description: [Detailed description]
            Time Estimate: [X hours/minutes]
            Subtasks:
            1. [Subtask 1]
            2. [Subtask 2]
            Priority: [low/medium/high]
            `,
            inputVariables: ['todo']
        });

        const chain = new LLMChain({ llm: this.llm, prompt });

        try {
            const response = await chain.call({ todo: todoTitle });
            return this.parseAIResponse(response.text);
        } catch (error) {
            console.error('AI Enhancement error:', error);
            return null;
        }
    }

    parseAIResponse(aiResponse) {
        const parseRegex = {
            description: /Description:\s*(.+)/,
            timeEstimate: /Time Estimate:\s*(.+)/,
            subtasks: /Subtasks:\s*\n((?:\d+\.\s*.+\n?)+)/,
            priority: /Priority:\s*(low|medium|high)/i
        };

        return {
            description: aiResponse.match(parseRegex.description)?.[1] || '',
            timeEstimate: aiResponse.match(parseRegex.timeEstimate)?.[1] || '',
            subtasks: aiResponse.match(parseRegex.subtasks)?.[1]
                ? aiResponse.match(parseRegex.subtasks)[1]
                      .split('\n')
                      .map((task) => task.trim())
                : [],
            priority: aiResponse.match(parseRegex.priority)?.[1] || 'medium',
        };
    }
}

module.exports = AIService;
