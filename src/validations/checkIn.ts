import * as yup from 'yup';

export const schema = () => {
  const validation = yup.object({
    name: yup.string().required('Campo obrigatório').min(3, 'Insira no mínimo 3 caracteres'),
    position: yup.string().required('Campo obrigatório'),
  }).required();

  return validation;
};
