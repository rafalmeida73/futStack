import * as yup from 'yup';

export const schema = () => {
  const validation = yup.object({
    email: yup.string().required('Campo obrigatório').email('Informe um e-mail valido'),
    name: yup.string().required('Campo obrigatório'),
    telephone: yup.string().required('Campo obrigatório').min(14, 'Insira no mínimo 14 caracteres'),
    birthDdate: yup.string().required('Campo obrigatório').min(10, 'Insira no mínimo 10 caracteres'),
    password: yup.string().required('Campo obrigatório').min(5, 'Insira no mínimo 5 caracteres'),
  }).required();

  return validation;
};
