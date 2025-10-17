import { useState, useEffect } from 'react';
import { taskService } from '../services/taskService';
import type { Task, TaskStatus } from '../types/task';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await taskService.getAll();
      setTasks(data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao carregar tarefas');
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (data: { titulo: string; descricao: string; status: TaskStatus }) => {
    try {
      setError(null);
      await taskService.create(data);
      await loadTasks();
      return true;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao criar tarefa');
      return false;
    }
  };

  const updateTask = async (id: string, data: Partial<Task>) => {
    try {
      setError(null);
      await taskService.update(id, data);
      await loadTasks();
      return true;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao atualizar tarefa');
      return false;
    }
  };

  const deleteTask = async (id: string) => {
    try {
      setError(null);
      await taskService.delete(id);
      await loadTasks();
      return true;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao excluir tarefa');
      return false;
    }
  };

  const updateTaskStatus = async (id: string, status: TaskStatus) => {
    try {
      setError(null);
      const dataConclusao = status === 'CONCLUIDA' ? new Date().toISOString() : null;
      await taskService.update(id, { status, dataConclusao });
      await loadTasks();
      return true;
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao atualizar status');
      return false;
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  return {
    tasks,
    loading,
    error,
    loadTasks,
    createTask,
    updateTask,
    deleteTask,
    updateTaskStatus,
  };
};

