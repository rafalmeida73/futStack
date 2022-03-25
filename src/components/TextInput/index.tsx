import { InputHTMLAttributes } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import styles from './TextInput.module.scss';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement>{
  icon: string;
  id: string;
  label: string;
  errors?: {
    [x: string]: any;
  };
  register?: UseFormRegister<FieldValues>
  type?: string
}

export const TextInput = ({
  icon, id, label, errors, register, type = 'text', ...rest
}:TextInputProps) => (
  <div className={styles.container}>
    <div className="input-field col s6">
      <i className="material-icons prefix">{icon}</i>
      <input id={id} type={type} className="validate" {...register?.(id)} {...rest} />
      <label htmlFor={id}>{label}</label>
    </div>

    {errors?.[id]?.message && (
      <p className="errorLabel">
        {errors?.[id]?.message}
      </p>
    )}
  </div>
);
