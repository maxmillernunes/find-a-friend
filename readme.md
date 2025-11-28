# Find a Friend API

![Status](https://img.shields.io/badge/status-ready-brightgreen) ![Node](https://img.shields.io/badge/node-%3E%3D20-brightgreen) ![Docker](https://img.shields.io/badge/docker-ready-blue) ![License](https://img.shields.io/badge/license-none-lightgrey)

API MVP para cadastro de ONGs e pets para adoção — TypeScript + Fastify + Prisma (Postgres).
Projetada para ser simples de entender, fácil de executar localmente e pronta para envio em container.

## Resumo rápido
- Linguagem: TypeScript (ESM)
- Server: Fastify
- ORM: Prisma (Postgres)
- Autenticação: JWT
- Upload: multipart (arquivos salvos em tmp/pet-images)
- Estrutura: controllers → use-cases → repositories

## Badges explicativas
- Status: pronto para desenvolvimento
- Node: versão mínima recomendada >=20
- Docker: containernização suportada
- License: não definida no repositório (recomenda-se adicionar LICENSE)

##  Quick commands

### Instalação
```bash
npm install
```

### Prisma (gerar client & migração local)
```bash
npx prisma generate
npx prisma migrate dev
```

### Desenvolvimento (hot-reload)
```bash
npm run start:dev
```

### Build e produção
```bash
npm run build
npm start
```

### Docker (build + run)
```bash
docker-compose up --build
```

### Comandos úteis para debug
```bash
# rodar um shell SQL usando container psql (exemplo)
docker exec -it <postgres_container> psql -U <user> -d <db>

# limpar e recriar banco local (cuidado: perde dados)
npx prisma migrate reset
```

### Variáveis de ambiente (mínimas)
- NODE_ENV (dev | test | production) — default: dev
- PORT — default: 3333
- HOST — default: 0.0.0.0
- URL_IMAGES — default: http://localhost:3333/images
- JWT_SECRET — obrigatório
- DATABASE_URL — obrigatório (ex: postgres://user:pass@host:5432/dbname)

### Exemplo .env mínimo
```env
PORT=3333
JWT_SECRET=troque_para_um_segredo
DATABASE_URL=postgres://user:pass@localhost:5432/findafriend
```

## Endpoints principais (resumo)

### Arquivo com as collections do Insomnia na raiz do projeto.

- Arquivo: `find_a_friend.yaml`

### Endpoints
- ORGS
  - POST /orgs — criar ONG (com endereço)
  - POST /orgs/authenticate — autenticar ONG (retorna JWT)
  - GET /orgs/nearby?latitude=&longitude=&page= — ONGs próximas
- PETS
  - POST /pets — criar pet (protegida)
  - GET /pets?city=&age=&levelEnergy=&size=&levelIndependency= — listar pets por cidade + filtros
  - GET /pets/:petId — detalhes do pet
  - POST /pets/:petId/files — upload de imagens (protegida, multipart)

### Exemplos rápidos (curl)
```bash
# autenticar ONG
curl -X POST http://localhost:3333/orgs/authenticate \
  -H "Content-Type: application/json" \
  -d '{"email":"org@mail.com","password":"minha_senha"}'

# criar pet (requere token)
curl -X POST http://localhost:3333/pets \
  -H "Authorization: Bearer <TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{ "name":"Rex", "description":"Cão amigável", "age":"ADULT", "orgAddressId":"<id_da_org_address>", "levelEnergy":3, "levelIndependency":2, "environmentType":"MEDIUM", "size":"MEDIUM" }'

# upload de imagens
curl -X POST http://localhost:3333/pets/<PET_ID>/files \
  -H "Authorization: Bearer <TOKEN>" \
  -F "files=@/caminho/para/img1.jpg" \
  -F "files=@/caminho/para/img2.png"
```

## Boas práticas e próximos passos recomendados
- Substituir storage local por S3 para produção (implementar provider)
- Adicionar testes unitários e E2E (supertest / fastify.inject)
- Definir política de senha e rotação de JWT_SECRET
- Adicionar LICENSE e templates CONTRIBUTING/ISSUE_TEMPLATE

## Arquivos-chave
- src/server.ts, src/app.ts — bootstrap e configuração do Fastify
- src/http/controllers — rotas e controllers
- src/use-case — lógica de negócio (casos de uso)
- src/repositories/prisma — persistência com Prisma
- src/config/storage.ts — configuração de armazenamento de imagens
- prisma/schema.prisma — modelo de dados

## Contribuição
- Abra issues para bugs ou melhorias
- PRs com mudanças pequenas e testáveis são bem-vindos