import api from './api';

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

interface CreateTaskData {
  titulo: string;
  descricao: string;
  status?: TaskStatus;
}

interface UpdateTaskData {
  titulo?: string;
  descricao?: string;
  status?: TaskStatus;
  dataConclusao?: string | null;
}

export const taskService = {
  async getAll(): Promise<Task[]> {
    const response = await api.get('/tasks');
    return response.data.tasks;
  },

  async getById(id: string): Promise<Task> {
    const response = await api.get(`/tasks/${id}`);
    return response.data.task;
  },

  async create(data: CreateTaskData): Promise<Task> {
    const response = await api.post('/tasks', data);
    return response.data.task;
  },

  async update(id: string, data: UpdateTaskData): Promise<Task> {
    const response = await api.put(`/tasks/${id}`, data);
    return response.data.task;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/tasks/${id}`);
  },
};

