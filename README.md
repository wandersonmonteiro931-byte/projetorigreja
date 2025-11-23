# Telão Igreja - Sistema de Apresentações para Igreja

Sistema completo de apresentações para igrejas com controle de projetor via HDMI, suporte a imagens, vídeos, áudio e textos.

![GitHub](https://img.shields.io/badge/license-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)
![React](https://img.shields.io/badge/react-18.3.1-blue.svg)

## 📦 Instalação e Deploy

### Clonar o Repositório
```bash
git clone https://github.com/seu-usuario/telao-igreja.git
cd telao-igreja
npm install
```

### Rodar Localmente
```bash
npm run dev
```
Acesse: `http://localhost:5000`

### Build para Produção
```bash
npm run build
npm start
```

### Deploy no GitHub Pages
1. Edite `vite.config.ts` e adicione `base: '/telao-igreja/'`
2. Execute:
```bash
npm run build
```
3. Faça push da pasta `dist` para o branch `gh-pages`

### Deploy na Vercel/Netlify
1. Conecte seu repositório GitHub à Vercel ou Netlify
2. Configure:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist/public`
   - **Install Command**: `npm install`
3. Faça deploy automático!

### Deploy no Replit
1. Importe o repositório GitHub no Replit
2. Clique em "Run" - tudo já está configurado!

## 🎯 Funcionalidades Principais

### Interface de Controle
- ✅ Área de visualização (preview) e modo Telão (full-screen) separado
- ✅ Botão para "Abrir Telão em Nova Janela" para projetor secundário
- ✅ Controle completo de reprodução (play, pause, anterior, próximo)

### Mídia e Playlist
- ✅ Upload por arrastar-e-soltar (drag-and-drop)
- ✅ Suporte a múltiplos formatos:
  - **Imagens**: JPG, PNG, GIF, WebP
  - **Vídeos**: MP4, WebM, MOV
  - **Áudio**: MP3, M4A, WAV, OGG
- ✅ Playlist reordenável por drag-and-drop
- ✅ Miniaturas (thumbnails) para cada item
- ✅ Salvar playlists localmente (IndexedDB)
- ✅ Exportar/Importar playlist (.json)

### Controles de Teclado
- **Ctrl+Shift+T**: Alternar Exibir/Ocultar Telão
- **F9**: Pausar/Retomar reprodução
- **Seta Direita →**: Avançar para o próximo item
- **Seta Esquerda ←**: Retroceder para o item anterior
- ⚡ Atalhos funcionam tanto na janela principal quanto no telão

### Reprodução Automática
- ✅ Auto-advance com intervalo configurável (segundos)
- ✅ Repetir ao finalizar (loop playlist)
- ✅ Pausar ao final da playlist
- ✅ Respeita duração de vídeos automaticamente

### Ajuste de Imagem para Projetor
- ✅ Modos de ajuste:
  - **Conter (contain)**: Mantém proporção, cabe inteiro
  - **Cobrir (cover)**: Preenche tela, corta excessos
  - **Esticar (stretch)**: Estica para preencher
  - **Recortar (crop)**: Recorta e centraliza
- ✅ Controle fino: zoom, posição X/Y (pan)
- ✅ Botão "Redefinir" para voltar ao padrão

### Textos e Overlays
- ✅ Adicionar camadas de texto sobre imagem/vídeo:
  - Título
  - Subtítulo
  - Conteúdo (versículos, orações, etc.)
- ✅ Editor de tema completo:
  - Escolha de fontes (Inter, Poppins, Montserrat, etc.)
  - Tamanho, peso, alinhamento
  - Cor do texto e fundo
  - Sombra de texto (CSS)
- ✅ Salvar e carregar templates de tema
- ✅ Posicionamento livre (X/Y) do overlay

### Áudio e Volume
- ✅ Player de áudio em segundo plano
- ✅ Controle de volume master (slider)
- ✅ Mute global com indicador visual
- ✅ Volume sincronizado entre preview e projetor

### Tela Escura e Silenciar
- ✅ Botão "Tela Escura" - tela totalmente preta
- ✅ Útil para momentos de silêncio ou oração
- ✅ Indicação visual quando ativo

### Transições
- ✅ Tipos de transição:
  - Nenhuma (corte seco)
  - Fade
  - Deslizar (Slide)
  - Zoom
  - Crossfade
- ✅ Duração configurável (100-3000ms)

## 🚀 Como Rodar no Replit

### Passo 1: Iniciar o Projeto
1. O servidor já está configurado para rodar automaticamente
2. Clique no botão "Run" no topo do Replit
3. Aguarde o servidor iniciar (geralmente leva 10-20 segundos)
4. O app estará disponível na URL do Replit

### Passo 2: Abrir no Navegador
1. **Recomendado**: Use Google Chrome ou Microsoft Edge
2. Clique no botão "Open in new tab" no Replit
3. Se solicitado, permita autoplay de áudio/vídeo

## 🖥️ Como Conectar ao Projetor (HDMI)

### Passo 1: Conectar o Cabo HDMI
1. Conecte o cabo HDMI do computador ao projetor
2. O sistema operacional deve detectar automaticamente o segundo monitor
3. Verifique se o projetor está configurado como "Estender tela" (não duplicar)

### Passo 2: Abrir a Janela do Telão
1. No app, clique no botão **"Abrir Telão em Nova Janela"**
2. Uma nova janela será aberta
3. Arraste essa janela para o monitor do projetor (segundo monitor)

### Passo 3: Entrar em Fullscreen
1. Na janela do telão, clique no botão de fullscreen (canto superior direito)
2. Ou pressione **F11** no navegador para entrar em fullscreen
3. O telão agora está em tela cheia no projetor!

### Passo 4: Controlar a Apresentação
1. Use a janela principal para controlar o que aparece no projetor
2. Pressione **Ctrl+Shift+T** para mostrar/ocultar o conteúdo no telão
3. Use os controles ou atalhos de teclado para navegar

## 📝 Fluxo de Trabalho Típico

### Preparação (antes do culto)
1. **Adicionar Mídia**: Arraste imagens, vídeos e áudios para o app
2. **Organizar Playlist**: Reorganize os itens na ordem desejada
3. **Configurar Tema**: Ajuste fonte, tamanho e cores do texto
4. **Testar Projetor**: Conecte HDMI e teste a exibição
5. **Exportar Backup**: Salve a playlist como JSON

### Durante o Culto
1. **Abrir Telão**: Clique em "Abrir Telão em Nova Janela"
2. **Mover para Projetor**: Arraste a janela para o monitor do projetor
3. **Fullscreen**: Clique no botão de fullscreen na janela do telão
4. **Controlar**:
   - **Ctrl+Shift+T**: Mostrar/ocultar telão
   - **Setas**: Navegar entre itens
   - **F9**: Pausar/retomar
5. **Adicionar Textos**: Use overlay de texto para versículos
6. **Tela Escura**: Use durante orações ou momentos de silêncio

## 📤 Exportar e Importar

### Exportar Playlist
1. Clique no botão **"Exportar"** no topo da página
2. Um arquivo JSON será baixado com:
   - Itens da playlist
   - Temas salvos
   - Data de exportação
3. Guarde este arquivo como backup

## ⌨️ Referência Completa de Atalhos

| Tecla | Ação |
|-------|------|
| **Ctrl+Shift+T** | Alternar Exibir/Ocultar Telão |
| **F9** | Pausar/Retomar Reprodução |
| **→** | Próximo Item |
| **←** | Item Anterior |

## 🎨 Dicas de Design

### Para Melhor Legibilidade no Projetor
- Use fontes grandes (48px ou mais)
- Prefira cores claras em fundo escuro (ou vice-versa)
- Adicione sombra de texto para destacar sobre imagens
- Exemplo de sombra: `2px 2px 8px rgba(0,0,0,0.9)`

### Para Imagens
- Use modo "Cobrir" para preencher a tela
- Use modo "Conter" para manter proporção original
- Ajuste zoom e posição para centralizar elementos importantes

### Para Vídeos
- Teste o volume antes do culto
- Configure intervalo de auto-play adequado para transições
- Use transição "Fade" para mudanças suaves

## 🔧 Solução de Problemas

### O projetor não está mostrando nada
- Verifique se o cabo HDMI está conectado
- Confirme que o sistema detectou o segundo monitor
- Pressione Ctrl+Shift+T para garantir que o telão está visível
- Verifique se "Tela Escura" não está ativada

### Áudio não está tocando
- Verifique se o volume não está em 0
- Confirme que o mute não está ativado (ícone de volume)
- Permita autoplay quando o navegador solicitar

### Vídeo não carrega
- Certifique-se de usar formato compatível (MP4, WebM)
- Tente um arquivo menor se o vídeo for muito grande
- Recarregue a página e tente novamente

### Atalhos de teclado não funcionam
- Certifique-se de que a janela do app está em foco
- Clique na janela antes de usar os atalhos
- Alguns atalhos podem estar bloqueados pelo navegador

## 📱 Navegadores Recomendados

- ✅ **Google Chrome** (Recomendado)
- ✅ **Microsoft Edge** (Recomendado)
- ⚠️ **Firefox** (Funciona, mas pode bloquear autoplay)
- ⚠️ **Safari** (Compatibilidade limitada)

## 💾 Armazenamento Local

Todos os dados são salvos **automaticamente e permanentemente** no navegador usando IndexedDB:
- ✅ **Galeria de mídia** (imagens, vídeos, áudios) - salva para sempre
- ✅ **Playlists completas** - permanecem mesmo fechando o navegador
- ✅ **Temas personalizados** - salvos automaticamente
- ✅ **Configurações do app** (volume, zoom, etc.) - salvos em tempo real
- ✅ **Slides de texto** - todos salvos permanentemente

### 🔒 Segurança dos Dados
- ✅ **Nada é apagado automaticamente** - mesmo ao fechar/recarregar o navegador
- ✅ **Dados ficam no computador** - cada máquina tem seus próprios dados
- ✅ **Sem necessidade de servidor** - funciona 100% offline após carregar
- ✅ **Sem banco de dados externo** - sem senhas ou configurações complexas

**Importante**: Os dados são específicos do navegador. Chrome e Firefox no mesmo computador têm dados separados. Exporte playlists regularmente como backup!

## 📋 Recursos Técnicos

- **Frontend**: React 18 + TypeScript + Vite
- **UI**: Shadcn/ui + Tailwind CSS + Framer Motion
- **Drag-and-Drop**: @dnd-kit
- **Armazenamento**: IndexedDB (idb) - 100% local e permanente
- **Upload**: react-dropzone
- **Backend**: Express.js (servidor mínimo)
- **Estado**: TanStack Query (React Query v5)
- **Formulários**: React Hook Form + Zod

## 🛠️ Requisitos do Sistema

- **Node.js**: 18.0.0 ou superior
- **Navegador**: Chrome, Edge, Firefox ou Safari
- **RAM**: Mínimo 4GB (8GB recomendado para vídeos grandes)
- **Espaço**: Varia conforme mídia armazenada

## 🌐 Compatibilidade de Navegadores

| Navegador | Suporte | Notas |
|-----------|---------|-------|
| Chrome | ✅ Completo | Recomendado |
| Edge | ✅ Completo | Recomendado |
| Firefox | ✅ Completo | Funciona perfeitamente |
| Safari | ⚠️ Parcial | Algumas limitações com autoplay |

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Fork este repositório
2. Crie uma branch para sua feature (`git checkout -b feature/MinhaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona MinhaFeature'`)
4. Push para a branch (`git push origin feature/MinhaFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🎯 Roadmap (Futuras Melhorias)

- [ ] Modo operator: controle remoto via celular (WebSocket)
- [ ] Timer/contador visível para cada slide
- [ ] Atalhos de teclado configuráveis
- [ ] Temas pré-definidos (Igreja, Culto, Louvor, Sermão)
- [ ] Sistema de logs de apresentação (exportar CSV)
- [ ] Suporte a múltiplas playlists
- [ ] Editor visual de posição de overlay (drag)

## 📞 Suporte

Para dúvidas ou problemas, consulte:
1. Este README
2. Botão de Ajuda (ícone "?" no app)
3. Documentação do Replit

---

**Desenvolvido para servir à igreja com excelência técnica e espiritual** 🙏
