import { TFunction } from 'react-i18next';
import * as yup from 'yup';

interface ValidateProps{
  t: TFunction<'translation', undefined>
}

export const schema = ({ t } : ValidateProps) => {
  const validation = yup.object({
    email: yup.string().required(t('login.requiredField')).email(),
    password: yup.string().required(t('login.requiredField')),
  }).required();

  return validation;
};
