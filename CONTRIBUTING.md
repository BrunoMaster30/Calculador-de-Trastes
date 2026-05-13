# Guia de Contribuição

Obrigado por se interessar em contribuir para o Calculador de Trastes! 🎸

## Como Contribuir

### Reportar Bugs

Se você encontrou um bug, por favor crie uma issue descrevendo:
- O que aconteceu
- O que deveria ter acontecido
- Passos para reproduzir o problema
- Sua configuração (SO, versão Node, Java, etc.)

### Sugerir Melhorias

Sugestões de novas features são bem-vindas! Crie uma issue explicando:
- O que você gostaria de adicionar
- Por que isso seria útil
- Como você imagina a implementação

### Enviar Pull Requests

1. Faça um fork do repositório
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

### Padrões de Código

#### Frontend (React/TypeScript)
- Siga o ESLint configuration
- Use TypeScript para tipagem
- Componentes funcionais com hooks
- Nomes descritivos em português ou inglês (consistente)

#### Backend (Clojure)
- Siga as convenções Clojure (kebab-case)
- Documente funções públicas
- Evite side effects quando possível
- Use specs para validação

### Testes

Antes de submeter um PR:
```bash
# Frontend
npm run lint

# Backend
clj -M:test
```

## Código de Conduta

Todos devem ser respeitosos e colaborativos. Discriminação de qualquer tipo não será tolerada.

## Perguntas?

Crie uma issue com o tag `question` ou entre em contato diretamente.

---

**Obrigado por contribuir!** 🙏
