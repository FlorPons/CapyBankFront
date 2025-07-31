import { LoginCredentials, RegisterUser, LoginResponse } from '../types/User.types';

// Registro simulado con parámetro data
export const register = async (data: RegisterUser): Promise<{ message: string }> => {
  console.log("Datos recibidos en registro (demo):", data);
  return { message: 'Registro simulado exitoso (demo)' };
};

// Login simulado con credenciales
export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const { email, password } = credentials;

  //  Usuario demo válido
  if (email === "demo@capybank.com" && password === "capy123") {
    return {
      message: 'Login simulado exitoso (demo)',
      user: {
        id: 1,
        name: 'Capy',
        last_name: 'Bank',
        email: 'demo@capybank.com',
        sender_account_id: 1,
        account_number: 12345678,
        balanceTotal: 200000,
      }
    };
  }

  // Credenciales incorrectas
  throw new Error("Usuario o contraseña inválidos");
};

