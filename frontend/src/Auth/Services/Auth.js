import { authService } from 'Shared/Http/AuthService';

export const loginRequest = async (values) => {
  try {
    const result = await authService.post('/login', values);
    console.log(result);
  } catch (error) {
    throw error;
  }
};
