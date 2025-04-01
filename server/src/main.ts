import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Activation du CORS pour le mode développement
  // Cela permet à l'application Angular de faire des requêtes vers le serveur NestJS
  // sans être bloquée par la politique de même origine (CORS)
  // En production, il est recommandé de restreindre l'origine à celle de votre application
  // pour des raisons de sécurité.
  // Par exemple, pour une application Angular déployée sur https://example.com,
  // vous pouvez remplacer 'http://localhost:4200' par 'https://example.com'.
  // Si vous utilisez un proxy inverse comme Nginx, vous pouvez également configurer CORS là-bas.
  // Pour plus d'informations sur CORS, consultez la documentation de NestJS :
  // https://docs.nestjs.com/security/cors
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#simple_requests
  // https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#preflighted_requests
  app.enableCors({
    origin: 'http://localhost:4200', // URL de la webapp Angular
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Ajouter un préfixe global pour toutes les routes
  app.setGlobalPrefix('api');

  // Configuration de Swagger
  const config = new DocumentBuilder()
    .setTitle('API Temp Irrigation')
    .setDescription('Documentation de l\'API pour le projet Temp Irrigation')
    .setVersion('1.0')
    .addTag('mesures') // Ajout d'un tag pour les mesures
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Swagger sera accessible sur /api

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();

