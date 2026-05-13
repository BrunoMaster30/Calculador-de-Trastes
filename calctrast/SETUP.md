# Setup: Conectar Clojure ao React

Seu projeto agora tem integração completa entre **backend Clojure** e **frontend React**.

## 🚀 Como Executar

### 1. Instalar dependências

```bash
# Backend (Clojure)
# As dependências estão em deps.edn - use clj/clojure

# Frontend (Node.js)
npm install
```

### 2. Iniciar o Backend Clojure (porta 3000)

```bash
clj -M -m core
```

O servidor Jetty iniciará em `http://localhost:3000`

### 3. Iniciar o Frontend React com Vite (porta 5173)

Em outro terminal:

```bash
npm run dev
```

Acesse `http://localhost:5173` no navegador

## 📋 O que foi configurado

### Backend (Clojure)

- ✅ **API REST** com Reitit (router)
- ✅ **CORS ativado** para aceitar requisições do React
- ✅ **Endpoints**:
  - `GET /` - Status da API
  - `GET /calculate?scale=650&frets=24` - Calcular via query params
  - `POST /calculate` - Calcular via JSON (recomendado)

### Frontend (React)

- ✅ **Proxy Vite** configurado para redirecionar `/api/*` para `http://localhost:3000/*`
- ✅ **Componente funcional** com estado para inputs (escala e trastes)
- ✅ **Integração HTTP** com fetch API para chamar o backend
- ✅ **Tratamento de erros** e estados de carregamento

## 🔌 Como Usar

1. Digite a escala em milímetros (ex: 650)
2. Digite o número de trastes (ex: 24)
3. Clique em "Calcular"
4. As posições dos trastes serão exibidas em mm

## 📡 Fluxo de Comunicação

```
React (localhost:5173)
    ↓ POST /api/calculate
Vite Proxy
    ↓ Redireciona para /calculate
Clojure Backend (localhost:3000)
    ↓ service.clj calcula posições
    ↓ Retorna JSON
React Component
    ↓ Exibe resultados
```

## 🛠️ Arquivos Modificados

- `vite.config.ts` - Adicionado proxy para backend
- `src/App.tsx` - Novo componente com formulário e integração API
- `src/App.css` - Estilos para formulário e resultados
- `src/routes.clj` - CORS e middleware adicionados
- `deps.edn` - Dependência ring-cors adicionada

## ⚙️ Próximas Melhorias (Opcional)

- [ ] Adicionar validação de inputs no frontend
- [ ] Armazenar histórico de cálculos
- [ ] Adicionar visualização gráfica dos trastes
- [ ] Implementar cache no frontend
- [ ] Adicionar testes unitários
