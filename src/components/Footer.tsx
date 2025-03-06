type isTall = {
  isTall: boolean;
};

export function Footer({ isTall }: isTall) {
  return (
    <div
      className={`flex gap-2 items-center justify-center border-t-2 border-green-rare w-full px-4 py-4 bg-white ${
        isTall ? "" : "absolute bottom-0 left-0 right-0"
      }`}
    >
      <span className="font-bold">Copyright © 2025. Todos os direitos reservados</span>
    </div>
  );
}
