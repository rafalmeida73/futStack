import { NextApiRequest, NextApiResponse } from 'next';
import { connect } from '../../../utils/database';

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

    if (!nome || !email || !telefone || !nascimento) {
      res.status(400).json({ message: 'falta preencher os campos!! ' });
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
    res.status(400).json({ message: ' Erro mano!!' });
  }
  res.status(200).json({ message: 'inserção feita!' });
};
