# Casa Inteligente

**Desenvolvido por**: [@GustavoVerdi](https://github.com/GustavoVerdi/) e [@Henrikygustavo](https://github.com/Henrikygustavo/)

## Passo a passo para rodar o projeto

---

## Configuração do Backend

### 1. Clonar o repositório

Abra o terminal powershell e clone o repositório com o seguinte comando:

```powershell
git clone https://github.com/GustavoVerdi/Casa-Inteligente.git
```

2. Abrir o projeto no VS Code
No VS Code, navegue até File > Open Folder... e selecione a pasta Casa-Inteligente que você acabou de clonar.

3. Abrir o terminal (PowerShell) e navegar até a pasta do backend
No VS Code, abra o terminal em Terminal > New Terminal ou use o atalho Ctrl + Shift + ~.

Selecione PowerShell como o terminal.

Navegue até a pasta do backend:
``powershell
cd .\Casa-Inteligente\Casaint\casainteligente-backend``

4. Instalar as dependências
Instale as dependências do projeto executando os comandos abaixo:

```powershell
npm install -g typescript
npm install
```
5. Iniciar o servidor em modo de desenvolvimento
Após instalar as dependências, inicie o servidor com o comando:

```powershell
npm run dev
```

Esse comando iniciará o backend em modo de desenvolvimento, e o terminal mostrará as mensagens de log, indicando que o servidor está em execução.

Configuração do Frontend
1. Clonar o repositório (caso ainda não tenha feito)
Se você ainda não clonou o repositório, faça isso executando o comando abaixo no terminal PowerShell:

```powershell
git clone https://github.com/GustavoVerdi/Casa-Inteligente.git
```
2. Navegar até a pasta do frontend
Após clonar o repositório, navegue até a pasta do frontend:

```powershell
cd .\Casa-Inteligente\casainteligente-frontend
```
Ou, se estiver usando o VS Code, abra o terminal PowerShell dentro dele, indo em Terminal > New Terminal ou usando o atalho Ctrl + Shift + ~, e então navegue até a pasta do frontend com:

```powershell
cd .\Casa-Inteligente\casainteligente-frontend
```
3. Instalar as dependências
No terminal PowerShell, execute o seguinte comando para instalar as dependências do frontend:

```powershell
npm install
```
4. Iniciar o frontend em modo de desenvolvimento
Após instalar as dependências, inicie o frontend com o comando:

```powershell
npm start server
```
Esse comando abrirá o frontend no navegador padrão, geralmente em http://localhost:3000. Você poderá então interagir com a interface para controlar os dispositivos simulados.

