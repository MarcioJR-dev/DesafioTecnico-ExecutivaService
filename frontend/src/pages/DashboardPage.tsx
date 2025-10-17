import { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { TaskCard } from '../components/TaskCard';
import { TaskForm } from '../components/TaskForm';
import { taskService } from '../services/taskService';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../hooks/useToast';
import type { Task, TaskStatus } from '../types/task';

export const DashboardPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, logout } = useAuth();
  const { showSuccess, showError } = useToast();

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await taskService.getAll();
      setTasks(data);
    } catch (err: any) {
      showError(err.response?.data?.error || 'Erro ao carregar tarefas');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (data: { titulo: string; descricao: string; status: TaskStatus }) => {
    try {
      await taskService.create(data);
      await loadTasks();
      setShowForm(false);
      showSuccess('Tarefa criada com sucesso!');
    } catch (err: any) {
      showError(err.response?.data?.error || 'Erro ao criar tarefa');
    }
  };

  const handleUpdateTask = async (data: { titulo: string; descricao: string; status: TaskStatus }) => {
    if (!editingTask) return;

    try {
      await taskService.update(editingTask.id, data);
      await loadTasks();
      setEditingTask(null);
      showSuccess('Tarefa atualizada com sucesso!');
    } catch (err: any) {
      showError(err.response?.data?.error || 'Erro ao atualizar tarefa');
    }
  };

  const handleDeleteTask = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta tarefa?')) return;

    try {
      await taskService.delete(id);
      await loadTasks();
      showSuccess('Tarefa excluída com sucesso!');
    } catch (err: any) {
      showError(err.response?.data?.error || 'Erro ao excluir tarefa');
    }
  };

  const handleStatusChange = async (id: string, status: TaskStatus) => {
    try {
      const dataConclusao = status === 'CONCLUIDA' ? new Date().toISOString() : null;
      await taskService.update(id, { status, dataConclusao });
      await loadTasks();
      showSuccess('Status da tarefa atualizado!');
    } catch (err: any) {
      showError(err.response?.data?.error || 'Erro ao atualizar status');
    }
  };

  const handleEdit = (task: Task) => {
    setEditingTask(task);
    setShowForm(false);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  const filteredTasks = {
    pendente: tasks.filter((t) => t.status === 'PENDENTE'),
    emAndamento: tasks.filter((t) => t.status === 'EM_ANDAMENTO'),
    concluida: tasks.filter((t) => t.status === 'CONCLUIDA'),
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-4xl font-bold text-black mb-2">Painel Executivo</h1>
              <p className="text-gray-600">Bem-vindo, {user?.nome}</p>
            </div>
            <button
              onClick={() => {
                setShowForm(!showForm);
                setEditingTask(null);
              }}
              className="btn-primary"
            >
              {showForm ? 'CANCELAR' : '+ NOVA TAREFA'}
            </button>
          </div>

          {(showForm || editingTask) && (
            <div className="card p-6 mb-6">
              <TaskForm
                task={editingTask}
                onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
                onCancel={handleCancelEdit}
              />
            </div>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-yellow-100 flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Pendentes</p>
                <p className="text-2xl font-bold text-black">{filteredTasks.pendente.length}</p>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.293l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Em Andamento</p>
                <p className="text-2xl font-bold text-black">{filteredTasks.emAndamento.length}</p>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Concluídas</p>
                <p className="text-2xl font-bold text-black">{filteredTasks.concluida.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tasks Board */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-black"></div>
            <p className="mt-4 text-gray-600">Carregando tarefas...</p>
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-12 card">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm0 4a1 1 0 011-1h12a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1V8zm2 2a1 1 0 000 2h2a1 1 0 000-2H5zm4 0a1 1 0 000 2h2a1 1 0 000-2H9zm4 0a1 1 0 000 2h2a1 1 0 000-2h-2z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-black mb-2">Nenhuma tarefa encontrada</h3>
            <p className="text-gray-600 mb-4">Comece criando sua primeira tarefa.</p>
            <button
              onClick={() => setShowForm(true)}
              className="btn-primary"
            >
              CRIAR PRIMEIRA TAREFA
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Pendentes */}
            <div>
              <div className="flex items-center mb-4">
                <div className="w-4 h-4 bg-yellow-600 mr-3"></div>
                <h3 className="text-lg font-semibold text-black uppercase tracking-wide">
                  Pendentes ({filteredTasks.pendente.length})
                </h3>
              </div>
              <div className="space-y-4">
                {filteredTasks.pendente.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={handleEdit}
                    onDelete={handleDeleteTask}
                    onStatusChange={handleStatusChange}
                  />
                ))}
              </div>
            </div>

            {/* Em Andamento */}
            <div>
              <div className="flex items-center mb-4">
                <div className="w-4 h-4 bg-blue-600 mr-3"></div>
                <h3 className="text-lg font-semibold text-black uppercase tracking-wide">
                  Em Andamento ({filteredTasks.emAndamento.length})
                </h3>
              </div>
              <div className="space-y-4">
                {filteredTasks.emAndamento.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={handleEdit}
                    onDelete={handleDeleteTask}
                    onStatusChange={handleStatusChange}
                  />
                ))}
              </div>
            </div>

            {/* Concluídas */}
            <div>
              <div className="flex items-center mb-4">
                <div className="w-4 h-4 bg-green-600 mr-3"></div>
                <h3 className="text-lg font-semibold text-black uppercase tracking-wide">
                  Concluídas ({filteredTasks.concluida.length})
                </h3>
              </div>
              <div className="space-y-4">
                {filteredTasks.concluida.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={handleEdit}
                    onDelete={handleDeleteTask}
                    onStatusChange={handleStatusChange}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

