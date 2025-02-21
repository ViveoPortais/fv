type isTall = {
  isTall: boolean;
}

export function Footer({ isTall }: isTall) {
  return (
    <div className={`flex gap-2 items-center justify-center border-t-2 border-green-rare w-full px-4 py-4 bg-white ${isTall ? '' : 'absolute bottom-0 left-0 right-0'}`}>
      <span
        className="font-bold"
      >
        Copyright © 2024. Todos os direitos reservados
      </span>
      |
      <a
        href="/Regulamento_Programa_Rare 1.pdf"
        target="_blank"
        className="text-zinc-500 hover:text-green-rare transition-colors duration-200"
      >
        Regulamento
      </a>
      |
      <a
        href="/Aviso de Privacidade Programa Rare - v4.pdf"
        target="_blank"
        className="text-zinc-500 hover:text-green-rare transition-colors duration-200"
      >
        Aviso de Privacidade
      </a>
    </div>
  );
}
