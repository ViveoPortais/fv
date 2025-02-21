import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type SessionStore = {
  isLogged: boolean;
  email: string;
  role: string;
  name: string;
  token: string;
  changePassword: boolean;
  currentPassword: string;
  session?: string;
  ticket?: string;
  nameInactive?: string;
  crmInactive?: string;
  inactiveType?: string;
  refresh: boolean;
  motivo?: string;
  programCode: string;
  programsCode: string[];
  primeiroAcesso: boolean;
  obrigatorioAlterarSenha: boolean;
  programConsent: boolean;
  setProgramConsent: (programConsent: boolean) => void;
  setPrimeiroAcesso: (primeiroAcesso: boolean) => void;
  setObrigatorioAlterarSenha: (obrigatorioAlterarSenha: boolean) => void;
  setProgramsCode: (programsCode: string[]) => void;
  setProgramCode: (programCode: string) => void;
  setMotivo: (motivo: string) => void;
  setNameInactive: (nameInactive: string) => void;
  setCrmInactive: (crmInactive: string) => void;
  setRefresh: (refresh: boolean) => void;
  setInactiveType: (inactiveType: string) => void;
  setTicket: (ticket: string) => void;
  setSession: (session: string) => void;
  setName: (name: string) => void;
  setEmail: (email: string) => void;
  setRole: (role: string) => void;
  setToken: (token: string) => void;
  setChangePassword: (changePassword: boolean) => void;
  setCurrentPassword: (currentPassword: string) => void;
  onLogin: () => void;
  onLogout: () => void;
};

const useSession = create(
  persist<SessionStore>(
    (set) => ({
      isLogged: false,
      email: "",
      role: "",
      name: "",
      token: "",
      changePassword: false,
      currentPassword: "",
      session: "",
      ticket: "",
      inactiveType: "",
      refresh: false,
      motivo: "",
      programCode: "",
      programsCode: [],
      primeiroAcesso: false,
      obrigatorioAlterarSenha: false,
      programConsent: false,
      setProgramConsent: (programConsent) => set({ programConsent: programConsent }),
      setPrimeiroAcesso: (primeiroAcesso) => set({ primeiroAcesso: primeiroAcesso }),
      setObrigatorioAlterarSenha: (obrigatorioAlterarSenha) => set({ obrigatorioAlterarSenha: obrigatorioAlterarSenha }),
      setProgramsCode: (programsCode) => set({ programsCode: programsCode }),
      setProgramCode: (programCode) => set({ programCode: programCode }),
      setMotivo: (motivo) => set({ motivo: motivo }),
      setNameInactive: (nameInactive) => set({ nameInactive: nameInactive }),
      setCrmInactive: (crmInactive) => set({ crmInactive: crmInactive }),
      setRefresh: (refresh) => set({ refresh: refresh }),
      setInactiveType: (inactiveType) => set({ inactiveType: inactiveType }),
      setTicket: (ticket) => set({ ticket: ticket }),
      setSession: (session) => set({ session: session }),
      setCurrentPassword: (currentPassword) =>
        set({ currentPassword: currentPassword }),
      setName: (name) => set({ name: name }),
      setRole: (role) => set({ role: role }),
      setEmail: (email: string) => set({ email: email }),
      setToken: (token) => set({ token: token }),
      onLogin: () => set({ isLogged: true }),
      onLogout: () =>
        set({
          isLogged: false,
          token: "",
          email: "",
          role: "",
          name: "",
          changePassword: false,
          currentPassword: "",
          inactiveType: "",
          programCode: "",
          programsCode: []
        }),
      setChangePassword: (changePassword) =>
        set({ changePassword: changePassword }),
    }),
    {
      name: "session-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useSession;
