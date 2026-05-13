# Guia para Desenvolvedores

Bem-vindo! Este guia ajudará você a entender a estrutura do projeto e como começar a desenvolver.

## 📂 Estrutura do Projeto

```
Calculador-de-Trastes/
├── calctrast/                    # Projeto principal
│   ├── src/
│   │   ├── App.tsx              # Componente principal React
│   │   ├── App.css              # Estilos profissionais
│   │   ├── index.css            # Estilos globais
│   │   ├── main.tsx             # Entry point React
│   │   ├── core.clj             # Entrada do servidor Clojure
│   │   ├── routes.clj           # Rotas HTTP
│   │   ├── service.clj          # Lógica de cálculo
│   │   └── assets/              # Imagens e recursos
│   ├── public/                  # Arquivos estáticos
│   ├── index.html               # HTML principal
│   ├── vite.config.ts           # Configuração Vite
│   ├── tsconfig.json            # Configuração TypeScript
│   ├── eslint.config.js         # Configuração ESLint
│   ├── package.json             # Dependências Node
│   ├── deps.edn                 # Dependências Clojure
│   └── README.md                # Instruções específicas
├── LICENSE                       # Licença MIT
├── README.md                     # Documentação principal
├── CONTRIBUTING.md              # Guia de contribuição
├── CODE_OF_CONDUCT.md          # Código de conduta
├── CHANGELOG.md                 # Histórico de versões
└── DEVELOPERS.md                # Este arquivo
```

## 🚀 Setup para Desenvolvimento

### Pré-requisitos
```bash
# Verificar versões
node --version          # Deve ser 18+
java -version           # Deve ser 21+
clj --version          # Clojure CLI
```

### Instalação Inicial
```bash
# Clonar repositório
git clone <repo>
cd Calculador-de-Trastes/calctrast

# Instalar dependências
npm install
```

### Executar Localmente

**Terminal 1 - Backend:**
```bash
cd calctrast
clj -M -m core
# Saída: Server started on port 3000
```

**Terminal 2 - Frontend:**
```bash
cd calctrast
npm run dev
# Saída: ➜ Local: http://localhost:5173/
```

## 🏗️ Arquitetura

### Frontend (React + TypeScript)

```
App.tsx
├── Header (título e descrição)
├── MainContent
│   ├── FormSection (entrada de dados)
│   │   ├── Inputs (escala, trastes)
│   │   └── Button (calcular)
│   └── ResultsSection (visualização)
│       ├── FretboardContainer
│       │   ├── SVG Visualization
│       │   └── Info Cards
│       └── Measurements (grade de medições)
└── Footer (informações)
```

### Backend (Clojure)

```
core.clj (main)
└── Inicia servidor Jetty

routes.clj (rotas)
├── GET / → Status
├── GET /calculate → Handler com query params
└── POST /calculate → Handler com JSON body

service.clj (lógica)
└── calculate(scale, frets) → [posições...]
    └── fret-position(scale, n) → posição em mm
```

## 🔧 Desenvolvimento

### Adicionar Nova Feature

1. **Backend**: Edite `service.clj` para nova lógica, depois `routes.clj` para novo endpoint
2. **Frontend**: Crie componente em `App.tsx` e estilize em `App.css`
3. **Teste**: Verifique em http://localhost:5173

### Exemplo: Adicionar Suporte a Novas Escalas

**Backend (service.clj):**
```clojure
(defn calculate-pentatonic [scale frets]
  ;; Implementar cálculo pentatônico
  )

(defn calculate [scale frets type]
  (case type
    :temperada (existing-calculate ...)
    :pentatonica (calculate-pentatonic ...)
    ))
```

**Frontend (App.tsx):**
```typescript
const [scaleType, setScaleType] = useState('temperada')
// Adicionar selector e enviar scaleType na requisição
```

## 📊 Fórmula Matemática

A posição de cada traste é calculada pela fórmula da escala temperada:

$$P_n = \frac{S}{2^{n/12} - 1}$$

Onde:
- $P_n$ = Posição do traste n (em mm)
- $S$ = Comprimento da escala (em mm)
- $n$ = Número do traste (1 a n_trastes)

## 🧪 Testes

### Frontend
```bash
npm run lint        # Verificar erros ESLint
npm run build       # Build de produção
```

### Backend (Clojure)
```bash
clj -M:test        # Executar testes (quando implementados)
```

## 📝 Padrões de Código

### TypeScript (Frontend)
- ✅ Use tipos explícitos
- ✅ Interfaces para data structures
- ✅ Componentes funcionais com hooks
- ✅ CSS modules ou estilos globais

```typescript
interface CalculateResponse {
  positions: number[]
  error?: string
}

const handleCalculate = async (data: FormData): Promise<void> => {
  // Implementação
}
```

### Clojure (Backend)
- ✅ Use kebab-case para nomes
- ✅ Documente funções públicas
- ✅ Evite mutabilidade
- ✅ Use specs para validação

```clojure
(defn fret-position 
  "Calcula a posição em mm de um traste dado a escala"
  [scale n]
  (/ scale (- (Math/pow 2 (/ n 12.0)) 1)))
```

## 🔗 Integração Frontend-Backend

**Proxy Vite** (vite.config.ts):
```typescript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      rewrite: (path) => path.replace(/^\/api/, '')
    }
  }
}
```

**Requisição Frontend**:
```typescript
const response = await fetch('/api/calculate', {
  method: 'POST',
  body: JSON.stringify({ scale: 650, frets: 24 })
})
```

## 🐛 Debugging

### Frontend
- Abrir DevTools (F12)
- Verificar Network tab para requisições
- Console para erros JavaScript

### Backend
- Logs no terminal onde `clj -M -m core` está rodando
- Testar endpoints com curl:
```bash
curl -X POST http://localhost:3000/calculate \
  -H "Content-Type: application/json" \
  -d '{"scale": 650, "frets": 24}'
```

## 📚 Recursos Úteis

- [React Docs](https://react.dev)
- [Vite Guide](https://vite.dev/guide/)
- [Clojure Official](https://clojure.org/guides/getting_started)
- [Reitit Router](https://metosin.github.io/reitit/)
- [Ring Middleware](https://github.com/ring-clojure/ring)

## 🚀 Deploy

### Produção (AWS/Docker)
```bash
# Frontend build
npm run build

# Backend JAR
clj -M:uberjar
```

Detalhes em DEPLOY.md (quando criado)

## 💬 Dúvidas?

1. Crie uma issue com tag `question`
2. Abra uma discussão no GitHub
3. Contate a equipe diretamente

---

**Happy Coding!** 🎸✨
