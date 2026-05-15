# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development
npm run start:dev       # watch mode with hot reload
npm run start:debug     # watch mode with debugger

# Build & Production
npm run build           # compile to dist/
npm run start:prod      # run compiled output

# Tests
npm run test            # unit tests (Jest, files matching *.spec.ts under src/)
npm run test:watch      # unit tests in watch mode
npm run test:cov        # coverage report
npm run test:e2e        # E2E tests (test/jest-e2e.json)
npm run test -- --testPathPattern=src/modules/adm/cargo  # run a single test file/folder

# Code quality
npm run lint            # ESLint with auto-fix
npm run format          # Prettier

# Prisma
npx prisma generate     # regenerate client after schema changes
npx prisma migrate dev  # create and apply a migration
npx prisma studio       # visual DB browser
```

## Environment Variables

Required in `.env`:

| Variable        | Default                   | Purpose                        |
|-----------------|---------------------------|--------------------------------|
| `DATABASE_URL`  | —                         | PostgreSQL connection string   |
| `PORT`          | `3017`                    | HTTP port                      |
| `CORS_ORIGIN`   | `http://localhost:3000`   | Allowed CORS origin            |
| `JWT_SECRET`    | `secret`                  | JWT signing secret             |
| `JWT_EXPIRES_IN`| `1d`                      | JWT expiry (`ms` format)       |

## Architecture

NestJS 11 + TypeScript backend with PostgreSQL via Prisma 6. The API is served under the `/api` global prefix on port 3017.

### Module tree

```
AppModule
├── ConfigModule (global)
├── PrismaModule (global — single PrismaService instance)
├── AuthModule          → POST /api/auth/login
├── AdmModule           → /api/adm/...
│   ├── CargoModule          cargos
│   ├── EmpresaModule        empresas + status
│   ├── AtividadeModule      atividades
│   ├── GrupoUsuarioModule   grupos de usuário
│   ├── UsuarioModule        usuários + vínculos empresa/grupo
│   ├── MenuModule           menus
│   └── GrupoMenuModule      grupos de menu
├── ComModule           → /api/com/...
│   ├── CidadeModule         cidades
│   ├── AgendaModule         agenda
│   └── ClienteModule        clientes + contatos (sub-resource)
└── FinModule           → /api/fin/... (financial, WIP)
```

### Common layer (`src/common/`)

- **`guards/jwt-auth.guard.ts`** — Custom `JwtAuthGuard` (does not use Passport strategy). Apply per-controller or per-route with `@UseGuards(JwtAuthGuard)`. Reads `Authorization: Bearer <token>`, verifies it, and attaches the payload to `req.user`.
- **`interceptors/response.interceptor.ts`** — Global interceptor wrapping every success response as `{ success: true, data: ..., timestamp: "..." }`.
- **`filters/http-exception.filter.ts`** — Global catch-all filter formatting errors as `{ statusCode, timestamp, path, message }`.
- **`utils/serialize.util.ts`** — Called by both the interceptor and filter to safely convert Prisma types (BigInt → string, Decimal → string, Date → ISO string, Buffer → base64) before JSON serialization. Always pipe Prisma results through this when bypassing the interceptor.

### Database conventions

All table and column names follow a Hungarian-like prefix notation inherited from the legacy schema:

| Prefix | Type              |
|--------|-------------------|
| `vch_` | varchar           |
| `chr_` | char              |
| `int_` | integer           |
| `dat_` | date/timestamp    |
| `dec_` | decimal           |
| `bin_` | bigint            |
| `tin_` | smallint/tinyint  |

Table names: `tb_adm_*`, `tb_com_*`, `tb_fin_*`, `tb_web_*`, `sys*` (system/dictionary tables).

### Auth flow

`POST /api/auth/login` with `{ login, senha }` returns `{ access_token }`. The JWT payload contains `{ sub, login, name, email }`. Passwords are stored as plain trimmed strings — no bcrypt in current auth path despite bcryptjs being a dependency.

### Adding a new resource

Follow the pattern already used across modules: create a folder under the relevant domain module (`adm/`, `com/`, `fin/`), add `*.module.ts`, `*.controller.ts`, `*.service.ts`, and `dto/create-*.dto.ts` / `dto/update-*.dto.ts`. Use `PartialType` from `@nestjs/mapped-types` for the update DTO. Import the new module in the parent domain module (`adm.module.ts`, etc.).
