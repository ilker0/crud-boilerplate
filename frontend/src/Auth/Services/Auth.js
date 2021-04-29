import { authService } from 'Shared/Http/AuthService';

export const loginRequest = async (values) => {
  try {
    const result = await authService.post('/login', values);
    return result;
  } catch (error) {
    throw error;
  }
};

export const forgotPasswordRequest = async (values) => {
  try {
    const result = await authService.post('/forgot-password', values);
    return result;
  } catch (error) {
    throw error;
  }
};

export const resetTokenCheckRequest = async (values) => {
  try {
    const result = await authService.post('/resettoken-check', values);
    return result;
  } catch (error) {
    throw error;
  }
};

export const resetPasswordRequest = async (values) => {
  try {
    const result = await authService.post('/reset-password', values);
    return result;
  } catch (error) {
    throw error;
  }
};
