import { getDatabase } from '../../../database/mongoConnection';
import { LoginResponse } from '../../../inferfaces/user/login';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export async function loginService(email: string, password: string): Promise<LoginResponse> {
  try {
    const db = await getDatabase("project2024");
    const loginCollection = db.collection("register");

    const user = await loginCollection.findOne({ email: email });

    if (user) {
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (isPasswordMatch) {
        const token = jwt.sign(
          {
            userId: user._id,
            email: user.email,
          },
          JWT_SECRET,
          {
            expiresIn: '1h',
          }
        );

        return {
          status: 200,
          data: {
            success: true,
            message: 'Login bem-sucedido',
            token,
          },
        };
      } else {
        return {
          status: 401,
          data: {
            success: false,
            message: 'Senha incorreta',
          },
        };
      }
    } else {
      return {
        status: 404,
        data: {
          success: false,
          message: 'Usuário não encontrado',
        },
      };
    }
  } catch (err) {
    console.error('Erro no login:', err);
    return {
      status: 500,
      data: {
        success: false,
        message: 'Erro interno do servidor',
      },
    };
  }
}
