import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryes } from './ImageGallery.styled';

import PropTypes from 'prop-types';

export function ImageGallery({ items }) {
  return (
    <ImageGalleryes className="ImageGallery">
      {items.map(item => (
        <ImageGalleryItem key={item.id} item={item} />
      ))}
    </ImageGalleryes>
  );
}
ImageGallery.propTypes = {
  items: PropTypes.array,
};
