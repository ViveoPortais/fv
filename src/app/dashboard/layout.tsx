'use client';

import { Loading } from "@/components/custom/Loading";
import { AlterPasswordModal } from "@/components/dashboard/AlterPassword";
import { Header } from "@/components/dashboard/Header";
import { Navbar } from "@/components/dashboard/Navbar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getTextColor } from "@/helpers/helpers";
import { routes } from "@/helpers/routes";
import { useLateralMenu } from "@/hooks/useMenus";
import { useModalAlterPassword } from "@/hooks/useModal";
import { useProgramColor } from "@/hooks/useProgramColor";
import useSession from "@/hooks/useSession";
import api from "@/services/api";
import { getUserInfo } from "@/services/user";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { isMenuOpen } = useLateralMenu();
  const { role, isLogged, token, obrigatorioAlterarSenha, primeiroAcesso, setProgramConsent } = useSession();
  const router = useRouter();
  const auth = useSession();
  const colorClass = useProgramColor(auth.programCode);
  const [loading, setLoading] = useState(true);
  const alterPasswordModal = useModalAlterPassword();
  const [hasOpenedModal, setHasOpenedModal] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      if (!isLogged) {
        router.push('/');
        return;
      }

      if (token)
        api.defaults.headers.Authorization = `Bearer ${token}`;

      if (role) {
        router.push("/dashboard/program");
        setLoading(false);
        return;
      }
    };

    checkAuth();
  }, [isLogged, role, token, router, primeiroAcesso]);

  useEffect(() => {
    if (isLogged && role && !hasOpenedModal)
      setHasOpenedModal(true);
  }, [isLogged, role, hasOpenedModal]);

  useEffect(() => {
    if (obrigatorioAlterarSenha && !hasOpenedModal) {
      alterPasswordModal.openModal(true);
      setHasOpenedModal(true);
    }
  }, [obrigatorioAlterarSenha, alterPasswordModal, hasOpenedModal]);

  const textColor = getTextColor(auth.programCode);

  if (loading) {
    return (
      <div className="flex items-center justify-center w-screen h-screen bg-gray-200"
        style={{
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.7)), url(/images/Fundo PFV.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      >
        <Loading size={60} customClass={`${textColor}`} />
      </div>
    );
  }

  return (
    <main className={`h-screen w-screen relative`}>
      <Navbar />

      <div
        className={`lg:absolute lg:right-0 lg:top-0 h-screen overflow-auto ${isMenuOpen ? "w-full lg:w-3/4" : "w-full lg:w-[calc(100%-100px)]"
          } transition-all flex flex-col items-center justify-center`}
      >
        <ScrollArea className="w-full min-h-screen">
          <Header />
          <div className="px-4 lg:px-6 py-4 lg:py-8 w-full h-full">
            {children}
          </div>
        </ScrollArea>
      </div>
      <AlterPasswordModal />
    </main>
  );
}
