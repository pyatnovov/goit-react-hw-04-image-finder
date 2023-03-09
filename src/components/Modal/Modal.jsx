import { Component } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Modalwindow, Overlay } from './Modal.styled';

const RootModal = document.querySelector('#modal-root');
export class ModalWindow extends Component {
  KeyPress = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };
  Overlay = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  componentDidMount() {
    window.addEventListener('keydown', this.KeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.KeyPress);
  }

  render() {
    const { largeImageURL } = this.props.image;
    return createPortal(
      <Overlay onClick={this.Overlay} className="Overlay">
        <Modalwindow className="Modal">
          <img src={largeImageURL} alt="IMG" />
        </Modalwindow>
      </Overlay>,
      RootModal
    );
  }
}

ModalWindow.propTypes = {
  image: PropTypes.object,
  onClose: PropTypes.func,
};
