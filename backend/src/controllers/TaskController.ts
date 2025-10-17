import { Request, Response } from 'express';
import prisma from '../utils/prisma';

export class TaskController {
  async create(req: Request, res: Response): Promise<void> {
    try {
      const { titulo, descricao, status } = req.body;
      const userId = req.userId;

      if (!userId) {
        res.status(401).json({ error: 'Usuário não autenticado' });
        return;
      }

      // Validações
      if (!titulo) {
        res.status(400).json({ error: 'Título é obrigatório' });
        return;
      }

      if (!descricao) {
        res.status(400).json({ error: 'Descrição é obrigatória' });
        return;
      }

      // Validar status se fornecido
      const validStatuses = ['PENDENTE', 'EM_ANDAMENTO', 'CONCLUIDA'];
      if (status && !validStatuses.includes(status)) {
        res.status(400).json({ 
          error: 'Status inválido. Use: PENDENTE, EM_ANDAMENTO ou CONCLUIDA' 
        });
        return;
      }

      // Criar tarefa
      const task = await prisma.task.create({
        data: {
          titulo,
          descricao,
          status: status || 'PENDENTE',
          userId
        }
      });

      res.status(201).json({
        message: 'Tarefa criada com sucesso',
        task
      });
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
      res.status(500).json({ error: 'Erro ao criar tarefa' });
    }
  }

  async getAll(req: Request, res: Response): Promise<void> {
    try {
      const userId = req.userId;

      if (!userId) {
        res.status(401).json({ error: 'Usuário não autenticado' });
        return;
      }

      const tasks = await prisma.task.findMany({
        where: { userId },
        orderBy: { dataCriacao: 'desc' }
      });

      res.status(200).json({ tasks });
    } catch (error) {
      console.error('Erro ao listar tarefas:', error);
      res.status(500).json({ error: 'Erro ao listar tarefas' });
    }
  }

  async getById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userId = req.userId;

      if (!userId) {
        res.status(401).json({ error: 'Usuário não autenticado' });
        return;
      }

      const task = await prisma.task.findUnique({
        where: { id }
      });

      if (!task) {
        res.status(404).json({ error: 'Tarefa não encontrada' });
        return;
      }

      // Verificar se a tarefa pertence ao usuário
      if (task.userId !== userId) {
        res.status(403).json({ error: 'Acesso negado a esta tarefa' });
        return;
      }

      res.status(200).json({ task });
    } catch (error) {
      console.error('Erro ao buscar tarefa:', error);
      res.status(500).json({ error: 'Erro ao buscar tarefa' });
    }
  }

  async update(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { titulo, descricao, status, dataConclusao } = req.body;
      const userId = req.userId;

      if (!userId) {
        res.status(401).json({ error: 'Usuário não autenticado' });
        return;
      }

      // Buscar tarefa
      const task = await prisma.task.findUnique({
        where: { id }
      });

      if (!task) {
        res.status(404).json({ error: 'Tarefa não encontrada' });
        return;
      }

      // Verificar se a tarefa pertence ao usuário
      if (task.userId !== userId) {
        res.status(403).json({ error: 'Acesso negado a esta tarefa' });
        return;
      }

      // Validar status se fornecido
      const validStatuses = ['PENDENTE', 'EM_ANDAMENTO', 'CONCLUIDA'];
      if (status && !validStatuses.includes(status)) {
        res.status(400).json({ 
          error: 'Status inválido. Use: PENDENTE, EM_ANDAMENTO ou CONCLUIDA' 
        });
        return;
      }

      // Atualizar tarefa
      const updatedTask = await prisma.task.update({
        where: { id },
        data: {
          ...(titulo && { titulo }),
          ...(descricao && { descricao }),
          ...(status && { status }),
          ...(dataConclusao !== undefined && { dataConclusao: dataConclusao ? new Date(dataConclusao) : null })
        }
      });

      res.status(200).json({
        message: 'Tarefa atualizada com sucesso',
        task: updatedTask
      });
    } catch (error) {
      console.error('Erro ao atualizar tarefa:', error);
      res.status(500).json({ error: 'Erro ao atualizar tarefa' });
    }
  }

  async delete(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const userId = req.userId;

      if (!userId) {
        res.status(401).json({ error: 'Usuário não autenticado' });
        return;
      }

      // Buscar tarefa
      const task = await prisma.task.findUnique({
        where: { id }
      });

      if (!task) {
        res.status(404).json({ error: 'Tarefa não encontrada' });
        return;
      }

      // Verificar se a tarefa pertence ao usuário
      if (task.userId !== userId) {
        res.status(403).json({ error: 'Acesso negado a esta tarefa' });
        return;
      }

      // Deletar tarefa
      await prisma.task.delete({
        where: { id }
      });

      res.status(200).json({ message: 'Tarefa excluída com sucesso' });
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error);
      res.status(500).json({ error: 'Erro ao excluir tarefa' });
    }
  }
}

