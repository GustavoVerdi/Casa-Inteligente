# Casa Inteligente

**Desenvolvido por**: [@GustavoVerdi](https://github.com/GustavoVerdi/) e [@Henrikygustavo](https://github.com/Henrikygustavo/)

## Passo a passo para rodar o projeto

---

### Clonar o repositório

Abra o terminal powershell e clone o repositório com o seguinte comando:

```PowerShell
git clone https://github.com/GustavoVerdi/Casa-Inteligente.git
```

## Configuração do Backend

**1. Abrir o projeto no VSCode**

No VS Code, navegue até File > Open Folder... e selecione a pasta Casa-Inteligente que você acabou de clonar.

**2. No VSCode, abra o terminal em Terminal > New Terminal**

Selecione PowerShell como o terminal.

Navegue até a pasta do backend:
```powershell
cd .\casainteligente-backend
```

**3. Instalação das dependências**

Instale as dependências do projeto executando os comandos abaixo:

```powershell
npm install -g typescript
npm i
```

**4. Iniciar o servidor em modo de desenvolvimento**

Após instalar as dependências, inicie o servidor com o comando:

```powershell
npm run dev
```

Esse comando iniciará o backend em modo de desenvolvimento, e o terminal mostrará as mensagens de log, indicando que o servidor está em execução.

### Configuração do Frontend

**1. Navegar até a pasta do frontend**

No VS Code, abra outro terminal PowerShell, dentro dele navegue até a pasta do frontend com:

```powershell
cd .\casainteligente-frontend
```

**2. Instalar as dependências**

No terminal PowerShell, execute o seguinte comando para instalar as dependências do frontend:

```powershell
npm i
```
**3. Iniciar o frontend em modo de desenvolvimento**

Após instalar as dependências, inicie o frontend com o comando:

```powershell
npm start server
```

![image](https://github.com/user-attachments/assets/9df9e2d2-d48d-4621-9377-705f92d20f7f)

Ao aparece a mensagem acima apenas precione a tecla Y, para alternar a porta para 3001 pois a mesma se encontra em uso no backend,

Esse comando abrirá o frontend no navegador padrão, geralmente em http://localhost:3001. Você poderá então interagir com a interface para controlar os dispositivos simulados.

