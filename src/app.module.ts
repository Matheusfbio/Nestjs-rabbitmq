import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiGatewaModule } from './app/api-gatewa/api-gatewa.module';

@Module({
  imports: [ApiGatewaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
