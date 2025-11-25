# 💬 Desafio 4Blue - Chat System

Bem-vindo ao repositório do **Desafio 4Blue**. Este projeto é uma aplicação Full Stack que simula um sistema de chat com diferentes tipos de usuários, respostas automáticas e histórico de mensagens.

A aplicação foi construída separando as responsabilidades entre um **Frontend** moderno e reativo e um **Backend** robusto baseado em API REST.

---

## 🚀 Tecnologias Utilizadas

### Frontend

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Chakra UI](https://img.shields.io/badge/Chakra%20UI-319795?style=for-the-badge&logo=chakra-ui&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)

### Backend

![Django](https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=white)
![Django REST Framework](https://img.shields.io/badge/Django%20REST-ff1714?style=for-the-badge&logo=django&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-07405E?style=for-the-badge&logo=sqlite&logoColor=white)

---

## 🏗️ Arquitetura e Comunicação

O projeto segue uma arquitetura **Client-Server** onde o Frontend e o Backend se comunicam via **HTTP/JSON**.

### Fluxo de Dados

1.  **Interação do Usuário:** O usuário interage com a interface (React/Chakra UI).
2.  **Requisição HTTP:** O Frontend utiliza o `Axios` para enviar dados (ex: nova mensagem) para o Backend.
3.  **Processamento (API):** O Django recebe a requisição, valida os dados com `Serializers` e processa a lógica de negócio (ex: determinar a resposta do sistema baseada no tipo de usuário).
4.  **Persistência:** Os dados são salvos no banco de dados SQLite.
5.  **Resposta:** O Backend retorna um JSON com o resultado.
6.  **Atualização de UI:** O React recebe o JSON e atualiza o estado da tela instantaneamente.

### Diagrama de Relacionamento de Componentes (Frontend)

- **`App.tsx` / `Register.tsx`**: Tela inicial. Gerencia o cadastro/login do usuário e salva sessão (`sessionStorage`).
  - ⬇️ _Navega para_
- **`Chat.tsx`**: O núcleo da aplicação.
  - Envia mensagens via `POST /api/messages/`.
  - Exibe respostas imediatas.
  - ⬇️ _Navega para_
- **`History.tsx`**: Visualização de dados persistidos.
  - Busca histórico via `GET /api/messages/`.
  - Exibe tabela formatada.
- **`Users.tsx`**: Gestão de usuários.
  - Lista todos os usuários cadastrados via `GET /api/users/`.
  - Permite trocar de usuário (login simulado).

---

## 📂 Estrutura do Projeto

```bash
desafio-4blue/
├── backend/                # API Django
│   ├── api/                # App principal (Models, Views, Serializers)
│   ├── project/            # Configurações do projeto (Settings, URLs)
│   └── manage.py           # CLI do Django
│
└── frontend/               # Aplicação React
    ├── src/
    │   ├── components/ui/  # Componentes reutilizáveis (Chakra UI snippets)
    │   ├── pages/          # Páginas (Chat, History, Register, Users)
    │   ├── App.tsx         # Componente Raiz
    │   └── main.tsx        # Configuração de Rotas e Providers
    └── package.json
```

---

## 🔌 Endpoints da API

A comunicação acontece através da URL base: `http://localhost:8000/api/`

| Método | Endpoint             | Descrição                                                              |
| :----- | :------------------- | :--------------------------------------------------------------------- |
| `POST` | [`/users/`](/users/) | Cria um novo usuário (Nome e Tipo A/B).                                |
| `GET`  | [`/users/`](/users/) | Lista todos os usuários cadastrados.                                   |
| `POST` | `/messages/`         | Envia uma mensagem. O backend processa e gera uma resposta automática. |
| `GET`  | `/messages/`         | Busca o histórico. Aceita filtros: `?user_type=A&user_id=1`.           |

---

## 🛠️ Como Executar o Projeto

Siga os passos abaixo para rodar a aplicação localmente.

### Pré-requisitos

- **Node.js** (v18+)
- **Python** (v3.10+)

### 1. Configurando o Backend (Django)

Abra um terminal na pasta [`backend`](backend):

```bash
# 1. Crie um ambiente virtual (opcional, mas recomendado)
python -m venv venv

# 2. Ative o ambiente virtual
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# 3. Instale as dependências
pip install -r requirements.txt

# 4. Execute as migrações do banco de dados
python manage.py migrate

# 5. Inicie o servidor
python manage.py runserver
```

_O backend estará rodando em: `http://localhost:8000`_

### 2. Configurando o Frontend (React)

Abra um terminal na pasta [`frontend`](frontend):

```bash
# 1. Instale as dependências do Node
npm install

# 2. Execute o servidor de desenvolvimento
npm run dev
```

_O frontend estará rodando em: `http://localhost:5173`_

---

## 🧪 Funcionalidades

1.  **Cadastro de Usuário:** Escolha entre Tipo "A" ou "B".
2.  **Chat:** Interface de chat com respostas automáticas baseadas no tipo e nome do usuário.
3.  **Histórico Persistente:** Persistência das mensagens enviadas e recebidas.
4.  **Troca de Usuário:** A página de "Usuários" permite simular o login de diferentes pessoas para testar o comportamento do sistema.
5.  **Design Responsivo:** Utiliza Chakra UI para garantir uma boa aparência em diferentes tamanhos de tela.

---
