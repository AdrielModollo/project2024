import { Request, Response } from 'express';
import { loginService } from '../../services/user/loginService';
import { registerService } from '../../services/user/registerService';

export const loginController = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const login = await loginService(email, password);
        res.json(login);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao processar o login, verifique se os dados foram preechidos corretamente!' });
    }
};
export const registerController = async (req: Request, res: Response) => {
    try {
        const register = await registerService(req.body);
        res.json(register);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao processar o cadastro, verifique se os dados foram preechidos corretamente!' });
    }
};

