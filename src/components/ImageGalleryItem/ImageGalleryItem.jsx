import { Component } from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'components/Modal/Modal';
import { ImageGalleryItems,ImageGalleryItemImage } from './ImageGalleryItem.styled';


export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };
  Modal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  render() {
    const { item } = this.props;
    const { webformatURL } = item; ;
    return (
      <ImageGalleryItems className="ImageGalleryItem">
        <ImageGalleryItemImage
          onClick={this.Modal}
          className="ImageGalleryItemImage"
          src={webformatURL}
          alt="img"
        />
        {this.state.showModal && <Modal onClose={this.Modal} image={item} />}
      </ImageGalleryItems>
    );
  }
}
ImageGalleryItem.propTypes = {
  item: PropTypes.object.isRequired,
};
