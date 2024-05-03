import { Db, Collection, ObjectId } from 'mongodb'; // Importa os tipos do MongoDB
import { getDatabase } from '../../../database/mongoConnection';
import { registerUser } from '../../../inferfaces/user/register';
import { validateRequiredFields } from '../../../middlewares/validateRequiredFields';
import bcrypt from 'bcrypt';

function validateFields(user: registerUser, requiredFields: string[]): { status: number, data: object } | null {
    const missingFields = validateRequiredFields(user, requiredFields);
    if (missingFields.length > 0) {
        return {
            status: 400,
            data: {
                success: false,
                message: `Os seguintes campos são obrigatórios e estão faltando ou vazios: ${missingFields.join(', ')}`,
            },
        };
    }
    return null;
}

async function checkDuplicate(db: Db, field: string, value: string): Promise<{ status: number, data: object } | null> {
    const registerCollection: Collection = db.collection("register");
    const existingRecord = await registerCollection.findOne({ [field]: value });

    if (existingRecord) {
        return {
            status: 400,
            data: {
                success: false,
                message: `${field.charAt(0).toUpperCase() + field.slice(1)} já está em uso. Escolha um(a) diferente.`,
            },
        };
    }
    return null;
}

async function hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
}

async function insertUser(db: Db, user: registerUser): Promise<{ status: number, data: object }> {
    const registerCollection: Collection = db.collection("register");
    const result = await registerCollection.insertOne({
        ...user,
        password: await hashPassword(user.password),
    });

    return {
        status: 201,
        data: {
            success: true,
            message: 'Usuário registrado com sucesso',
            userId: result.insertedId,
        },
    };
}

export async function registerService(user: registerUser): Promise<{ status: number, data: object } | undefined> {
    const requiredFields = ['firstName', 'lastName', 'email', 'password', 'username'];

    const fieldValidation = validateFields(user, requiredFields);
    if (fieldValidation) {
        return fieldValidation;
    }

    try {
        const db = await getDatabase("project2024");

        const emailCheck = await checkDuplicate(db, 'email', user.email);
        if (emailCheck) {
            return emailCheck;
        }

        const usernameCheck = await checkDuplicate(db, 'username', user.username);
        if (usernameCheck) {
            return usernameCheck;
        }

        return await insertUser(db, user);

    } catch (err) {
        console.error('Erro ao registrar usuário:', err);
        return {
            status: 500,
            data: {
                success: false,
                message: 'Erro interno do servidor',
            },
        };
    }

}
