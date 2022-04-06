import React, {
  InputHTMLAttributes, useCallback,
} from 'react';
import { UseFormRegister } from 'react-hook-form';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement>{
  icon: string;
  id: string;
  label: string;
  errors?: {
    [x: string]: any;
  };
  register?: UseFormRegister<any>;
  type?: string;
  isDate?: boolean;
  isTelephone?: boolean;
}

export const TextInput = ({
  icon, id, label, errors, register, type = 'text', isDate, isTelephone, ...rest
}:TextInputProps) => {
  const maskDate = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      const { value } = e.currentTarget;

      if (isDate) {
        e.currentTarget.value = value
          .replace(/\D/g, '')
          .replace(/(\d{2})(\d)/, '$1/$2')
          .replace(/(\d{2})(\d)/, '$1/$2')
          .replace(/(\d{4})(\d)/, '$1');
      }

      if (isTelephone) {
        e.currentTarget.value = value
          .replace(/\D/g, '')
          .replace(/(\d{2})(\d)/, '($1) $2')
          .replace(/(\d{5})(\d{4})(\d)/, '$1-$2');
      }
    },
    [],
  );

  return (
    <div>
      <div className="input-field col s6">
        <i className="material-icons prefix">{icon}</i>
        <input id={id} type={type} className="validate" {...register?.(id)} {...rest} onKeyUp={maskDate} />
        <label htmlFor={id}>{label}</label>
      </div>

      {errors?.[id]?.message && (
      <p className="errorLabel">
        {errors?.[id]?.message}
      </p>
      )}
    </div>
  );
};
