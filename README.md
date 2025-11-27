# Telão Igreja - Sistema de Apresentações para Igreja

Sistema completo e **100% GRATUITO** de apresentações para igrejas com controle de projetor via HDMI, suporte a imagens, vídeos, áudio e textos.

![GitHub](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-ativo-brightgreen.svg)
![Gratuito](https://img.shields.io/badge/pre%C3%A7o-gratuito-success.svg)

---

## Acesso Rápido

### Usar Online (Sem Instalação)
Acesse diretamente: **https://seu-usuario.github.io/telao-igreja/**

---

## Estrutura de Arquivos para GitHub Pages

Para funcionar corretamente no GitHub Pages, você precisa destes arquivos:

```
📁 telao-igreja/
├── 📄 index.html          ← Página principal (OBRIGATÓRIO)
├── 📄 404.html             ← Redirecionamento SPA (OBRIGATÓRIO)
├── 📄 script.js            ← Código JavaScript compilado (OBRIGATÓRIO)
├── 📄 style.css            ← Estilos CSS compilados (OBRIGATÓRIO)
├── 📄 favicon.png          ← Ícone do site
├── 📄 README.md            ← Este arquivo
├── 📄 LICENSE              ← Licença MIT
└── 📁 imagens/             ← Logos e imagens do sistema
    ├── favicon.png
    └── *.png
```

---

## Deploy no GitHub Pages

### Passo 1: Preparar o Repositório

Certifique-se de que todos os arquivos estão na raiz:
- `index.html`
- `404.html`
- `script.js`
- `style.css`
- `favicon.png`
- Pasta `imagens/`

### Passo 2: Fazer Upload

```bash
git add .
git commit -m "Deploy GitHub Pages"
git push origin main
```

### Passo 3: Configurar GitHub Pages

1. Vá em **Settings** → **Pages**
2. Em **Source**, selecione: **Deploy from a branch**
3. Em **Branch**, selecione: `main` e pasta `/ (root)`
4. Clique em **Save**
5. Aguarde 2-5 minutos
6. Acesse seu site!

---

## Funcionalidades

- Upload de imagens, vídeos e áudios
- Playlist reordenável (drag-and-drop)
- Controle de projetor via HDMI
- Overlays de texto personalizáveis
- Transições suaves
- 100% offline após carregar
- Dados salvos localmente

## Atalhos de Teclado

| Tecla | Ação |
|-------|------|
| **Ctrl+Shift+T** | Alternar Telão |
| **F9** | Pausar/Retomar |
| **→** | Próximo Item |
| **←** | Item Anterior |

---

## Licença

MIT License - Uso livre para igrejas e instituições.

---

**Desenvolvido para servir à igreja com excelência**
