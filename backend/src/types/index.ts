export interface CreateUserDTO {
  email: string;
  password: string;
  nome: string;
}

export interface SignInDTO {
  email: string;
  password: string;
}

export interface CreateTaskDTO {
  titulo: string;
  descricao: string;
  status?: 'PENDENTE' | 'EM_ANDAMENTO' | 'CONCLUIDA';
}

export interface UpdateTaskDTO {
  titulo?: string;
  descricao?: string;
  status?: 'PENDENTE' | 'EM_ANDAMENTO' | 'CONCLUIDA';
  dataConclusao?: Date | null;
}

export interface JwtPayload {
  userId: string;
  iat?: number;
  exp?: number;
}

