Este README descreve como configurar, construir e executar o projeto `arrange-client`, incluindo como criar e usar uma imagem Docker.

## `arrange-client`

Este é o repositório do cliente `arrange`.

## Configuração do Projeto

Para configurar o projeto, siga os passos abaixo:

1.  **Instalar Dependências**: Instale as dependências do projeto utilizando `npm` ou `yarn`.
    ```bash
    npm install
    # ou
    yarn install
    ```

2.  **Variáveis de Ambiente**: Crie um arquivo `.env` na raiz do projeto e configure as seguintes variáveis de ambiente:
    * `VITE_API_URL`: A URL base da API. Ex: `http://localhost:8000`
    * `VITE_HEALTH_ENDPOINT`: O endpoint de saúde da API. Ex: `http://localhost:8000/health`

    Exemplo de `.env`:
    ```
    VITE_API_URL=http://localhost:8000
    VITE_HEALTH_ENDPOINT=http://localhost:8000/health
    ```
    O arquivo `src/context/ApiHealthContext.jsx` utiliza `import.meta.env.VITE_API_URL` e `import.meta.env.VITE_HEALTH_ENDPOINT` para verificar a saúde da API.
    O arquivo `src/services/client.js` utiliza `import.meta.env.VITE_API_URL` para definir a URL base do cliente Axios.
    O arquivo `src/services/docClient.js` também utiliza `import.meta.env.VITE_API_URL`.

## Comandos Disponíveis

No diretório do projeto, você pode executar os seguintes comandos:

* **`npm run dev`**: Inicia o servidor de desenvolvimento.
    Abrirá a aplicação em `http://localhost:5173` no seu navegador.
    A página será recarregada se você fizer edições.
    Você também verá quaisquer erros de lint no console.

* **`npm run build`**: Constrói a aplicação para produção na pasta `dist`.
    Ele agrupa o React no modo de produção e otimiza a construção para o melhor desempenho.
    O build é minificado e os nomes dos arquivos incluem hashes.
    Sua aplicação está pronta para ser implantada!

* **`npm run lint`**: Executa o ESLint para verificar e relatar problemas de código.
    A configuração do ESLint está definida em `eslint.config.js`.

* **`npm run preview`**: Serve a aplicação de produção localmente.
    Este comando é útil para verificar a versão de produção da sua aplicação antes de implantá-la.

## Componentes Principais

O projeto utiliza os seguintes componentes e contextos:

* **`CoreLayout`**: Layout principal da aplicação, contendo a barra lateral (`Sidebar`) e o cabeçalho (`Header`).
* **`Sidebar`**: Componente de navegação lateral com links para "Arquivos", "Parâmetros" e "Pacientes".
* **`Header`**: Componente de cabeçalho com busca, status da API e avatar do usuário.
* **`Doc`**: Componente para exibir arquivos PDF.
* **`DocumentDrawer`**: Drawer para upload de documentos.
* **`ParamDrawer`**: Drawer para adicionar novos parâmetros.
* **`PatientDrawer`**: Drawer para adicionar novos pacientes.
* **`ArTable`**: Tabela genérica utilizada para exibir e editar dados extraídos.
* **`ApiHealthContext`**: Contexto que monitora a disponibilidade da API.

## Rotas

As principais rotas da aplicação são:

* `/`: Página inicial.
* `/doc/`: Gerenciamento de documentos.
* `/doc/:id/`: Detalhes e organização de um documento específico.
* `/param/`: Gerenciamento de parâmetros.
* `/patient/`: Gerenciamento de pacientes.

## Hooks Personalizados

O projeto utiliza hooks personalizados para interação com a API:

* **`useArrange`**: Contém hooks para buscar, enviar e atualizar dados de arranjos (métricas, detalhes, pacientes) e para exportar dados.
* **`useDoc`**: Contém hooks para criar, buscar, deletar e buscar arquivos de documentos.
* **`useParam`**: Contém hooks para criar, buscar e deletar parâmetros.
* **`usePatient`**: Contém hooks para criar, buscar e deletar pacientes.
* **`useUser`**: Contém hooks para autenticação e busca de informações do usuário.

## Docker

Para construir e executar o projeto em um contêiner Docker, siga as instruções abaixo:

### Pré-requisitos

* Docker instalado

### Construindo a Imagem Docker

No diretório raiz do projeto, execute o seguinte comando para construir a imagem Docker:

```bash
docker build -t arrange-client .
```

Este comando construirá a imagem e a marcará com o nome `arrange-client`.

### Executando o Contêiner Docker

Após a construção da imagem, você pode executar o contêiner usando o seguinte comando:

```bash
docker run -p 5173:5173 --env-file .env arrange-client
```

* `-p 5173:5173`: Mapeia a porta `5173` do contêiner para a porta `5173` da sua máquina local.
* `--env-file .env`: Carrega as variáveis de ambiente do arquivo `.env` para o contêiner. Certifique-se de que seu arquivo `.env` esteja configurado corretamente.

A aplicação estará acessível em `http://localhost:5173`.