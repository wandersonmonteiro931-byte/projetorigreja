# Telão Igreja - Sistema de Apresentações

Sistema web gratuito para controle de projetor em igrejas. Exiba imagens, vídeos, textos, versículos bíblicos e hinos com facilidade.

## Como Usar no GitHub Pages

### 1. Faça um Fork ou Clone

```bash
git clone https://github.com/seu-usuario/telao-igreja.git
cd telao-igreja
```

### 2. Ative o GitHub Pages

1. Acesse as **Settings** do seu repositório
2. Vá em **Pages** no menu lateral
3. Em **Source**, selecione **Deploy from a branch**
4. Escolha a branch **main** e a pasta **/ (root)**
5. Clique em **Save**

### 3. Acesse seu Site

Após alguns minutos, seu site estará disponível em:
```
https://seu-usuario.github.io/telao-igreja/
```

## Credenciais de Acesso

### Administrador
- **Email:** admin@igreja.com
- **Senha:** admin123

### Usuário
- **Email:** usuario@igreja.com  
- **Senha:** user123

### Visitante
- Clique em "Entrar como Visitante" para acessar sem conta

## Recursos

- Login com autenticação local (localStorage)
- Suporte a imagens e vídeos
- Interface moderna e responsiva
- Funciona 100% offline após carregar
- Não requer servidor ou banco de dados

## Estrutura de Arquivos

```
/
├── index.html      # Página principal com login
├── 404.html        # Página de erro e redirect SPA
├── README.md       # Este arquivo
└── images/         # Pasta de imagens
    └── favicon.png
```

## Personalização

### Alterar Cores
Edite as variáveis CSS no início do arquivo `index.html`:

```css
:root {
  --primary: #3b82f6;      /* Cor principal */
  --background: #0f172a;   /* Cor de fundo */
  --foreground: #f8fafc;   /* Cor do texto */
}
```

### Adicionar Usuários
Adicione novos usuários no array `DEFAULT_USERS` em `index.html`:

```javascript
const DEFAULT_USERS = [
  { email: 'admin@igreja.com', username: 'admin', password: 'admin123', role: 'admin' },
  { email: 'novo@igreja.com', username: 'novo', password: 'senha123', role: 'user' }
];
```

## Suporte

Para dúvidas ou problemas, abra uma **Issue** no GitHub.

## Licença

Este projeto é gratuito para uso em igrejas e ministérios.

---

Desenvolvido com amor para a comunidade cristã.
