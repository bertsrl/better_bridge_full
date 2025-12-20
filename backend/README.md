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
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Better Bridge API

A NestJS-based API with real-time logging dashboard for monitoring webhooks and API requests.

## 🚀 Quick Start

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start the development server:**

   ```bash
   npm run start:dev
   ```

3. **Access the dashboard:**
   ```
   http://localhost:3000/dashboard
   ```

## 📊 API Logs Dashboard

The project includes a beautiful, real-time web dashboard for monitoring all API requests and responses, including webhook payloads.

### Features:

- **Real-time monitoring** of all HTTP requests/responses
- **Webhook payload inspection** with JSON formatting
- **Performance metrics** (response times, error rates)
- **Filtering** by endpoint and HTTP method
- **Auto-refresh** every 2 seconds
- **Modern, responsive design**

### Dashboard URL:

```
http://localhost:3000/dashboard
```

## 🧪 Testing the API

### Test Webhook Endpoint:

```bash
curl -X POST http://localhost:3000/api/v1/listeners/webhook/test \
  -H "Content-Type: application/json" \
  -d '{
    "event": "user.created",
    "data": {
      "userId": 123,
      "email": "test@example.com"
    }
  }'
```

### API Endpoints:

- `GET /api/v1/listeners` - Get all listeners
- `POST /api/v1/listeners` - Create a listener
- `GET /api/v1/listeners/:id` - Get specific listener
- `PUT /api/v1/listeners/:id` - Update listener
- `DELETE /api/v1/listeners/:id` - Delete listener
- `POST /api/v1/listeners/webhook/test` - Test webhook endpoint

## 📁 Project Structure

```
src/
├── api/
│   ├── api.module.ts              # Main API module
│   └── v1/
│       ├── v1.module.ts           # V1 API module
│       ├── listeners/             # Listeners API
│       │   ├── listeners.module.ts
│       │   ├── listeners.controller.ts
│       │   ├── listeners.service.ts
│       │   └── dto/
│       └── logging/               # Logging system
│           ├── logging.module.ts
│           ├── logs.controller.ts
│           └── logging.service.ts
├── middleware/
│   └── logging.middleware.ts      # Request logging middleware
├── dashboard.controller.ts        # Dashboard controller
└── app.module.ts                 # Main application module
```

## 🛠️ Available Scripts

- `npm run start:dev` - Start development server with hot reload
- `npm run build` - Build the project
- `npm run test` - Run unit tests
- `npm run test:e2e` - Run end-to-end tests
- `npm run lint` - Run ESLint

## 🎯 Use Cases

- **Webhook Development**: Monitor incoming webhook payloads in real-time
- **API Testing**: See all API requests and responses
- **Debugging**: Real-time request monitoring and JSON inspection
- **Performance Analysis**: Track response times and error rates

## 🔒 Security Notes

- Dashboard is publicly accessible (no authentication)
- Logs may contain sensitive data
- Consider adding authentication for production use
- Logs are stored in memory only (not persisted)

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Deploy your application to AWS with the help of [NestJS Mau](https://mau.nestjs.com) in just a few clicks.
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
