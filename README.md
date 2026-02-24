# 🚀 Task Manager App

Aplicação web de gerenciamento de tarefas desenvolvida com **Next.js + React**, autenticação via **Google (NextAuth)** e armazenamento de dados no **Firebase (Firestore)**.

---

## 📸 Funcionalidades

✅ Cadastro e login com Google  
✅ Autenticação segura com NextAuth  
✅ CRUD de tarefas (criação, edição, exclusão e listagem)  
✅ Tarefas vinculadas ao usuário logado  
✅ Persistência em tempo real com Firebase Firestore  
✅ Proteção de rotas privadas  

---

## 🛠️ Tecnologias utilizadas

- Next.js
- React
- NextAuth
- Firebase (Firestore)
- TypeScript (opcional)
- Tailwind / CSS Modules (opcional)

---

## 📂 Estrutura do projeto

├─ app/
├─ components/
├─ services/
│ └─ firebase.ts
├─ pages/api/auth/[...nextauth].ts
├─ hooks/
├─ context/
└─ styles/


---

## ⚙️ Configuração do ambiente

### 1- Clonar o projeto

```bash
git clone https://github.com/seu-usuario/task-manager.git
cd task-manager
```

### 2- Instalar Dependências


```bash
npm install
# ou
yarn
```

### 3- Criar arquivo .env.local

Na raiz do projeto, crie:

```bash
.env.local
```

Adicione suas chaves do Google + Firebase + NextAuth:

```bash

# NEXTAUTH
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=sua_chave_super_secreta

# GOOGLE AUTH
GOOGLE_CLIENT_ID=seu_google_client_id
GOOGLE_CLIENT_SECRET=seu_google_client_secret

# FIREBASE
NEXT_PUBLIC_FIREBASE_API_KEY=sua_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=seu_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=seu_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=seu_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=seu_app_id
```

Nunca versionar o .env.local no Git

### 4- Configuração do Firebase

1. Acesse o Firebase Console

2. Crie um novo projeto

3. Ative:

Authentication → Google

Firestore Database

4. Copie as credenciais para o .env.local

### Rodando o Projeto

```bash
npm run dev
```

Abra:

```bash
http://localhost:3000
```

### Autenticação (NextAuth)

Crie um arquivo nesse caminho exato.

```bash
pages/api/auth/[...nextauth].ts
```

Exemplo prático
```bash
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],
  secret: process.env.NEXTAUTH_SECRET
})
```

### Firebase (exemplo config)

```bash
import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
}

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
```




