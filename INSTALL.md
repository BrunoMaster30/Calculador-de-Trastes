# Guia de Instalação

Siga este guia para instalar e executar o Calculador de Trastes localmente.

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

### Windows
- **Node.js 18+** - [Download](https://nodejs.org/)
- **Java 21+** - [Download OpenJDK](https://adoptium.net/)
- **Git** - [Download](https://git-scm.com/)
- **Clojure CLI** - [Instalação](https://clojure.org/guides/getting_started)

```powershell
# Verificar instalações
node --version
java -version
clj --version
git --version
```

### macOS
```bash
# Usar Homebrew (se não tiver, instale: /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)")

brew install node@18
brew install openjdk@21
brew install clojure
brew install git
```

### Linux (Ubuntu/Debian)
```bash
# Node.js
curl -sL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Java
sudo apt-get install -y openjdk-21-jdk

# Clojure
sudo apt-get install -y clojure

# Git
sudo apt-get install -y git
```

## Instalação Passo a Passo

### 1. Clonar o Repositório

```bash
# Via HTTPS
git clone https://github.com/seu-usuario/Calculador-de-Trastes.git

# Ou via SSH
git clone git@github.com:seu-usuario/Calculador-de-Trastes.git

# Entrar na pasta
cd Calculador-de-Trastes
```

### 2. Instalar Dependências do Frontend

```bash
cd calctrast

# Instalar pacotes npm
npm install

# Verificar se funcionou
npm list react
```

### 3. Verificar Ambiente Backend

```bash
# Ainda em calctrast/
# Verificar se Clojure consegue acessar as dependências
clj -M -m clojure.core/prn

# Output esperado: nil
```

## Execução

### Opção 1: Desenvolvimento (Recomendado)

**Terminal 1 - Backend Clojure:**
```bash
cd Calculador-de-Trastes/calctrast
clj -M -m core

# Output esperado:
# Picked up JAVA_TOOL_OPTIONS: ...
# 2026-05-13 10:30:00 INFO Server started on port 3000
```

**Terminal 2 - Frontend React:**
```bash
cd Calculador-de-Trastes/calctrast
npm run dev

# Output esperado:
# ➜  Local:   http://localhost:5173/
# ➜  Press h + enter to show help
```

Acesse em `http://localhost:5173` no navegador.

### Opção 2: Build de Produção

```bash
cd Calculador-de-Trastes/calctrast

# Build frontend
npm run build

# Verificar se gerou pasta 'dist'
ls -la dist/

# Para servir a build de produção (simples, requer Python ou Node):
# Python 3
python -m http.server 5173 --directory dist

# Ou com Node.js
npx serve -s dist -l 5173
```

## Verificação de Funcionamento

### 1. Backend

```bash
# Testar endpoint GET
curl http://localhost:3000/

# Output esperado: "API rodando"

# Testar cálculo via GET
curl "http://localhost:3000/calculate?scale=650&frets=24"

# Output esperado: 
# {"positions":[24.53..., 48.66..., ...]}
```

### 2. Frontend

1. Abra `http://localhost:5173` no navegador
2. Preencha:
   - Escala: 650
   - Trastes: 24
3. Clique em "Calcular Posições"
4. Verifique se o braço do violão é exibido

## Troubleshooting

### "Could not locate core__init.class"

**Problema**: Executou `clj` de dentro da pasta `src/`

**Solução**: Execute do diretório `calctrast/`:
```bash
cd calctrast
clj -M -m core
```

### "Module not found: 'react'"

**Problema**: Dependências do Node.js não instaladas

**Solução**:
```bash
cd calctrast
rm -rf node_modules package-lock.json
npm install
```

### "Port 3000 already in use"

**Problema**: Outra aplicação está usando porta 3000

**Solução** (Windows):
```powershell
# Encontrar processo usando porta 3000
netstat -ano | findstr :3000

# Matar processo (substitua PID)
taskkill /PID <PID> /F
```

**Solução** (macOS/Linux):
```bash
# Encontrar processo usando porta 3000
lsof -i :3000

# Matar processo (substitua PID)
kill -9 <PID>
```

### Clojure não reconhecido

**Solução**: Adicione Clojure ao PATH:

- **Windows**: Adicione `C:\clojure\bin` ao PATH (Variáveis de Ambiente)
- **macOS/Linux**: Clojure deve estar no PATH automaticamente após instalação

Verifique:
```bash
clj --version
```

### Servidor não conecta ao frontend

**Solução**: Verifique se CORS está ativado em `routes.clj`

```clojure
(wrap-cors :access-control-allow-origin [#".*"]
           :access-control-allow-methods [:get :put :post :delete]
           :access-control-allow-headers ["Content-Type"])
```

## Docker (Opcional)

Se preferir usar Docker:

```bash
# Usar docker-compose (quando implementado)
docker-compose up

# Acesse em http://localhost:5173
```

## Próximos Passos

1. Leia o [README](README.md) para visão geral do projeto
2. Leia [DEVELOPERS.md](DEVELOPERS.md) para entender a arquitetura
3. Leia [CONTRIBUTING.md](CONTRIBUTING.md) para contribuir
4. Configure sua IDE (VSCode, IntelliJ, etc.)

## Suporte

Se tiver problemas:

1. Verifique as versões instaladas (NodeJS 18+, Java 21+)
2. Limpe caches: `npm cache clean --force`
3. Delete `node_modules`: `rm -rf node_modules`
4. Reinstale: `npm install`
5. Crie uma [issue](https://github.com/seu-usuario/Calculador-de-Trastes/issues)

---

**Pronto para começar?** 🚀 Abra o projeto em sua IDE favorita e comece a contribuir!
