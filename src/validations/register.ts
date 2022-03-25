import { TFunction } from 'react-i18next';
import * as yup from 'yup';

interface ValidateProps{
  t: TFunction<'translation', undefined>
}

export const schema = ({ t } : ValidateProps) => {
  const validation = yup.object({
    email: yup.string().required(t('register.requiredField')).email(),
    name: yup.string().required(t('register.requiredField')),
    telephone: yup.string().required(t('register.requiredField')),
    birthDdate: yup.string().required(t('register.requiredField')),
    password: yup.string().required(t('register.requiredField')),
  }).required();

  return validation;
};
