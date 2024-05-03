import { getDatabase } from '../../../database/mongoConnection';
import { LoginResponse } from '../../../inferfaces/user/login';
import bcrypt from 'bcrypt';

export async function loginService(email: string, password: string): Promise<LoginResponse> {
  try {
    const db = await getDatabase("project2024");
    const loginCollection = db.collection("register");

    const user = await loginCollection.findOne({ email: email });

    if (user) {
      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (isPasswordMatch) {
        return {
          status: 200,
          data: {
            success: true,
            message: 'Login bem-sucedido',
          },
        };
      } else {
        // Senha incorreta
        return {
          status: 401,
          data: {
            success: false,
            message: 'Senha incorreta',
          },
        };
      }
    } else {
      // Usuário não encontrado
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
