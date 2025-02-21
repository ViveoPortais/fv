export function FooterSignin() {
  return (
    <section className="w-full flex h-[8%] md:h-[5%] flex-col gap-1 md:gap-0 md:flex-row items-center justify-center md:justify-between px-2 md:px-8 py-2 md:py-4 text-xs bg-gray-200 text-gray-800">
      <div className="flex gap-2">
        <a
          href="/Regulamento PSD_22072024.pdf"
          target="_blank"
          rel="noreferrer noopener"
          className="text-[#191970] hover:underline "
        >
          Regulamento
        </a>
        |
        <a
          href="/Programa Vida Rara_Política de Privacidade PSP e PSD_Junho 2024.pdf"
          target="_blank"
          className="text-[#191970] hover:underline "
        >
          Política de Privacidade
        </a>
        |
        <a
          href="https://daiichisankyo.com.br/fale-conosco/"
          target="_blank"
          rel="noreferrer noopener"
          className="text-[#191970] hover:underline "
        >
          Fale Conosco
        </a>
      </div>

      <div className="text-[#191970]">
        Contato Programa Vida Rara 0800 400 3003
      </div>
    </section>
  );
}
