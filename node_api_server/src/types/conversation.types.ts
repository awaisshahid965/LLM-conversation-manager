export enum ChatModel {
    LLAMA2 = 'llama2',
    MISTRAL = 'mistral',
}

export interface IConversation {
    user_id: string;
    chatModel: ChatModel;
    history: { question: string; answer: string }[];
}