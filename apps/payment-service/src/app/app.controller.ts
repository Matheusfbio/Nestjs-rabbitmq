import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import {
  MessagePattern,
  Payload,
  type ClientProxy,
} from '@nestjs/microservices';
import { NOTIFICATION_CLIENT } from '../constant';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(NOTIFICATION_CLIENT)
    private readonly notification_client: ClientProxy,
  ) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @MessagePattern('process_payment')
  handleProcessPayment(@Payload() order: unknown) {
    console.log('[Payment-service: Processing payment for order:', order);
    this.notification_client.emit('payment_processed', order);
  }
}
