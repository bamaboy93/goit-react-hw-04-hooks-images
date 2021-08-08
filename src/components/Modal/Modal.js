import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  static propTypes = {
    onCloseModal: PropTypes.func,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.onKeydownClick);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeydownClick);
  }

  onKeydownClick = e => {
    const { onCloseModal } = this.props;
    if (e.code === 'Escape') {
      onCloseModal();
    }
  };
  onBackdropClick = e => {
    const { onCloseModal } = this.props;
    if (e.currentTarget === e.target) {
      onCloseModal();
    }
  };

  render() {
    return createPortal(
      <div className="Overlay" onClick={this.onBackdropClick}>
        <div className="Modal">{this.props.children}</div>
      </div>,
      modalRoot,
    );
  }
}
