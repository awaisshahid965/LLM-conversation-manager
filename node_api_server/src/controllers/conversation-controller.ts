import { Request, Response } from 'express';
import ConversationService from '../services/conversation-service';

class ConversationController {

    constructor(private conversationService: ConversationService) {
        this.conversationService = conversationService;
    }

    async selectModel(req: Request, res: Response) {
        const { user_id, model } = req.body;
        try {
            const result = await this.conversationService.selectModel(user_id, model);
            res.json(result);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async query(req: Request, res: Response) {
        const { user_id, question } = req.body;
        try {
            const result = await this.conversationService.query(user_id, question);
            res.json(result);
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    }

    async getHistory(req: Request, res: Response) {
        const { user_id } = req.query as { user_id: string };
        try {
            const result = await this.conversationService.getHistory(user_id);
            res.json(result);
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    }
}

export default ConversationController;
