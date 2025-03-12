# Sistema de Gerenciamento de Movimentações Financeiras

Sistema para controle de finanças pessoais desenvolvido com Laravel (backend) e Vue.js (frontend).

## Estrutura do Projeto

O projeto está dividido em duas partes:

- `backend/`: API REST desenvolvida com Laravel
- `frontend/`: Interface de usuário desenvolvida com Vue.js e Quasar

## Requisitos

### Backend
- PHP >= 8.1
- Composer
- MySQL

### Frontend
- Node.js >= 16
- npm ou yarn

## Instalação

### Backend (Laravel)

1. Entre na pasta do backend:
```bash
cd backend
```

2. Instale as dependências:
```bash
composer install
```

3. Copie o arquivo de ambiente:
```bash
cp .env.example .env
```

4. Configure o banco de dados no arquivo `.env`

5. Gere a chave da aplicação:
```bash
php artisan key:generate
```

6. Gere a chave JWT:
```bash
php artisan jwt:secret
```

7. Execute as migrações:
```bash
php artisan migrate
```

8. Inicie o servidor:
```bash
php artisan serve
```

### Frontend (Vue.js)

1. Entre na pasta do frontend:
```bash
cd frontend
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

## Uso

1. Acesse o frontend em: http://localhost:5173
2. Crie uma conta ou faça login
3. Comece a gerenciar suas finanças!

## Funcionalidades

- Autenticação de usuários
- Gerenciamento de categorias
- Controle de transações (receitas e despesas)
- Dashboard com resumo financeiro

## Tecnologias Utilizadas

### Backend
- Laravel 10
- JWT Auth
- MySQL

### Frontend
- Vue.js 3
- Quasar Framework
- Pinia
- Vue Router
- Axios 