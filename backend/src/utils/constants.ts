export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const;

export const ERROR_MESSAGES = {
  EMAIL_REQUIRED: 'Email é obrigatório',
  PASSWORD_REQUIRED: 'Senha é obrigatória',
  NAME_REQUIRED: 'Nome é obrigatório',
  INVALID_EMAIL: 'Email inválido',
  PASSWORD_TOO_SHORT: 'A senha deve ter no mínimo 6 caracteres',
  EMAIL_ALREADY_EXISTS: 'Email já cadastrado',
  INVALID_CREDENTIALS: 'Credenciais inválidas',
  TOKEN_NOT_PROVIDED: 'Token não fornecido',
  INVALID_TOKEN: 'Token inválido',
  MALFORMED_TOKEN: 'Token mal formatado',
  UNAUTHORIZED: 'Usuário não autenticado',
  ACCESS_DENIED: 'Acesso negado',
  TASK_NOT_FOUND: 'Tarefa não encontrada',
  TITULO_REQUIRED: 'Título é obrigatório',
  DESCRICAO_REQUIRED: 'Descrição é obrigatória',
  INVALID_STATUS: 'Status inválido. Use: PENDENTE, EM_ANDAMENTO ou CONCLUIDA',
  SERVER_ERROR: 'Erro interno do servidor',
} as const;

export const SUCCESS_MESSAGES = {
  USER_CREATED: 'Usuário criado com sucesso',
  LOGIN_SUCCESS: 'Login realizado com sucesso',
  TASK_CREATED: 'Tarefa criada com sucesso',
  TASK_UPDATED: 'Tarefa atualizada com sucesso',
  TASK_DELETED: 'Tarefa excluída com sucesso',
} as const;

export const TASK_STATUS = {
  PENDENTE: 'PENDENTE',
  EM_ANDAMENTO: 'EM_ANDAMENTO',
  CONCLUIDA: 'CONCLUIDA',
} as const;

export const VALID_STATUSES = Object.values(TASK_STATUS);

