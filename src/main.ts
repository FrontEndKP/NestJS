import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function start() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule, { rawBody: true });

  const config = new DocumentBuilder()
    .setTitle(
      'Проект з предмету Сучасні технології програмного забезпечення (NodeJS)',
    )
    .setDescription('Опис')
    .setVersion('1.0.0')
    .addTag('Кумар Пранаав ІА-з01')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/docs', app, document);
  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}

start();
