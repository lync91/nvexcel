import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { khoiLuongModule } from './khoiluong/khoiluong.module';

@Module({
  imports: [
    CatsModule,
    khoiLuongModule,
    GraphQLModule.forRoot({
      autoSchemaFile: 'schema.gql',
    }),
    MongooseModule.forRoot('mongodb://192.168.0.11/thietke'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
