import { Conversation, IConversationDocument } from '../models/conversations.model';

class ConversationRepository {

    private conversationModel: typeof Conversation

    constructor() {
        this.conversationModel = Conversation
    }

    async findOneByUserId(user_id: string) {
        return this.conversationModel.findOne({ user_id });
    }

    async upsertConversation(user_id: string, chatModel: string) {
        return this.conversationModel.findOneAndUpdate(
            { user_id },
            { user_id, chatModel, history: [] },
            { upsert: true, new: true }
        );
    }

    async saveConversation(conversation: IConversationDocument) {
        return conversation.save();
    }
}

export default ConversationRepository;
