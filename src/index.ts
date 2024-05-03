import express from 'express';
import router from './modules/routes/loginRoute';

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/api', router);

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
