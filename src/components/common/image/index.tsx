'use client'

import Image, { StaticImageData } from 'next/image';
import React, { useState, useEffect } from 'react';
import styles from './style.module.scss';
import classNames from 'classnames';

interface CustomImageProps {
    src: string | StaticImageData | undefined;
    alt: string;
    fallbackSrc?: string | StaticImageData;
    width: number;
    height: number;
    aspectRatio?: '1/1' | '16/9' | '1/2';
    className?: string;
    style?: React.CSSProperties
}

export const OrganizeImage: React.FC<CustomImageProps> = React.memo(({ aspectRatio, className, height, width, src, alt, fallbackSrc, style, ...props }) => {
    const [imgSrc, setImgSrc] = useState<string | StaticImageData>(src || fallbackSrc||'');

    useEffect(() => {
        if (src) {
            setImgSrc(src);
        }
    }, [src]);

    const handleError = () => {
        setImgSrc(fallbackSrc ? fallbackSrc : '');
    };

    const imageClasses = classNames(className, {
        [styles.square]: aspectRatio === '1/1',
        [styles.video]: aspectRatio === '16/9',
        [styles.rectangle]: aspectRatio === '1/2',
    });

    return (
        <Image
            className={imageClasses}
            width={width || 100}
            height={height || 100}
            src={imgSrc as string | StaticImageData}
            alt={alt || 'Image'}
            onError={handleError}
            style={style}
            {...props}
        />
    );
});

OrganizeImage.displayName = 'OrganizeImage';
