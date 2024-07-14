"use client";

import { createContext, useContext, useState } from "react";
import ConfirmationDialog from "@/components/ConfirmationDialog";

interface ConfirmationDialogContextProps {
  show: (message: string, onConfirm: () => void, onCancel: () => void) => void;
  hide: () => void;
}

export const ConfirmationDialogContext = createContext<ConfirmationDialogContextProps | undefined>(undefined);

export const useModal = () => {
  const context = useContext(ConfirmationDialogContext);
  if (!context) {
    throw new Error('useModal must be used within a ConfirmationDialogProvider');
  }
  return context;
};

export default function ConfirmationDialogProvider({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');
  const [onConfirm, setOnConfirm] = useState<() => void>(() => {});
  const [onCancel, setOnCancel] = useState<() => void>(() => {});

  const showModal = (message: string, onConfirm: () => void, onCancel: () => void) => {
    setMessage(message);
    setOnConfirm(() => onConfirm);
    setOnCancel(() => onCancel);
    setShow(true);
  };

  const hideModal = () => {
    setShow(false);
  };

  return (
    <ConfirmationDialogContext.Provider value={{ show: showModal, hide: hideModal }}>
      {children}
      <ConfirmationDialog show={show} message={message} onConfirm={onConfirm} onCancel={onCancel} />
    </ConfirmationDialogContext.Provider>
  );
}