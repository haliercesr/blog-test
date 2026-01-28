import React, { useEffect, useCallback } from 'react';
import { X } from 'lucide-react';
import { useUIContext } from '../../context';
import {
  ModalOverlay,
  ModalContainer,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ModalContent,
} from './Modal.styles';

export const Modal: React.FC = () => {
  const { modal, closeModal } = useUIContext();

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    },
    [closeModal]
  );

  useEffect(() => {
    if (modal.isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [modal.isOpen, handleKeyDown]);

  if (!modal.isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContainer>
        <ModalHeader>
          <ModalTitle>{modal.title || 'Modal'}</ModalTitle>
          <CloseButton onClick={closeModal}>
            <X size={20} />
          </CloseButton>
        </ModalHeader>
        <ModalContent>{modal.content}</ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );
};
