# AutomaZap Backend

Backend simples em Node.js para o painel AutomaZap.

## Rotas principais

- `GET /health` - teste rápido
- `POST /webhook` - webhook do WhatsApp Cloud API
- `GET /api/rules` - listar regras
- `POST /api/rules` - criar regra
- `PUT /api/rules/:id` - atualizar regra
- `DELETE /api/rules/:id` - remover regra
- `GET /api/contacts` - listar contatos

Uso inicial sem banco de dados real, salvando em arquivos JSON.
