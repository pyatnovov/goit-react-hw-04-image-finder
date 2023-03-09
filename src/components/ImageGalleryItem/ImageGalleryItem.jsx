import { useState } from 'react';
import PropTypes from 'prop-types';
import { ModalWindow } from 'components/Modal/Modal';
import {
  ImageGalleryItems,
  ImageGalleryItemImage,
} from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ item }) => {
  const [show, setShow] = useState(false);
  const Modal = () => {
    setShow(!show);
  };

  const { webformatURL } = item;
  return (
    <ImageGalleryItems className="ImageGalleryItem">
      <ImageGalleryItemImage
        onClick={Modal}
        className="ImageGalleryItemImage"
        src={webformatURL}
        alt="img"
      />
      {show && <ModalWindow onClose={Modal} image={item} />}
    </ImageGalleryItems>
  );
};

ImageGalleryItem.propTypes = {
  item: PropTypes.object.isRequired,
};
