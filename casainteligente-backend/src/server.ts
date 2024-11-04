import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import cors from 'cors';

const app = express();
app.use(cors());

const servidor = http.createServer(app);
const io = new Server(servidor, {
  cors: {
    origin: '*',
  },
});

// Estados dos dispositivos (mock)
let estadosDispositivos: any = {
  salaDeEstar: {
    luzes: 'desligado',
    tv: { estado: 'desligado', canal: 1 },
    arCondicionado: { estado: 'desligado', temperatura: 22 },
  },
  cozinha: {
    luzes: 'desligado',
    geladeira: { temperatura: 3, alerta: false },
    fogao: { estado: 'desligado', potencia: 1 },
  },
  quarto: {
    luzes: 'desligado',
    ventilador: { estado: 'desligado', velocidade: 1 },
    cortinas: 'fechadas',
  },
};

io.on('connection', (socket) => {
  console.log('Usuário conectado');

  socket.on('disconnect', () => {
    console.log('Usuário desconectado');
  });

  socket.on('obterEstadoInicial', () => {
    // Enviar estados atuais na conexão
    socket.emit('estadoInicial', estadosDispositivos);
  });

  // Manipular alterações
  socket.on('atualizarDispositivo', (dados) => {
    const { comodo, dispositivo, estado } = dados;

    if (!estadoValido(comodo, dispositivo, estado)) return;

    console.log('Estado antigo', estadosDispositivos[comodo][dispositivo]);
    estadosDispositivos[comodo][dispositivo] = estado;
    console.log('Novo estado', estadosDispositivos[comodo][dispositivo]);

    io.emit('estadoAlterado', { comodo, dispositivo, estado });
  });
});

function estadoValido(
  comodo: string,
  dispositivo: string,
  estado: any,
): boolean {
  if (comodo === 'quarto' && dispositivo === 'ventilador') {
    return estadoVentiladorValido(estado);
  }

  if (comodo === 'cozinha' && dispositivo === 'fogao') {
    return estadoFogaoValido(estado);
  }

  if (comodo === 'salaDeEstar' && dispositivo === 'arCondicionado') {
    return estadoArCondicionadoValido(estado);
  }

  return true;
}

function estadoVentiladorValido(
  estadoVentilador: typeof estadosDispositivos.quarto.ventilador,
): boolean {
  return estadoVentilador.velocidade > 0 && estadoVentilador.velocidade < 4;
}

function estadoFogaoValido(estadoFogao: any): boolean {
  return estadoFogao.potencia > 0 && estadoFogao.potencia < 4;
}

function estadoArCondicionadoValido(estadoArCondicionado: any): boolean {
  return (
    estadoArCondicionado.temperatura > 16 &&
    estadoArCondicionado.temperatura < 31
  );
}

servidor.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
