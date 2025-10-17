import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../utils/prisma';

export class AuthController {
  async signup(req: Request, res: Response): Promise<void> {
    try {
      const { email, password, nome } = req.body;

      // Validações
      if (!email || !password || !nome) {
        res.status(400).json({ error: 'Email, senha e nome são obrigatórios' });
        return;
      }

      // Validar formato de email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        res.status(400).json({ error: 'Email inválido' });
        return;
      }

      // Validar senha mínima
      if (password.length < 6) {
        res.status(400).json({ error: 'A senha deve ter no mínimo 6 caracteres' });
        return;
      }

      // Verificar se usuário já existe
      const userExists = await prisma.user.findUnique({
        where: { email }
      });

      if (userExists) {
        res.status(400).json({ error: 'Email já cadastrado' });
        return;
      }

      // Hash da senha
      const hashedPassword = await bcrypt.hash(password, 10);

      // Criar usuário
      const user = await prisma.user.create({
        data: {
          email,
          password: hashedPassword,
          nome
        },
        select: {
          id: true,
          email: true,
          nome: true,
          createdAt: true
        }
      });

      res.status(201).json({
        message: 'Usuário criado com sucesso',
        user
      });
    } catch (error) {
      console.error('Erro no signup:', error);
      res.status(500).json({ error: 'Erro ao criar usuário' });
    }
  }

  async signin(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      // Validações
      if (!email || !password) {
        res.status(400).json({ error: 'Email e senha são obrigatórios' });
        return;
      }

      // Buscar usuário
      const user = await prisma.user.findUnique({
        where: { email }
      });

      if (!user) {
        res.status(401).json({ error: 'Credenciais inválidas' });
        return;
      }

      // Verificar senha
      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        res.status(401).json({ error: 'Credenciais inválidas' });
        return;
      }

      // Gerar token JWT
      const secret = process.env.JWT_SECRET;

      if (!secret) {
        res.status(500).json({ error: 'Configuração do servidor inválida' });
        return;
      }

      const token = jwt.sign({ userId: user.id }, secret, {
        expiresIn: '7d'
      });

      res.status(200).json({
        message: 'Login realizado com sucesso',
        token,
        user: {
          id: user.id,
          email: user.email,
          nome: user.nome
        }
      });
    } catch (error) {
      console.error('Erro no signin:', error);
      res.status(500).json({ error: 'Erro ao fazer login' });
    }
  }
}

