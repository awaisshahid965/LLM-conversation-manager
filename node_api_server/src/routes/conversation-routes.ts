import { Router } from 'express';
import ConversationController from '../controllers/conversation-controller';
import ConversationRepository from '../repositories/conversation-repository';
import ConversationService from '../services/conversation-service';

const conversationRoutes = Router();

const conversationRepository = new ConversationRepository();
const conversationService = new ConversationService(conversationRepository);
const conversationController = new ConversationController(conversationService);

conversationRoutes.post('/select_model', conversationController.selectModel.bind(conversationController));
conversationRoutes.post('/query', conversationController.query.bind(conversationController));
conversationRoutes.get('/history', conversationController.getHistory.bind(conversationController));

export {
    conversationRoutes,
};
