import { TFunction } from 'react-i18next';
import * as yup from 'yup';

interface ValidateProps{
  t: TFunction<'translation', undefined>
}

export const schema = ({ t } : ValidateProps) => {
  const validation = yup.object({
    email: yup.string().required(t('requiredField')).email(),
    name: yup.string().required(t('requiredField')),
    telephone: yup.string().required(t('requiredField')),
    birthDdate: yup.string().required(t('requiredField')),
    password: yup.string().required(t('requiredField')),
  }).required();

  return validation;
};
