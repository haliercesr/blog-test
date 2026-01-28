import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface ModalState {
  isOpen: boolean;
  content: ReactNode | null;
  title?: string;
}

interface UIContextType {
  isLoading: boolean;
  loadingMessage: string;
  modal: ModalState;
  showLoader: (message?: string) => void;
  hideLoader: () => void;
  openModal: (content: ReactNode, title?: string) => void;
  closeModal: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

interface UIProviderProps {
  children: ReactNode;
}

export const UIProvider: React.FC<UIProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Cargando...');
  const [modal, setModal] = useState<ModalState>({
    isOpen: false,
    content: null,
    title: undefined,
  });

  const showLoader = useCallback((message: string = 'Cargando...') => {
    setLoadingMessage(message);
    setIsLoading(true);
  }, []);

  const hideLoader = useCallback(() => {
    setIsLoading(false);
  }, []);

  const openModal = useCallback((content: ReactNode, title?: string) => {
    setModal({ isOpen: true, content, title });
  }, []);

  const closeModal = useCallback(() => {
    setModal({ isOpen: false, content: null, title: undefined });
  }, []);

  const value: UIContextType = {
    isLoading,
    loadingMessage,
    modal,
    showLoader,
    hideLoader,
    openModal,
    closeModal,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};

export const useUIContext = (): UIContextType => {
  const context = useContext(UIContext);
  if (!context) {
    throw new Error('useUIContext must be used within a UIProvider');
  }
  return context;
};
