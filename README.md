# Telão Igreja - Sistema de Apresentações

Sistema web gratuito para controle de projetor em igrejas. Exiba imagens, vídeos, textos, versículos bíblicos e hinos com facilidade.

## Como Usar no GitHub Pages

### 1. Faça um Fork ou Clone

```bash
git clone https://github.com/seu-usuario/telao-igreja.git
cd telao-igreja
```

### 2. Configure o Firebase

1. Acesse o [Firebase Console](https://console.firebase.google.com/)
2. Crie um novo projeto ou use um existente
3. Ative a **Authentication** com Email/Senha e Login Anônimo
4. Ative o **Firestore Database**
5. Copie as credenciais do Firebase e substitua no arquivo `index.html`:

```javascript
const firebaseConfig = {
  apiKey: "SUA_API_KEY",
  authDomain: "SEU_PROJETO.firebaseapp.com",
  projectId: "SEU_PROJETO",
  storageBucket: "SEU_PROJETO.firebasestorage.app",
  appId: "SEU_APP_ID"
};
```

### 3. Configure as Regras do Firestore

No Firebase Console, vá em Firestore > Regras e configure:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### 4. Ative o GitHub Pages

1. Acesse as **Settings** do seu repositório
2. Vá em **Pages** no menu lateral
3. Em **Source**, selecione **Deploy from a branch**
4. Escolha a branch **main** e a pasta **/ (root)**
5. Clique em **Save**

### 5. Acesse seu Site

Após alguns minutos, seu site estará disponível em:
```
https://seu-usuario.github.io/telao-igreja/
```

## Funcionalidades

- Login com Firebase Authentication (Email/Senha)
- Cadastro de novos usuários
- Recuperação de senha por email
- Acesso como visitante (anônimo)
- Interface moderna e responsiva
- Funciona 100% no navegador (sem backend)
- Dados salvos no Firebase Firestore

## Estrutura de Arquivos

```
/
├── index.html      # Página principal com login
├── style.css       # Estilos da aplicação
├── script.js       # Scripts adicionais (opcional)
├── 404.html        # Página de erro e redirect SPA
├── README.md       # Este arquivo
└── images/         # Pasta de imagens
    └── favicon.png
```

## Personalização

### Alterar Cores
Edite as variáveis CSS no arquivo `style.css`:

```css
:root {
  --primary: #8b5cf6;      /* Cor principal (roxo) */
  --primary-dark: #7c3aed; /* Cor principal escura */
  --background: #0f172a;   /* Cor de fundo */
  --foreground: #f8fafc;   /* Cor do texto */
}
```

## Segurança

- Nunca compartilhe suas credenciais do Firebase
- Configure as regras do Firestore corretamente
- Ative apenas os métodos de autenticação necessários

## Suporte

Para dúvidas ou problemas, abra uma **Issue** no GitHub.

## Licença

Este projeto é gratuito para uso em igrejas e ministérios.

---

Desenvolvido com amor para a comunidade cristã.
