import { useState, useEffect } from 'react';
import { useToast } from '../hooks/useToast';
import type { Task, TaskStatus } from '../types/task';

interface TaskFormProps {
  task?: Task | null;
  onSubmit: (data: { titulo: string; descricao: string; status: TaskStatus }) => void;
  onCancel: () => void;
}

export const TaskForm = ({ task, onSubmit, onCancel }: TaskFormProps) => {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [status, setStatus] = useState<TaskStatus>('PENDENTE');
  const { showError } = useToast();

  useEffect(() => {
    if (task) {
      setTitulo(task.titulo);
      setDescricao(task.descricao);
      setStatus(task.status);
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titulo.trim() || !descricao.trim()) {
      showError('Título e descrição são obrigatórios');
      return;
    }
    onSubmit({ titulo, descricao, status });
    if (!task) {
      setTitulo('');
      setDescricao('');
      setStatus('PENDENTE');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-black border-b-2 border-gold pb-2">
        {task ? 'EDITAR TAREFA' : 'NOVA TAREFA'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="titulo" className="block text-sm font-semibold text-black mb-2 uppercase tracking-wide">
            Título
          </label>
          <input
            type="text"
            id="titulo"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="input-field"
            placeholder="Digite o título da tarefa"
            required
          />
        </div>

        <div>
          <label htmlFor="descricao" className="block text-sm font-semibold text-black mb-2 uppercase tracking-wide">
            Descrição
          </label>
          <textarea
            id="descricao"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            rows={4}
            className="input-field resize-none"
            placeholder="Digite a descrição da tarefa"
            required
          />
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-semibold text-black mb-2 uppercase tracking-wide">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value as TaskStatus)}
            className="input-field"
          >
            <option value="PENDENTE">PENDENTE</option>
            <option value="EM_ANDAMENTO">EM ANDAMENTO</option>
            <option value="CONCLUIDA">CONCLUÍDA</option>
          </select>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 btn-primary"
          >
            {task ? 'ATUALIZAR' : 'CRIAR TAREFA'}
          </button>
          {task && (
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 btn-secondary"
            >
              CANCELAR
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

