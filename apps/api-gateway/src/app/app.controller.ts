import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import type { ClientProxy } from '@nestjs/microservices';
import { ORDER_SERVICE_RABBITMQ } from '../constants';

@Controller()
export class AppController {
  constructor(
    @Inject(ORDER_SERVICE_RABBITMQ) private readonly client: ClientProxy,
  ) {}

  @Get()
  getData() {
    return { message: 'API Gateway is running' };
  }

  @Post('order')
  createOrder(@Body() order: unknown) {
    this.client.emit('order_created', order);
    return { status: 'Order creation event', order };
  }
}
