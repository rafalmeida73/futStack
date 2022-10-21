import Image from 'next/image';
import React, { InputHTMLAttributes, useState } from 'react';
import { Event } from '../../utils/types/inputFileType';
import styles from './ImageInput.module.scss';

interface ImageInputProps extends InputHTMLAttributes<HTMLInputElement>{
  setImage: React.Dispatch<React.SetStateAction<File>>
  defaultImage?: string
}

const ImageInput = ({ setImage, defaultImage = '/profileDefault.png' }: ImageInputProps) => {
  const [imageSrc, setImageSrc] = useState(defaultImage);

  const handleChange = (e: Event<HTMLInputElement>) => {
    if (e?.target?.files?.[0]) {
      setImage(e.target.files[0]);
      setImageSrc(URL.createObjectURL(e.target.files[0]));
    }
  };

  return (
    <div className={styles.container}>
      <div className="file-field input-field">
        <div>
          <Image
            src={imageSrc}
            width={80}
            height={80}
            alt="editar avatar"
            title="Editar avatar"
          />
          <input type="file" onChange={(e) => handleChange(e)} accept="image/png, image/gif, image/jpeg" title="Editar avatar" />
        </div>
      </div>
    </div>
  );
};

export default ImageInput;
