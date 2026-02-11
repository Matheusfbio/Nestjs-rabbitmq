import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import {
  MessagePattern,
  Payload,
  type ClientProxy,
} from '@nestjs/microservices';
import { NOTIFICATION_CLIENT, PAYMENT_CLIENT } from '../constants';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(PAYMENT_CLIENT) private readonly paymentRMQClient: ClientProxy,
    @Inject(NOTIFICATION_CLIENT)
    private readonly notificationRMQClient: ClientProxy,
  ) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @MessagePattern('order_created')
  handleOrderCreated(@Payload() order: unknown) {
    console.log('[Order-service: Received new order:', order);

    this.paymentRMQClient.emit('process_payment', order);
    this.notificationRMQClient.emit('send_notification', {
      type: 'order_confirmation',
      order,
    });
  }
}
