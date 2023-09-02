"use client";

import { Dialog } from "primereact/dialog";
import { Dispatch, ReactNode, SetStateAction } from "react";

interface ModalProps {
  title: string;
  description: string;
  visible: boolean;
  setVisible: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  className?: string;
}
export const Modal: React.FC<ModalProps> = ({
  title,
  description,
  visible,
  setVisible,
  children,
  className,
}) => {
  const handleCloseModal = () => {
    setVisible(false);
  };
  return (
    <Dialog
      header={title}
      visible={visible}
      style={{ width: "80vw", maxWidth: '30rem' }}
      onHide={handleCloseModal}
      
    >
      <p className="mb-7 text-sm break-words">{description}</p>
      <div className={className}>{children}</div>
    </Dialog>
  );
};
