import { useState, useEffect } from 'react';
import { Navbar } from '../components/Navbar';
import { TaskCard } from '../components/TaskCard';
import { TaskForm } from '../components/TaskForm';
import { taskService, Task, TaskStatus } from '../services/taskService';

export const DashboardPage = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await taskService.getAll();
      setTasks(data);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao carregar tarefas');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (data: { titulo: string; descricao: string; status: TaskStatus }) => {
    try {
      await taskService.create(data);
      await loadTasks();
      setShowForm(false);
    } catch (err: any) {
      alert(err.response?.data?.error || 'Erro ao criar tarefa');
    }
  };

  const handleUpdateTask = async (data: { titulo: string; descricao: string; status: TaskStatus }) => {
    if (!editingTask) return;

    try {
      await taskService.update(editingTask.id, data);
      await loadTasks();
      setEditingTask(null);
    } catch (err: any) {
      alert(err.response?.data?.error || 'Erro ao atualizar tarefa');
    }
  };

  const handleDeleteTask = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta tarefa?')) return;

    try {
      await taskService.delete(id);
      await loadTasks();
    } catch (err: any) {
      alert(err.response?.data?.error || 'Erro ao excluir tarefa');
    }
  };

  const handleStatusChange = async (id: string, status: TaskStatus) => {
    try {
      const dataConclusao = status === 'CONCLUIDA' ? new Date().toISOString() : null;
      await taskService.update(id, { status, dataConclusao });
      await loadTasks();
    } catch (err: any) {
      alert(err.response?.data?.error || 'Erro ao atualizar status');
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
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-gray-800">Minhas Tarefas</h2>
            <button
              onClick={() => {
                setShowForm(!showForm);
                setEditingTask(null);
              }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition duration-200 font-semibold"
            >
              {showForm ? 'Cancelar' : '+ Nova Tarefa'}
            </button>
          </div>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          {(showForm || editingTask) && (
            <TaskForm
              task={editingTask}
              onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
              onCancel={handleCancelEdit}
            />
          )}
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Carregando tarefas...</p>
          </div>
        ) : tasks.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <h3 className="mt-2 text-lg font-medium text-gray-900">Nenhuma tarefa</h3>
            <p className="mt-1 text-gray-500">Comece criando uma nova tarefa.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-yellow-700 mb-3">
                Pendentes ({filteredTasks.pendente.length})
              </h3>
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

            <div>
              <h3 className="text-lg font-semibold text-blue-700 mb-3">
                Em Andamento ({filteredTasks.emAndamento.length})
              </h3>
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

            <div>
              <h3 className="text-lg font-semibold text-green-700 mb-3">
                Concluídas ({filteredTasks.concluida.length})
              </h3>
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

