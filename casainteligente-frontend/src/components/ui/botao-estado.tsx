import { twMerge } from "tailwind-merge";

type BotaoEstadoProps = {
  estado: boolean;
  onClick: (estado: boolean) => void;
  icone: React.ReactNode;
  children: React.ReactNode;
};

export default function BotaoEstado({
  estado,
  onClick,
  icone,
  children,
}: BotaoEstadoProps) {
  return (
    <button
      onClick={() => onClick(!estado)}
      className={twMerge(
        `transition-all flex justify-center items-center gap-2 px-6 py-4 ${
          estado ? "bg-green-500" : "bg-red-500"
        } text-white`
      )}
    >
      {icone}
      {children}
    </button>
  );
}
