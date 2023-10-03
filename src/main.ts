import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { abortOnError: false });
  // app.setGlobalPrefix('api');
  app.use(
    session({
      secret: 'keyboard',
      resave: false,
      saveUninitialized: true,
      cookie: {
        maxAge: 180000 // Set the session expiration time in milliseconds (1 hour in this example)
      }
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.enableCors({
    origin: process.env.PUBLIC_ORIGIN,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true
  });
  const config = new DocumentBuilder()
    .setTitle('HCG')
    .setDescription('The HCG API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  await app.listen(8080);
}
bootstrap();
