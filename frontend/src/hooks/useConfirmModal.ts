import { useState } from 'react';

interface ConfirmModalState {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  type?: 'danger' | 'warning' | 'info';
}

export const useConfirmModal = () => {
  const [modalState, setModalState] = useState<ConfirmModalState>({
    isOpen: false,
    title: '',
    message: '',
    confirmText: 'CONFIRMAR',
    cancelText: 'CANCELAR',
    type: 'danger'
  });

  const showConfirm = (
    title: string,
    message: string,
    onConfirm: () => void,
    options?: {
      confirmText?: string;
      cancelText?: string;
      type?: 'danger' | 'warning' | 'info';
    }
  ) => {
    setModalState({
      isOpen: true,
      title,
      message,
      onConfirm,
      confirmText: options?.confirmText || 'CONFIRMAR',
      cancelText: options?.cancelText || 'CANCELAR',
      type: options?.type || 'danger'
    });
  };

  const hideConfirm = () => {
    setModalState(prev => ({ ...prev, isOpen: false }));
  };

  const handleConfirm = () => {
    if (modalState.onConfirm) {
      modalState.onConfirm();
    }
    hideConfirm();
  };

  return {
    modalState,
    showConfirm,
    hideConfirm,
    handleConfirm
  };
};
