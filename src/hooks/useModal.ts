import { create } from "zustand";

interface ModalProps {
  isModalOpen: boolean;
  openModal: (action: boolean) => void;
  text?: string;
  handleYes?: () => void;
  handleNo?: (id?: string) => void;
  showOkButton?: boolean;
}

export const useModal = create<ModalProps>((set) => ({
  isModalOpen: false,
  openModal: (action) => set(() => ({ isModalOpen: action })),
}));

export const useAccept = create<ModalProps>((set) => ({
  isModalOpen: false,
  openModal: (action) => set(() => ({ isModalOpen: action })),
}));

export const useModalEmail = create<ModalProps>((set) => ({
  isModalOpen: false,
  openModal: (action) => set(() => ({ isModalOpen: action })),
}));

export const passwordErr = create<ModalProps>((set) => ({
  isModalOpen: false,
  openModal: (action) => set(() => ({ isModalOpen: action })),
}));

export const passwordCorrect = create<ModalProps>((set) => ({
  isModalOpen: false,
  openModal: (action) => set(() => ({ isModalOpen: action })),
}));

export const acceptPreRegisterModal = create<ModalProps>((set) => ({
  isModalOpen: false,
  openModal: (action) => set(() => ({ isModalOpen: action })),
}));

export const modalRegisterUser = create<ModalProps>((set) => ({
  isModalOpen: false,
  openModal: (action) => set(() => ({ isModalOpen: action })),
}));

export const useModalRescue = create<ModalProps>((set) => ({
  isModalOpen: false,
  openModal: (action) => set(() => ({ isModalOpen: action })),
}));

export const useModalInativePartial = create<ModalProps>((set) => ({
  isModalOpen: false,
  openModal: (action) => set(() => ({ isModalOpen: action })),
}));

export const useModalTotalPartial = create<ModalProps>((set) => ({
  isModalOpen: false,
  openModal: (action) => set(() => ({ isModalOpen: action })),
}));

export const useModalAlterPassword = create<ModalProps>((set) => ({
  isModalOpen: false,
  openModal: (action) => set(() => ({ isModalOpen: action })),
}));

export const useModalInvitationRegister = create<ModalProps>((set) => ({
  isModalOpen: false,
  openModal: (action) => set(() => ({ isModalOpen: action })),
}));

export const useModalDeliveryEmail = create<ModalProps>((set) => ({
  isModalOpen: false,
  openModal: (action) => set(() => ({ isModalOpen: action })),
}));

export const useModalGeneric = create<ModalProps>((set) => ({
  isModalOpen: false,
  openModal: (action) => set(() => ({ isModalOpen: action })),
  text: '',
  handleYes: () => { },
  handleNo: () => { },
}));

export const useModalContent = create<ModalProps>((set) => ({
  isModalOpen: false,
  openModal: (action) => set(() => ({ isModalOpen: action })),
  showOkButton: false,
}));