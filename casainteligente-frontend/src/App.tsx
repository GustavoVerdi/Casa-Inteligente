// src/App.tsx
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import {
  FaExclamationCircle,
  FaFan,
  FaMinus,
  FaPlus,
  FaRegLightbulb,
  FaTv,
} from "react-icons/fa";
import { ChevronLeft, ChevronRight, Sun } from "lucide-react";
import BotaoEstado from "./components/ui/botao-estado";

const socket = io("http://localhost:3000", {
  autoConnect: true,
});

interface EstadosDispositivos {
  salaDeEstar: {
    luzes: string;
    tv: { estado: string; canal: number };
    arCondicionado: { estado: string; temperatura: number };
  };
  cozinha: {
    luzes: string;
    geladeira: { temperatura: number; alerta: boolean };
    fogao: { estado: string; potencia: number };
  };
  quarto: {
    luzes: string;
    ventilador: { estado: string; velocidade: number };
    cortinas: string;
  };
}

const App: React.FC = () => {
  const [estadosDispositivos, setEstadosDispositivos] =
    useState<EstadosDispositivos | null>(null);
  const [conectado, setConectado] = useState(socket.connected);

  useEffect(() => {
    if (!conectado) {
      console.log("Tentando conectar...");
      socket.connect();
    }

    socket.on("connect", () => {
      setConectado(true);
      socket.emit("obterEstadoInicial");
    });

    socket.on("estadoInicial", (estado: EstadosDispositivos) => {
      setEstadosDispositivos(estado);
    });

    socket.on("estadoAlterado", ({ comodo, dispositivo, estado }) => {
      setEstadosDispositivos((estadoAnterior: any) => ({
        ...estadoAnterior,
        [comodo]: {
          ...estadoAnterior[comodo],
          [dispositivo]: estado,
        },
      }));
    });

    socket.on("disconnect", () => {
      setConectado(false);
    });

    return () => {
      socket.off("connect");
      socket.off("estadoInicial");
      socket.off("estadoAlterado");
      socket.off("disconnect");
    };
  }, []);

  const handleAtualizacaoDispositivo = (
    comodo: string,
    dispositivo: string,
    novoEstado: any
  ) => {
    socket.emit("atualizarDispositivo", {
      comodo,
      dispositivo,
      estado: novoEstado,
    });
  };

  if (!conectado)
    return (
      <div className="w-full h-screen flex justify-center items-center text-4xl">
        Conectando ao servidor...
      </div>
    );
  if (!estadosDispositivos)
    return (
      <div className="w-full h-screen flex justify-center items-center text-4xl">
        Carregando...
      </div>
    );

  return (
    <>
      <div className="container mx-auto p-6 xl:p-10">
        <h1 className="text-3xl font-semibold text-center mb-6">
          Casa Inteligente
        </h1>

        {/* Sala de Estar */}
        <div className="mb-6 rounded-lg  p-5">
          <h2 className="text-2xl font-medium mb-3">Sala de Estar</h2>
          <section className="grid gap-4">
            {/* Luzes */}
            <BotaoEstado
              estado={estadosDispositivos.salaDeEstar.luzes === "ligado"}
              onClick={() =>
                handleAtualizacaoDispositivo(
                  "salaDeEstar",
                  "luzes",
                  estadosDispositivos.salaDeEstar.luzes === "ligado"
                    ? "desligado"
                    : "ligado"
                )
              }
              icone={<FaRegLightbulb className="h-6" />}
            >
              Luz
            </BotaoEstado>

            {/* TV */}
            <BotaoEstado
              estado={estadosDispositivos.salaDeEstar.tv.estado === "ligado"}
              onClick={() =>
                handleAtualizacaoDispositivo("salaDeEstar", "tv", {
                  ...estadosDispositivos.salaDeEstar.tv,
                  estado:
                    estadosDispositivos.salaDeEstar.tv.estado === "ligado"
                      ? "desligado"
                      : "ligado",
                })
              }
              icone={<FaTv className="h-6" />}
            >
              TV
            </BotaoEstado>
            {estadosDispositivos.salaDeEstar.tv.estado === "ligado" && (
              <div className="flex items-center">
                <span className="mr-3">
                  Canal: {estadosDispositivos.salaDeEstar.tv.canal}
                </span>
                <button
                  onClick={() =>
                    handleAtualizacaoDispositivo("salaDeEstar", "tv", {
                      ...estadosDispositivos.salaDeEstar.tv,
                      canal: estadosDispositivos.salaDeEstar.tv.canal - 1,
                    })
                  }
                  className="bg-gray-600 text-white px-2 py-1 rounded mr-2"
                >
                  <ChevronLeft className="h-6" />
                </button>
                <button
                  onClick={() =>
                    handleAtualizacaoDispositivo("salaDeEstar", "tv", {
                      ...estadosDispositivos.salaDeEstar.tv,
                      canal: estadosDispositivos.salaDeEstar.tv.canal + 1,
                    })
                  }
                  className="bg-gray-600 text-white px-2 py-1 rounded"
                >
                  <ChevronRight className="h-6" />
                </button>
              </div>
            )}
          </section>
        </div>

        {/* Cozinha */}
        <div className="mb-6 rounded-lg  p-5">
          <h2 className="text-2xl font-medium mb-3">Cozinha</h2>
          <section className="grid gap-4">
            {/* Luzes */}
            <BotaoEstado
              estado={estadosDispositivos.cozinha.luzes === "ligado"}
              onClick={() =>
                handleAtualizacaoDispositivo(
                  "cozinha",
                  "luzes",
                  estadosDispositivos.cozinha.luzes === "ligado"
                    ? "desligado"
                    : "ligado"
                )
              }
              icone={<FaRegLightbulb className="h-6" />}
            >
              Luz
            </BotaoEstado>

            {/* Geladeira */}
            <div className=" rounded-lg p-3 flex gap-4 items-center justify-between">
              <div className="flex gap-4 items-center">
                <Sun />
                <span>Geladeira</span>
              </div>
              <div className="flex items-center gap-2">
                <FaMinus
                  className="cursor-pointer"
                  onClick={() =>
                    handleAtualizacaoDispositivo("cozinha", "geladeira", {
                      ...estadosDispositivos.cozinha.geladeira,
                      temperatura:
                        estadosDispositivos.cozinha.geladeira.temperatura - 1,
                    })
                  }
                />
                <span>
                  {estadosDispositivos.cozinha.geladeira.temperatura}°C
                </span>
                <FaPlus
                  className="cursor-pointer"
                  onClick={() =>
                    handleAtualizacaoDispositivo("cozinha", "geladeira", {
                      ...estadosDispositivos.cozinha.geladeira,
                      temperatura:
                        estadosDispositivos.cozinha.geladeira.temperatura + 1,
                    })
                  }
                />
              </div>
            </div>
            {estadosDispositivos.cozinha.geladeira.alerta && (
              <div className="text-red-600 flex gap-2 items-center">
                <FaExclamationCircle />
                Alerta de temperatura!
              </div>
            )}
          </section>
          {/* Fogão */}
          <BotaoEstado
            estado={estadosDispositivos.cozinha.fogao.estado === "ligado"}
            onClick={() =>
              handleAtualizacaoDispositivo("cozinha", "fogao", {
                ...estadosDispositivos.cozinha.fogao,
                estado:
                  estadosDispositivos.cozinha.fogao.estado === "ligado"
                    ? "desligado"
                    : "ligado",
              })
            }
            icone={<Sun className="h-6" />}
          >
            Fogão
          </BotaoEstado>
          {estadosDispositivos.cozinha.fogao.estado === "ligado" && (
            <div className="flex items-center gap-2">
              <span>
                Potência: {estadosDispositivos.cozinha.fogao.potencia}
              </span>
              <FaMinus
                className="cursor-pointer"
                onClick={() =>
                  handleAtualizacaoDispositivo("cozinha", "fogao", {
                    ...estadosDispositivos.cozinha.fogao,
                    potencia: estadosDispositivos.cozinha.fogao.potencia - 1,
                  })
                }
              />
              <FaPlus
                className="cursor-pointer"
                onClick={() =>
                  handleAtualizacaoDispositivo("cozinha", "fogao", {
                    ...estadosDispositivos.cozinha.fogao,
                    potencia: estadosDispositivos.cozinha.fogao.potencia + 1,
                  })
                }
              />
            </div>
          )}
        </div>

        {/* Quarto */}
        <div className="mb-6 rounded-lg  p-5">
          <h2 className="text-2xl font-medium mb-3">Quarto</h2>
          <section className="grid gap-4">
            {/* Luzes */}
            <BotaoEstado
              estado={estadosDispositivos.quarto.luzes === "ligado"}
              onClick={() =>
                handleAtualizacaoDispositivo(
                  "quarto",
                  "luzes",
                  estadosDispositivos.quarto.luzes === "ligado"
                    ? "desligado"
                    : "ligado"
                )
              }
              icone={<FaRegLightbulb className="h-6" />}
            >
              Luz
            </BotaoEstado>

            {/* Ventilador */}
            <BotaoEstado
              estado={estadosDispositivos.quarto.ventilador.estado === "ligado"}
              onClick={() =>
                handleAtualizacaoDispositivo("quarto", "ventilador", {
                  ...estadosDispositivos.quarto.ventilador,
                  estado:
                    estadosDispositivos.quarto.ventilador.estado === "ligado"
                      ? "desligado"
                      : "ligado",
                })
              }
              icone={<FaFan className="h-6" />}
            >
              Ventilador
            </BotaoEstado>
            {estadosDispositivos.quarto.ventilador.estado === "ligado" && (
              <div className="flex items-center gap-2">
                <span>
                  Velocidade: {estadosDispositivos.quarto.ventilador.velocidade}
                </span>
                <FaMinus
                  className="cursor-pointer"
                  onClick={() =>
                    handleAtualizacaoDispositivo("quarto", "ventilador", {
                      ...estadosDispositivos.quarto.ventilador,
                      velocidade:
                        estadosDispositivos.quarto.ventilador.velocidade - 1,
                    })
                  }
                />
                <FaPlus
                  className="cursor-pointer"
                  onClick={() =>
                    handleAtualizacaoDispositivo("quarto", "ventilador", {
                      ...estadosDispositivos.quarto.ventilador,
                      velocidade:
                        estadosDispositivos.quarto.ventilador.velocidade + 1,
                    })
                  }
                />
              </div>
            )}

            {/* Cortinas */}
            <BotaoEstado
              estado={estadosDispositivos.quarto.cortinas === "abertas"}
              onClick={() =>
                handleAtualizacaoDispositivo(
                  "quarto",
                  "cortinas",
                  estadosDispositivos.quarto.cortinas === "fechadas"
                    ? "abertas"
                    : "fechadas"
                )
              }
              icone={<Sun className="h-6" />}
            >
              Cortinas
            </BotaoEstado>
          </section>
        </div>
      </div>
      <footer className="w-full py-4 text-black text-center">
        <p>Desenvolvido por: Gustavo Verdi e Gustavo Henriky Ferreira Bernardes</p>
      </footer>
    </>
  );
};

export default App;
