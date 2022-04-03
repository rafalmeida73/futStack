import * as yup from 'yup';

export const schema = () => {
  const validation = yup.object({
    email: yup.string().required('Campo obrigatório').email('Informe um e-mail valido'),
    name: yup.string().required('Campo obrigatório'),
    telephone: yup.string().required('Campo obrigatório'),
    birthDdate: yup.string().required('Campo obrigatório'),
    password: yup.string().required('Campo obrigatório'),
  }).required();

  return validation;
};
