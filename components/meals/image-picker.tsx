'use client'

import { ChangeEvent, useRef, useState } from 'react';
import styles from './image-picker.module.css'
import Image from 'next/image';

interface ImagePickerProps {
    label: string;
    name: string;
}

export default function ImagePicker({label, name}:ImagePickerProps) {

    const imageInput = useRef<HTMLInputElement>(null);
    const [pickedImage, setPickedImage] = useState<string>();

    const onButtonClick = () => {
        imageInput.current?.click()
    }

    const onInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target.files)
            return

        const file = event.target.files[0];

        if (!file){
            setPickedImage('');
            return
        }

        const fileReader = new FileReader();
        fileReader.onload = () => {
            if (!fileReader.result)
                return;

            setPickedImage(fileReader.result as string)
        }

        fileReader.readAsDataURL(file);
    }

    return (
        <div className={styles.picker}>
            <label htmlFor={name}>{label}</label>
            <div className={styles.controls}>
                <div className={styles.preview}>
                    {!pickedImage && <p>No image picked yet.</p>}
                    {pickedImage && <Image src={pickedImage} fill alt='picked image' />}
                </div>
                <input ref={imageInput} required onChange={onInputChange} className={styles.input} type="file" id={name} accept='image/png, image/jpeg' name={name}/>
                <button className={styles.button} type='button' onClick={onButtonClick}>
                    Pick an Image
                </button>
            </div>
        </div>
    )
}