import express from 'express';
import router from './modules/routes/user/indexRoute';
import {
    notFound,
    genericError,
} from './middlewares/errorHandler';

const app = express();

app.use(express.json());

app.use('/api', router);

app.use(notFound);
app.use(genericError);

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
