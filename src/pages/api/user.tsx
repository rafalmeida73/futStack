import { NextApiRequest, NextApiResponse } from 'next';
import { connect } from '../../utils/database';

interface ErrorResponseType {
    message: string;
}

interface SucessResponseType {
    _id: string;
    nome: string;
    email: string;
    telefone: string;
    nascimento: string;
}

export default async (
  req: NextApiRequest,
  res: NextApiResponse<ErrorResponseType | SucessResponseType>,
): Promise<void> => {
  if (req.method === 'POST') {
    const {
      nome, email, telefone, nascimento,
    } = req.body;

    if (!nome || !email) {
      res.status(400).json({ message: 'Por favor, preencha os campo de nome e e-mail ' });
      return;
    }
    const { db } = await connect();
    await db.collection('users').insertOne({
      nome,
      email,
      telefone,
      nascimento,
    });
  } else {
    res.status(400).json({ message: 'Ocorreu um erro ao cadastrar um novo usuário' });
  }
  res.status(200).json({ message: 'Inserção feita com sucesso!' });
};
