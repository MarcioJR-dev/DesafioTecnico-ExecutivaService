export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): { valid: boolean; message?: string } => {
  if (password.length < 6) {
    return { valid: false, message: 'A senha deve ter no mínimo 6 caracteres' };
  }
  return { valid: true };
};

export const validateRequired = (value: string, fieldName: string): { valid: boolean; message?: string } => {
  if (!value || !value.trim()) {
    return { valid: false, message: `${fieldName} é obrigatório` };
  }
  return { valid: true };
};

