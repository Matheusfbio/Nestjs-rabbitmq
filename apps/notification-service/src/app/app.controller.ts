import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @MessagePattern('send_notification')
  sendOrderCreatedNotification(@Payload() order) {
    console.log(
      '[Notification-service]: Received order created event for order:',
      order,
    );
    // Here you can implement the logic to send a notification, e.g., via email or SMS.
  }

  @MessagePattern('payment_processed')
  sendPaymentSuccessfulEmail(@Payload() order) {
    console.log(
      '[Notification-service]: Received payment successful event for order:',
      order,
    );
  }
}
