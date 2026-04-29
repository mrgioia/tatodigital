'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

export interface ContactModalConfig {
  intent: 'fale_com_a_tato' | 'estruturar_operacao';
  source: string;
}

interface ContactModalContextType {
  isOpen: boolean;
  config: ContactModalConfig | null;
  openModal: (config: ContactModalConfig) => void;
  closeModal: () => void;
}

const ContactModalContext = createContext<ContactModalContextType | undefined>(undefined);

export function ContactModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [config, setConfig] = useState<ContactModalConfig | null>(null);

  const openModal = useCallback((cfg: ContactModalConfig) => {
    setConfig(cfg);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    // Delay clearing config so exit animation can use it
    setTimeout(() => setConfig(null), 400);
  }, []);

  return (
    <ContactModalContext.Provider value={{ isOpen, config, openModal, closeModal }}>
      {children}
    </ContactModalContext.Provider>
  );
}

export function useContactModal() {
  const context = useContext(ContactModalContext);
  if (!context) {
    throw new Error('useContactModal must be used within ContactModalProvider');
  }
  return context;
}
