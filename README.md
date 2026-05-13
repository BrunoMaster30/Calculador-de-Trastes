# Calculador de Trastes

API REST para calcular o dimensionamento de posições de trastes de um violão.

## 👥 Componentes do Grupo

- Bruno Ferreira Nishiya        RA: 23.01020-7
- Felipe Kolanian Pasquini      RA: 23.00118-6
- Thomas Scheneider Mourão      RA: 23.01209-9
- Arthur Silva Correia          RA: 23.00877-6
- Luca Lopes Martinho           RA: 23.00064-3

## 1. Descrição Geral

Desenvolvimento de uma API REST com o emprego da Linguagem **Clojure** para calcular e retornar a posição dos trastes em instrumentos de cordas com afinação temperada (baseada em trastes).

O projeto tem como objetivo estratégico implementar um calculador de trastes, visando oferecer uma ferramenta prática e educativa para a construção de instrumentos musicais. A aplicação evidencia os fundamentos matemáticos da construção de instrumentos de precisão, atuando como um recurso funcional e didático.

## 2. Arquitetura do Sistema

O sistema é composto por duas camadas principais:

- **Frontend**: Aplicação React com TypeScript e Vite, com interface simples e intuitiva
- **Backend API**: API REST em Clojure responsável pelos cálculos dos trastes do instrumento musical, retornando os resultados em formato JSON

## 3. Fluxo

```
Frontend (React) → POST /calculate → Backend (Clojure) → Cálculo de Trastes → JSON Response
```

O aplicativo envia os dados (escala e número de trastes) para a API, que processa o cálculo utilizando a fórmula da escala temperada e retorna as informações de espaçamento dos trastes.

## 4. Funcionalidades Principais

✅ Cálculo de posição de trastes baseado em escala temperada
✅ Interface web intuitiva e profissional
✅ Visualização gráfica do braço do violão
✅ Cálculo de espaçamento entre trastes
✅ Suporte a diferentes escalas e quantidades de trastes
✅ API RESTful com suporte a JSON
✅ CORS habilitado para comunicação entre domínios

## 5. Tecnologias Utilizadas

### Frontend
- **React 19** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool e dev server
- **CSS 3** - Estilização responsiva

### Backend
- **Clojure** - Linguagem funcional
- **Reitit** - Router HTTP
- **Ring** - Middleware HTTP
- **Jetty** - Servidor HTTP
- **Muuntaja** - Serialização JSON
- **ring-cors** - Middleware CORS

## 6. Infraestrutura

- **Desenvolvimento**: localhost (Frontend: 5173, Backend: 3000)
- **Deploy**: Preparado para AWS ou Docker
- **Versionamento**: Git/GitHub

## 7. Instalação e Execução

### Requisitos
- **Node.js** 18+
- **Java** 21+ (para Clojure)
- **Clojure CLI** ou **Leiningen**

### Passos

**1. Clonar o repositório**
```bash
git clone <repositorio>
cd Calculador-de-Trastes/calctrast
```

**2. Instalar dependências do Frontend**
```bash
npm install
```

**3. Iniciar o Backend Clojure**
```bash
clj -M -m core
```
O servidor iniciará em `http://localhost:3000`

**4. Iniciar o Frontend em outro terminal**
```bash
npm run dev
```
Acesse em `http://localhost:5173`

## 8. Endpoints da API

### GET / 
Status da API
```
GET http://localhost:3000/
Response: {"status": "API rodando"}
```

### GET /calculate
Calcular posições via query parameters
```
GET http://localhost:3000/calculate?scale=650&frets=24
Response: {"positions": [24.53, 48.66, 72.23, ...]}
```

### POST /calculate
Calcular posições via JSON (recomendado)
```
POST http://localhost:3000/calculate
Content-Type: application/json

{
  "scale": 650,
  "frets": 24
}

Response: {"positions": [24.53, 48.66, 72.23, ...]}
```

## 9. Equipe e Autoria

- **Desenvolvedor**: Grupo de Engenharia de Software
- **Ano**: 2026
- **Instituição**: [Instituição de Ensino]
- **Contato**: arthur.correia@estudante.com.br

## 10. Futuras Melhorias

- [ ] Suporte a diferentes tipos de instrumentos (violão clássico, elétrico, 7 cordas, etc.)
- [ ] Exportação de dados em PDF/CSV
- [ ] Armazenamento de histórico de cálculos
- [ ] Autenticação e perfil de usuário
- [ ] Testes unitários e integração
- [ ] Documentação OpenAPI/Swagger
- [ ] Deploy em produção (AWS/Docker)
- [ ] Otimização de performance
- [ ] Interface mobile nativa
- [ ] Cálculo de outras escalas musicais (pentatônica, harmônica, etc.)

## 11. Referências

- [Escala Temperada - Wikipedia](https://pt.wikipedia.org/wiki/Escala_temperada)
- [Clojure Official Docs](https://clojure.org/)
- [Ring - Clojure Web Framework](https://github.com/ring-clojure/ring)
- [React Documentation](https://react.dev)
- [Vite Documentation](https://vite.dev)

## 📄 Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo [LICENSE](./LICENSE) para detalhes.

## 📝 Notas

- A API utiliza a fórmula de escala temperada: `posição = escala / (2^(n/12) - 1)`
- Todos os valores são em milímetros
- O servidor CORS está configurado para aceitar requisições de qualquer origem
- Para uso em produção, configurar CORS adequadamente

---

**Desenvolvido com ❤️ para Lutheria**

