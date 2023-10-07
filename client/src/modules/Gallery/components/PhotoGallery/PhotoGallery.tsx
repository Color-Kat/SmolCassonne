import React from 'react';
// @ts-ignore
import ImageGallery from 'react-image-gallery';

interface PhotoGalleryProps {
    photos: string[];
}

export const PhotoGallery: React.FC<PhotoGalleryProps> = ({photos}) => {


    return (
        <ImageGallery
            items={photos.map(item => ({
                original: item,
                thumbnail: item
            }))}
            additionalClass="xl:max-w-xl md:max-w-md w-full mx-auto flex-1"
            infinite
            showThumbnails
            showFullscreenButton
            showPlayButton={false}
        />
    );
}