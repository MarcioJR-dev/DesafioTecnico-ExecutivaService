import type { Task, TaskStatus } from '../types/task';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: TaskStatus) => void;
}

export const TaskCard = ({ task, onEdit, onDelete, onStatusChange }: TaskCardProps) => {
  const statusColors = {
    PENDENTE: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    EM_ANDAMENTO: 'bg-blue-100 text-blue-800 border-blue-300',
    CONCLUIDA: 'bg-green-100 text-green-800 border-green-300',
  };

  const statusLabels = {
    PENDENTE: 'Pendente',
    EM_ANDAMENTO: 'Em Andamento',
    CONCLUIDA: 'Concluída',
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6 border border-gray-200">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-semibold text-gray-800">{task.titulo}</h3>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold border ${
            statusColors[task.status]
          }`}
        >
          {statusLabels[task.status]}
        </span>
      </div>

      <p className="text-gray-600 mb-4">{task.descricao}</p>

      <div className="text-sm text-gray-500 mb-4">
        <p>Criada em: {formatDate(task.dataCriacao)}</p>
        {task.dataConclusao && (
          <p>Concluída em: {formatDate(task.dataConclusao)}</p>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <select
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value as TaskStatus)}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="PENDENTE">Pendente</option>
          <option value="EM_ANDAMENTO">Em Andamento</option>
          <option value="CONCLUIDA">Concluída</option>
        </select>

        <button
          onClick={() => onEdit(task)}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 font-medium"
        >
          Editar
        </button>

        <button
          onClick={() => onDelete(task.id)}
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-200 font-medium"
        >
          Excluir
        </button>
      </div>
    </div>
  );
};

