import { Request, Response } from 'express';
import { loginService } from '../services/loginService';

export const loginController = async (req: Request, res: Response) => {
    try {
        const login = await loginService();
        res.json(login);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao processar o login', details: error });
    }
};
