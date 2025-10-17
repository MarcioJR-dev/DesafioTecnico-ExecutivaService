import type { Task, TaskStatus } from '../types/task';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: TaskStatus) => void;
}

export const TaskCard = ({ task, onEdit, onDelete, onStatusChange }: TaskCardProps) => {
  const statusColors = {
    PENDENTE: 'bg-yellow-100 text-yellow-800 border-yellow-600',
    EM_ANDAMENTO: 'bg-blue-100 text-blue-800 border-blue-600',
    CONCLUIDA: 'bg-green-100 text-green-800 border-green-600',
  };

  const statusLabels = {
    PENDENTE: 'PENDENTE',
    EM_ANDAMENTO: 'EM ANDAMENTO',
    CONCLUIDA: 'CONCLUÍDA',
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <div className="card p-6 hover:shadow-xl transition-all duration-300 border-l-4 border-l-gold">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-lg font-semibold text-black">{task.titulo}</h3>
        <span
          className={`px-3 py-1 text-xs font-bold border uppercase tracking-wide ${
            statusColors[task.status]
          }`}
        >
          {statusLabels[task.status]}
        </span>
      </div>

      <p className="text-gray-700 mb-4 leading-relaxed">{task.descricao}</p>

      <div className="text-sm text-gray-600 mb-4 space-y-1">
        <p><span className="font-semibold">Criada:</span> {formatDate(task.dataCriacao)}</p>
        {task.dataConclusao && (
          <p><span className="font-semibold">Concluída:</span> {formatDate(task.dataConclusao)}</p>
        )}
      </div>

      <div className="space-y-3">
        <select
          value={task.status}
          onChange={(e) => onStatusChange(task.id, e.target.value as TaskStatus)}
          className="input-field text-sm"
        >
          <option value="PENDENTE">PENDENTE</option>
          <option value="EM_ANDAMENTO">EM ANDAMENTO</option>
          <option value="CONCLUIDA">CONCLUÍDA</option>
        </select>

        <div className="flex gap-2">
          <button
            onClick={() => onEdit(task)}
            className="flex-1 btn-secondary text-sm py-2"
          >
            EDITAR
          </button>

          <button
            onClick={() => onDelete(task.id)}
            className="flex-1 bg-red-600 text-white px-4 py-2 rounded-none border-2 border-red-600 hover:bg-white hover:text-red-600 transition-all duration-300 font-semibold tracking-wide text-sm uppercase"
          >
            EXCLUIR
          </button>
        </div>
      </div>
    </div>
  );
};

