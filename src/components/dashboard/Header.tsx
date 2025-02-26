"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { IoClose } from "react-icons/io5";
import { LuLogOut, LuCheckCircle } from "react-icons/lu";
import { RiLockPasswordLine } from "react-icons/ri";
import { GoPersonAdd } from "react-icons/go";

import api from "@/services/api";
import useSession from "@/hooks/useSession";
import { useLateralRightMenu, useMobilelMenu } from "@/hooks/useMenus";
import { routes } from "@/helpers/routes";

import { MenuIcon } from "../custom/Icon";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "../ui/separator";

import { useProgramColor } from "@/hooks/useProgramColor";
import { getBackgroundColor, getTextColor } from "@/helpers/helpers";
import { AlterPasswordModal } from "./AlterPassword";
import { useModalAlterPassword } from "@/hooks/useModal";
import RegisterRepresentativeModal from "../modals/RegisterRepresentativeModal";
import { useAppDispatch } from "@/store/hooks";
import { addRepresentative } from "@/store/slices/registerRepresentativeSlice";
import { IRegisterRepresentative } from "@/types/user";

export function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const auth = useSession();
  const { isMobileMenuOpen, changeMobileMenu } = useMobilelMenu();
  const { isMenuOpen, changeMenu } = useLateralRightMenu();
  const [currentRoute, setCurrentRoute] = useState("");
  const role = auth.role;
  const colorClass = useProgramColor(auth.programCode);
  const alterPassword = useModalAlterPassword();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch();

  function handleLogout() {
    router.push("/");
    auth.onLogout();
    api.defaults.headers.Authorization = "";
  }

  const handleRegister = async (data: IRegisterRepresentative) => {
    const newData = {
      ...data,
      programCode: auth.programCode,
      profile: "Representante FV",
    };
    await dispatch(addRepresentative(newData));
    setIsModalOpen(false);
  };

  useEffect(() => {
    if (isMobileMenuOpen) {
      changeMobileMenu(isMobileMenuOpen);
    }

    if (isMenuOpen) {
      changeMenu(isMenuOpen);
    }
  }, [pathname]);

  useEffect(() => {
    if (role !== "") {
      let findRoute =
        routes[role]?.general.find((x) => `${x.route}` === pathname) ||
        routes[role]?.programs[auth.programCode]?.find((x) => `${x.route}` === pathname);

      if (pathname.includes("profile")) {
        setCurrentRoute("Meus Dados");
        return;
      }

      if (findRoute) {
        setCurrentRoute(findRoute.text);
      } else {
        setCurrentRoute("");
      }
    }
  }, [auth, pathname]);

  const textColor = getTextColor(auth.programCode);
  const bgColor = getBackgroundColor(auth.programCode);

  return (
    <>
      <header
        id="mobile-header"
        className={`flex lg:hidden h-28 w-full border-b-2 border-zinc-100 items-center justify-between px-8 bg-white ${textColor}`}
      >
        <div>
          <Image src={`/images/logo-rare.png`} width={250} height={50} alt="Programa Rare" className="mt-2" />
        </div>
        <div className="flex items-center justify-center gap-6">
          <span className={`${textColor} font-semibold text-base`}>
            {auth.name.includes(" ") ? auth.name.split(" ")[0] : auth.name}
          </span>
          <div className="hover:opacity-70 cursor-pointer" onClick={() => changeMobileMenu(isMobileMenuOpen)}>
            {isMobileMenuOpen ? <IoClose size={30} /> : <PiDotsThreeVerticalBold size={30} />}
          </div>
        </div>
      </header>

      <nav
        id="mobile-nav"
        className={`absolute top-28 left-0 h-[calc(100vh-102px)] w-screen text-zinc-800 z-50 bg-white ${
          isMobileMenuOpen ? "flex lg:hidden" : "hidden"
        }`}
      >
        <ul className={`flex flex-col mt-8 gap-2 w-full px-4`}>
          {role !== "" && (
            <>
              {routes[role].general.map((profileRoutes) => (
                <Link
                  key={profileRoutes.route}
                  href={`${profileRoutes.route}`}
                  className={`flex gap-x-2 cursor-pointer hover:bg-zinc-100 rounded-lg p-4 ${
                    pathname === profileRoutes.route && `${textColor} hover:text-zinc-800`
                  }`}
                >
                  <MenuIcon icon={profileRoutes.icon} size={24} />
                  {profileRoutes.text}
                </Link>
              ))}

              {auth.programCode &&
                routes[role].programs[auth.programCode]?.map((programRoute) => (
                  <Link
                    key={programRoute.route}
                    href={`${programRoute.route}`}
                    className={`flex gap-x-2 cursor-pointer hover:bg-zinc-100 rounded-lg p-4 ${
                      pathname === programRoute.route && `${textColor} hover:text-zinc-800`
                    }`}
                  >
                    <MenuIcon icon={programRoute.icon} size={24} />
                    {programRoute.text}
                  </Link>
                ))}
            </>
          )}

          <div>
            <div
              className="flex gap-x-2 cursor-pointer hover:bg-zinc-100 rounded-lg p-4"
              onClick={() => alterPassword.openModal(true)}
            >
              <RiLockPasswordLine size={24} />
              Alteração de Senha
            </div>
            <AlterPasswordModal />
          </div>
          <Link
            href={`/dashboard/program`}
            className={`flex gap-x-2 cursor-pointer hover:bg-zinc-100 rounded-lg p-4 ${
              pathname === `/dashboard/program` && `${textColor} hover:text-zinc-800`
            }`}
          >
            <LuCheckCircle size={24} />
            Selecionar Programa
          </Link>
          {role !== "representative" && (
            <button
              onClick={() => {
                setIsModalOpen(true);
                // changeMenu(false);
              }}
              className="flex gap-x-2 cursor-pointer hover:bg-zinc-100 rounded-lg p-4 text-left"
            >
              <GoPersonAdd size={24} />
              Cadastrar
            </button>
          )}
          <Link
            href={`/`}
            className={`flex gap-x-2 cursor-pointer hover:bg-zinc-100 rounded-lg p-4 `}
            onClick={handleLogout}
          >
            <LuLogOut size={24} />
            Logout
          </Link>
        </ul>
        <RegisterRepresentativeModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleRegister}
        />
      </nav>

      <header
        id="desktop-header"
        className="hidden lg:flex h-28 w-full border-b border-zinc-200 items-center justify-between px-12"
      >
        <div>
          <h1 className={`text-lg lg:text-2xl font-semibold ${textColor} flex mt-5`}>Bem-vindo {auth.name}!</h1>
        </div>

        <Sheet open={isMenuOpen} onOpenChange={changeMenu}>
          <SheetTrigger>
            <div className="hover:opacity-70">
              <PiDotsThreeVerticalBold size={32} className={`${textColor}`} />
            </div>
          </SheetTrigger>

          <SheetContent className="m-4 rounded-lg h-auto">
            <SheetHeader>
              <SheetTitle className={`${textColor} text-xl`}>{auth.name}</SheetTitle>
            </SheetHeader>

            <Separator className={`my-4 ${bgColor}`} />

            <div className="text-zinc-700">
              {role === "operation" || role === "supervisor" ? (
                <>
                  <Link
                    href={`/dashboard/program`}
                    className={`flex gap-x-2 cursor-pointer hover:bg-zinc-100 rounded-lg p-4 ${
                      pathname === `/dashboard/program` && `${textColor} hover:text-zinc-800`
                    }`}
                  >
                    <LuCheckCircle size={24} />
                    Selecionar Programa
                  </Link>
                  <button
                    onClick={() => {
                      setIsModalOpen(true);
                      changeMenu(false);
                    }}
                    className="flex gap-x-2 cursor-pointer hover:bg-zinc-100 rounded-lg p-4 text-left"
                  >
                    <GoPersonAdd size={24} />
                    Cadastrar
                  </button>
                  {/* <a
                    href="/Regulamento_Programa_Rare 1.pdf"
                    className={`flex gap-x-2 cursor-pointer hover:bg-zinc-100 rounded-lg p-4`}
                    download={isMobile ? true : false}
                    target={!isMobile ? "_blank" : "_self"}
                    rel="noopener noreferrer"
                  >
                    <LuFolder size={28} />
                    <span className="text-lg">Regulamento</span>
                  </a> */}
                  <Link
                    href={`/`}
                    className={` text-lg flex gap-x-2 cursor-pointer hover:bg-zinc-100 rounded-lg p-4 `}
                    onClick={handleLogout}
                  >
                    <LuLogOut size={28} />
                    Logout
                  </Link>
                </>
              ) : (
                <>
                  <div>
                    <div
                      className="flex gap-x-2 cursor-pointer hover:bg-zinc-100 rounded-lg p-4"
                      onClick={() => alterPassword.openModal(true)}
                    >
                      <RiLockPasswordLine size={24} />
                      Alteração de Senha
                    </div>
                    <AlterPasswordModal />
                  </div>
                  <Link
                    href={`/dashboard/program`}
                    className={`flex gap-x-2 cursor-pointer hover:bg-zinc-100 rounded-lg p-4 ${
                      pathname === `/dashboard/program` && `${textColor} hover:text-zinc-800`
                    }`}
                  >
                    <LuCheckCircle size={24} />
                    Selecionar Programa
                  </Link>
                  <Link
                    href={`/`}
                    className={` text-lg flex gap-x-2 cursor-pointer hover:bg-zinc-100 rounded-lg p-4 `}
                    onClick={handleLogout}
                  >
                    <LuLogOut size={28} />
                    Logout
                  </Link>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
        <RegisterRepresentativeModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleRegister}
        />
      </header>
    </>
  );
}
