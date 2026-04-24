import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS para permitir chamadas do Next.js
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  // Prefixo global para rotas API
  app.setGlobalPrefix('api');

  await app.listen(3017);
  console.log(`   Backend rodando em: http://localhost:3017`);
}
bootstrap();
