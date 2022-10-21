import * as yup from 'yup';

export const schema = () => {
  const validation = yup.object({
    time: yup.string().required('Campo obrigatório').min(1, 'Insira no mínimo 1 numero'),
  }).required();

  return validation;
};
