import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Modalwindow, Overlay } from './Modal.styled';

const RootModal = document.querySelector('#modal-root');

export const ModalWindow = ({ onClose, image }) => {
  const onOverlay = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };
  const { largeImageURL } = image;

  useEffect(() => {
    const KeyPress = e => {
      if (e.code === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', KeyPress);
    return () => {
      document.removeEventListener('keydown', KeyPress);
    };
  }, [onClose]);

  return createPortal(
    <Overlay onClick={onOverlay}>
      <Modalwindow>
        <img src={largeImageURL} alt="IMG" />
      </Modalwindow>
    </Overlay>,
    RootModal
  );
};

ModalWindow.propTypes = {
  image: PropTypes.object,
  onClose: PropTypes.func,
};
