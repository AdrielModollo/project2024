import { Request, Response, NextFunction } from 'express';

export const notFound = (_req: Request, res: Response, _next: NextFunction) => {
    res.status(404).json({
        message: 'Rota não encontrada.',
    });
};

export const genericError = (err: any, _req: Request, res: Response, _next: NextFunction) => {
    console.error('Erro:', err.stack);
    res.status(500).json({
        message: 'Ocorreu um erro interno no servidor.',
        error: err.stack
    });
};
