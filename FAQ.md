# Perguntas Frequentes (FAQ)

## Geral

### O que é o Calculador de Trastes?
É uma ferramenta profissional para calcular a posição exata de trastes em instrumentos de cordas com afinação temperada. Usa a matemática da escala temperada para determinar as posições em milímetros.

### Para que serve?
- Construcción de violões e outros instrumentos de corda
- Educação em Lutheria
- Pesquisa sobre acústica de instrumentos
- Referência profissional para luthiers

### É gratuito?
Sim! O projeto é open-source sob licença MIT.

### Posso usar em produção?
Sim. O projeto é estável e pronto para uso profissional. Leia a [licença](LICENSE) para detalhes legais.

## Instalação e Execução

### Qual é o requisito mínimo?
- **Node.js**: 18 ou superior
- **Java**: 21 ou superior
- **RAM**: 2GB mínimo

### Como instalo?
Siga o [Guia de Instalação](INSTALL.md) passo a passo.

### Posso usar no Windows?
Sim! Funciona perfeitamente no Windows 10/11. Veja [INSTALL.md](INSTALL.md) para instruções Windows específicas.

### Funciona offline?
Sim, você pode rodar localmente. Não precisa de internet após instalação.

### Qual é a porta padrão?
- **Frontend**: 5173 (Vite)
- **Backend**: 3000 (Clojure/Jetty)

### Posso mudar as portas?
Sim:
- **Frontend**: Configure em `vite.config.ts`
- **Backend**: Altere em `core.clj` (`:port`)

## Uso

### Como usar a ferramenta?
1. Insira o **comprimento da escala** em mm (ex: 650)
2. Insira o **número de trastes** (ex: 24)
3. Clique em **"Calcular Posições"**
4. Visualize o braço do violão com as posições

### Qual é a escala padrão?
650mm é comum para violões clássicos. Outras escalas comuns:
- Violão clássico: 650-650mm
- Violão folk: 630-650mm
- Violão elétrico: 635-650mm
- Baixo: 760-910mm

### Posso exportar os dados?
Atualmente não. Você pode:
- Screenshot dos resultados
- Copiar os números manualmente
- (Futura feature: exportar para PDF/CSV)

### Os cálculos são precisos?
Sim! Usam a fórmula matemática exata da escala temperada:
$$P_n = \frac{S}{2^{n/12} - 1}$$

A precisão depende da sua ferramenta de medição.

## Desenvolvimento

### Como contribuir?
Leia [CONTRIBUTING.md](CONTRIBUTING.md).

### Qual tecnologia usar?
- **Frontend**: React 19 + TypeScript
- **Backend**: Clojure com Reitit
- Siga os padrões em [DEVELOPERS.md](DEVELOPERS.md)

### Posso adicionar novas features?
Sim! Crie uma [issue](https://github.com/seu-usuario/Calculador-de-Trastes/issues) ou [discussion](https://github.com/seu-usuario/Calculador-de-Trastes/discussions) primeiro.

### Como faço testes?
```bash
# Frontend
npm run lint
npm run build

# Backend
clj -M:test  # quando implementado
```

### Qual IDE recomendam?
- **Frontend**: VSCode com extensões React
- **Backend**: VSCode com Calva, ou IntelliJ com Clojure plugin

## Técnico

### O servidor está lento
Possíveis causas:
1. PC com pouco RAM
2. Antivírus bloqueando
3. Porta em uso por outro programa

Solução:
```bash
# Verificar se porta 3000 está em uso
lsof -i :3000  # macOS/Linux
netstat -ano | findstr :3000  # Windows
```

### Recebo erro CORS
O CORS deveria estar configurado. Verifique:
1. Backend está rodando em `http://localhost:3000`
2. Arquivo `routes.clj` tem `wrap-cors`
3. Limpe cache do navegador (Ctrl+Shift+Del)

### A API não retorna dados
Verifique:
1. Backend está rodando (`clj -M -m core`)
2. Não há erro no console do backend
3. Teste manualmente:
```bash
curl -X POST http://localhost:3000/calculate \
  -H "Content-Type: application/json" \
  -d '{"scale": 650, "frets": 24}'
```

### Como ativar logs de debug?
No backend (`core.clj`), adicione:
```clojure
(println "DEBUG: Requisição recebida" req)
```

No frontend, use DevTools (F12) → Console.

## Deployment

### Como faço deploy em produção?
Veja [documentação futura] ou crie uma [issue](https://github.com/seu-usuario/Calculador-de-Trastes/issues).

### Posso usar Docker?
Sim, mas CI/CD com Docker não está implementado ainda.

### Qual cloud provider recomendam?
Recomendações:
- **AWS**: EC2 + RDS
- **Heroku**: Simples, bom para projetos educacionais
- **DigitalOcean**: Barato e confiável

## Segurança

### O projeto é seguro?
Sim, implementamos boas práticas de segurança. Veja [SECURITY.md](SECURITY.md).

### Como reporto uma vulnerabilidade?
**Não reporte publicamente**. Veja instruções em [SECURITY.md](SECURITY.md).

### Os dados são coletados?
Não. Tudo é processado localmente. Sem cookies, sem tracking.

## Licença e Uso

### Posso usar em um projeto comercial?
Sim! Licença MIT permite uso comercial. Apenas credite os autores.

### Preciso creditar os autores?
Tecnicamente não é obrigatório (MIT), mas seria legal mencionar:
"Powered by Calculador de Trastes"

### Posso modificar o código?
Sim! Desde que siga a licença MIT.

### E se eu criar uma versão modificada?
Você deve:
1. Creditar os autores originais
2. Incluir a licença MIT
3. Deixar claro que é uma modificação

Mais detalhes em [LICENSE](LICENSE).

## Comunidade

### Como me conecto com outros usuários?
- [GitHub Discussions](https://github.com/seu-usuario/Calculador-de-Trastes/discussions)
- [Issues](https://github.com/seu-usuario/Calculador-de-Trastes/issues)
- Email para contato (veja [SUPPORT.md](SUPPORT.md))

### Existe um Discord/Slack?
Não atualmente. Considere criar uma [issue](https://github.com/seu-usuario/Calculador-de-Trastes/issues) sugerindo!

### Posso traduzir para outro idioma?
Sim! Crie um fork ou entre em contato com a equipe.

## Referências e Recursos

### Onde aprendo mais sobre escala temperada?
- [Wikipedia - Escala Temperada](https://pt.wikipedia.org/wiki/Escala_temperada)
- [YouTube - Music Theory](https://www.youtube.com/results?search_query=escala+temperada)

### Livros sobre Lutheria
- "The Guitar" - R. Colt Knosill
- "Lutheria" - Tim Gechtman

### Sites úteis
- [Lutheria.net](https://www.lutherianet.com)
- [Guitar Anatomy](https://www.guitaranatomybook.com)

---

## Ainda tem dúvidas?

1. **Procure em Issues**: https://github.com/seu-usuario/Calculador-de-Trastes/issues
2. **Pergunte em Discussions**: https://github.com/seu-usuario/Calculador-de-Trastes/discussions
3. **Leia a documentação**: [README](README.md), [INSTALL](INSTALL.md), [DEVELOPERS](DEVELOPERS.md)
4. **Entre em contato**: Veja [SUPPORT.md](SUPPORT.md)

---

**Última atualização**: 2026-05-13

**Tem uma pergunta que não está aqui?** [Adicione-a!](https://github.com/seu-usuario/Calculador-de-Trastes/issues)
