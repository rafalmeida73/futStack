import {
  differenceInYears, isAfter, isValid, parse,
} from 'date-fns';
import * as yup from 'yup';

export const schema = () => {
  const validation = yup.object({
    email: yup.string().required('Campo obrigatório').email('Informe um e-mail valido'),
    name: yup.string().required('Campo obrigatório'),
    telephone: yup.string().required('Campo obrigatório').min(14, 'Insira no mínimo 14 caracteres'),
    birthDdate: yup.string().test('dob', (value, { createError, path }) => {
      if (value) {
        const date = parse(value, 'yyyy-MM-dd', new Date());
        const differenceDates = differenceInYears(Date.now(), date);

        if (!isValid(date)) {
          return createError({
            path,
            message: 'Data inválida',
          });
        }

        if (isAfter(date, Date.now())) {
          return createError({
            path,
            message: 'Não é possível preencher data futura',
          });
        }

        if (differenceDates < 18) {
          return createError({
            path,
            message: 'A idade mínima exigida é 18 anos',
          });
        }

        if (differenceDates > 120) {
          return createError({
            path,
            message: 'A idade máxima permitida é 120 anos',
          });
        }
      }

      return true;
    }).required('Campo obrigatório'),
  }).required();

  return validation;
};
