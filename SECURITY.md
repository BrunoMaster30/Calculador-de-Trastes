# Política de Segurança

## Versões Suportadas

| Versão | Suportada |
| ------- | ------ |
| 1.0.x   | ✅ |
| < 1.0   | ❌ |

## Relatando uma Vulnerabilidade

**Não** reporte vulnerabilidades publicamente em issues ou pull requests.

Se você descobrir uma vulnerabilidade de segurança, por favor:

1. **Não divulgue publicamente** - Não crie issues públicas sobre vulnerabilidades
2. **Envie um email** para a equipe principal com:
   - Descrição da vulnerabilidade
   - Passos para reproduzir (se possível)
   - Possível impacto
   - Solução sugerida (se houver)

3. **Aguarde resposta** - A equipe responderá em até 48 horas

## Medidas de Segurança

Este projeto implementa:

✅ **Input Validation** - Validação de entrada do usuário
✅ **CORS Configurado** - Apenas origens permitidas
✅ **Dependências Atualizadas** - Verificações regulares
✅ **TypeScript** - Tipagem estática no frontend
✅ **Sanitização** - Limpeza de dados de entrada

## Boas Práticas

Ao contribuir, por favor:

- ✅ Use variáveis de ambiente para dados sensíveis
- ✅ Nunca commite credentials ou tokens
- ✅ Mantenha dependências atualizadas
- ✅ Reporte bugs de segurança em privado
- ✅ Revise código antes de fazer merge

## Dependências Críticas

Monitoramos regularmente:
- `react` e pacotes correlatos
- `clojure` e bibliotecas de segurança Clojure
- `ring` para vulnerabilidades HTTP
- Todas as outras dependências

## Divulgação Responsável

Seguimos os princípios de [Divulgação Responsável](https://en.wikipedia.org/wiki/Responsible_disclosure).

---

**Obrigado por ajudar a manter este projeto seguro!** 🔒
