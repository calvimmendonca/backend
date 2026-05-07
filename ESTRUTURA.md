# Estrutura do Projeto

## 📁 Organização

```
src/
├── common/                         # Recursos compartilhados
│   ├── decorators/                 # Decorators customizados
│   ├── filters/                    # Filtros de exceção
│   │   └── http-exception.filter.ts
│   ├── guards/                     # Guards de autenticação/autorização
│   ├── interceptors/               # Interceptors
│   │   └── response.interceptor.ts
│   └── pipes/                      # Pipes de validação
│
├── config/                         # Configurações
│   └── app.config.ts               # Configuração centralizada
│
├── prisma/                         # Módulo de banco de dados
│   ├── prisma.module.ts
│   └── prisma.service.ts
│
├── modules/                        # Módulos de domínio
│   ├── adm/                        # Domínio administrativo (tb_adm_*)
│   │   ├── cargo/
│   │   │   ├── dto/
│   │   │   ├── cargo.controller.ts
│   │   │   ├── cargo.service.ts
│   │   │   └── cargo.module.ts
│   │   └── adm.module.ts
│   │
│   ├── com/                        # Domínio comercial (tb_com_*)
│   │   └── com.module.ts
│   │
│   ├── fin/                        # Domínio financeiro (tb_fin_*)
│   │   └── fin.module.ts
│   │
│   └── auth/                       # Autenticação
│       ├── dto/
│       ├── auth.controller.ts
│       ├── auth.service.ts
│       └── auth.module.ts
│
├── app.module.ts
└── main.ts
```

## 🎯 Princípios

### 1. Organização por Domínio
- Cada pasta em `modules/` representa um domínio de negócio
- Reflete a estrutura das tabelas do banco (`tb_adm_`, `tb_com_`, `tb_fin_`)
- Facilita localização e manutenção

### 2. Módulos Agregadores
- `adm.module.ts`, `com.module.ts`, `fin.module.ts`
- O `app.module.ts` importa apenas os domínios, não cada módulo individualmente
- Reduz acoplamento e melhora organização

### 3. Common
- Recursos compartilhados entre todos os módulos
- Evita duplicação de código
- Facilita manutenção de recursos globais

### 4. Config
- Configurações centralizadas
- Facilita mudanças de ambiente
- Separação de código de negócio e configuração

## 🚀 Endpoints Disponíveis

### Auth
- `POST /api/auth/login` - Login de usuário

### Cargos
- `GET /api/cargos` - Listar todos
- `GET /api/cargos/:id` - Buscar por ID
- `POST /api/cargos` - Criar
- `PATCH /api/cargos/:id` - Atualizar
- `DELETE /api/cargos/:id` - Remover

## 🔧 Recursos Globais

### HttpExceptionFilter
Padroniza respostas de erro:
```json
{
  "statusCode": 404,
  "timestamp": "2024-01-01T00:00:00.000Z",
  "path": "/api/cargos/999",
  "message": "Cargo #999 não encontrado"
}
```

### ResponseInterceptor
Padroniza respostas de sucesso:
```json
{
  "success": true,
  "data": { ... },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 📝 Próximos Passos

1. Adicionar validação com `class-validator` nos DTOs
2. Implementar Guards JWT para proteger rotas
3. Criar módulos para outros domínios (usuário, empresa, cliente, produto, etc.)
4. Adicionar documentação Swagger
5. Implementar testes unitários e e2e
