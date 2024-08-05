import { Schema, model, Document } from 'mongoose';
import { ChatModel, IConversation } from '../types/conversation.types';

export type IConversationDocument = IConversation & Document;

const ConversationSchema = new Schema<IConversationDocument>({
  user_id: { type: String, required: true, unique: true, index: true },
  chatModel: { type: String, required: true, enum: Object.values(ChatModel) },
  history: [{ question: String, answer: String }],
});

export const Conversation = model<IConversationDocument>('Conversation', ConversationSchema);
