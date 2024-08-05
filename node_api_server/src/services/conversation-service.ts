import axios from 'axios';
import ConversationRepository from '../repositories/conversation-repository';

class ConversationService {

    constructor(private conversationRepository: ConversationRepository) {
        this.conversationRepository = conversationRepository;
    }

    async selectModel(user_id: string, model: string) {
        await this.conversationRepository.upsertConversation(user_id, model);
        return { message: `Model ${model} selected for user ${user_id}.` };
    }

    async query(user_id: string, question: string) {
        const conversation = await this.conversationRepository.findOneByUserId(user_id);
        if (!conversation) throw new Error("Model not selected for user.");

        const response = await axios.post(`${process.env.ai_endpoint}/query`, { user_id, question });
        const answer = response.data.answer;

        conversation.history.push({ question, answer });
        await this.conversationRepository.saveConversation(conversation);

        return { answer };
    }

    async getHistory(user_id: string) {
        const conversation = await this.conversationRepository.findOneByUserId(user_id);
        if (!conversation) throw new Error("No history found for user.");

        return {
            model: conversation.chatModel,
            history: conversation.history,
        };
    }
}

export default ConversationService;
