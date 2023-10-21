import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UnauthorizedExpectionFilter } from './expectionFilter/unauthorized.expectionFilter';
import { NotFoundException } from './expectionFilter/notFound.expection';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 加入未授权报错AOP
  app.useGlobalFilters(
    new UnauthorizedExpectionFilter(),
    // new NotFoundException(),
  );
  await app.listen(3000);
}
bootstrap();
