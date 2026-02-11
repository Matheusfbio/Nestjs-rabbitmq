<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Descrição

Projeto de estudo sobre arquitetura de microsserviços utilizando NestJS e RabbitMQ como message broker.

## Sobre o Projeto

Este projeto demonstra a implementação de uma arquitetura de microsserviços com comunicação assíncrona através do RabbitMQ. O objetivo é estudar e aplicar conceitos de:

- **Arquitetura de Microsserviços**: Separação de responsabilidades em serviços independentes
- **Message Broker**: Comunicação assíncrona entre serviços usando RabbitMQ
- **Event-Driven Architecture**: Processamento baseado em eventos
- **NestJS Microservices**: Utilização do módulo de microsserviços do NestJS

## Arquitetura

O projeto é composto por 4 serviços:

### 1. API Gateway (porta 3000)

- Ponto de entrada HTTP para o sistema
- Recebe requisições REST e encaminha para os microsserviços via RabbitMQ
- Rota: `POST /api/order`

### 2. Order Service

- Processa pedidos recebidos
- Emite eventos para Payment Service e Notification Service
- Escuta: `order_created`
- Emite: `process_payment`, `send_notification`

### 3. Payment Service

- Processa pagamentos dos pedidos
- Notifica sobre o status do pagamento
- Escuta: `process_payment`
- Emite: `payment_processed`

### 4. Notification Service

- Envia notificações sobre eventos do sistema
- Escuta: `send_notification`, `payment_processed`

## Fluxo de Comunicação

```
Cliente HTTP → API Gateway → [RabbitMQ] → Order Service
                                              ↓
                                    ┌─────────┴─────────┐
                                    ↓                   ↓
                            Payment Service    Notification Service
                                    ↓
                            Notification Service
```

## Pré-requisitos

- Node.js (v18+)
- RabbitMQ rodando localmente na porta 5672
- Credenciais padrão: `user:12345`

## Instalação

```bash
$ npm install
```

## Executando o Projeto

Você precisa iniciar todos os serviços em terminais separados:

```bash
# Terminal 1 - API Gateway
$ nx serve api-gateway

# Terminal 2 - Order Service
$ nx serve order-service

# Terminal 3 - Payment Service
$ nx serve payment-service

# Terminal 4 - Notification Service
$ nx serve notification-service
```

## Testando

Use o arquivo `client.http` para testar:

```http
POST http://localhost:3000/api/order
Content-Type: application/json

{
  "orderId": 132,
  "user": "Matheus Fabio"
}
```

## Tecnologias Utilizadas

- **NestJS**: Framework Node.js para construção de aplicações server-side
- **RabbitMQ**: Message broker para comunicação assíncrona
- **TypeScript**: Linguagem de programação
- **Nx**: Ferramenta de monorepo para gerenciar múltiplos projetos
