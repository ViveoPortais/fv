"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

import { useLateralMenu } from "@/hooks/useMenus";
import useSession from "@/hooks/useSession";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Ebook } from "@/components/Ebook";
import { Documents } from "@/components/Documents";
import { usePageHeight } from "@/hooks/usePageHeight";

interface HomeLayoutProps {
  children: ReactNode;
}

export default function HomeLayout({ children }: HomeLayoutProps) {
  const { isMenuOpen } = useLateralMenu();
  const { role, isLogged } = useSession();
  const router = useRouter();
  const pathname = usePathname();
  const verifyHeight = usePageHeight();

  useEffect(() => {
    if (
      !isLogged &&
      pathname !== "/login" &&
      pathname !== "/ebook" &&
      pathname !== "/documents" &&
      pathname !== "/signin" &&
      pathname !== "/forget/password" &&
      pathname !== "/signup" &&
      // pathname !== "/profile" &&
      pathname !== "/signup/doctor"
    ) {
      router.push("/");
    }
  }, [isLogged, router, pathname]);

  if (pathname === "/ebook") {
    return <Ebook />;
  }

  if (pathname === "/documents") {
    return (
      <div>
        <Documents />
      </div>
    );
  }

  return (
    <main className="h-screen w-screen overflow-x-hidden">
      <div className="w-full h-full md:h-screen grid grid-cols-1 xl:grid-cols-3 bg-[#fff] backgroundHome py-2 xl:py-8 xl:px-20">
        <div className="hidden xl:flex items-center justify-center text-white p-12" />

        <div className="flex items-center justify-center xl:col-span-2 xl:justify-end">
          <ScrollArea className="flex flex-col items-center justify-center p-4 md:p-8 mx-4 max-h-[90vh] md:max-h-[85vh]">
            <div className="w-full flex items-center justify-between">
              <Image
                src="/images/logo-rare.png"
                width={160}
                height={100}
                alt="logoRare"
                className="mb-3 mr-5"
              />
              <a href="https://www.sanoficonecta.com.br/" target="_blank" rel="noopener noreferrer">
                <Image
                  src="/images/logo-conecta.png"
                  width={160}
                  height={80}
                  alt="logoConecta"
                  className="mb-3"
                />
              </a>
            </div>
            {children}
          </ScrollArea>
        </div>
      </div>
      {/* <Footer isTall={verifyHeight} /> */}
    </main>
  );
}
