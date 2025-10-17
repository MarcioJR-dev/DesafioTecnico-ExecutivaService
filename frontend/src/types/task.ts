export type TaskStatus = 'PENDENTE' | 'EM_ANDAMENTO' | 'CONCLUIDA';

export interface Task {
  id: string;
  titulo: string;
  descricao: string;
  status: TaskStatus;
  dataCriacao: string;
  dataConclusao: string | null;
  userId: string;
}

export interface CreateTaskData {
  titulo: string;
  descricao: string;
  status?: TaskStatus;
}

export interface UpdateTaskData {
  titulo?: string;
  descricao?: string;
  status?: TaskStatus;
  dataConclusao?: string | null;
}
