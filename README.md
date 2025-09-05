![sherpa coding challenge banner](docs/fullstack-engineer.png)

# 🌎 Fullstack Engineer Coding Challenge

## Welcome to sherpa°!

We're excited to see your skills in action! This challenge is designed to showcase your full stack expertise in a real-world scenario that reflects our mission: helping travelers cross borders freely and efficiently.

**Time Expectation:** Please spend no more than 3 hours on this challenge. We value your time and are more interested in your approach than completeness.

> Already have a project that demonstrates your skills? Skip to the [Assessment](#-assessment-criteria) section to ensure it covers the areas we're looking for.

## 🚀 The Challenge

At sherpa°, we help travelers find and purchase the visas they need. Your mission is to build a **API for visa products** that's production-ready and showcases your expertise.

**Core Requirements:**
- Browse all visa products (with pagination and filtering)
- View individual product details
- Edit product information
- Create new products

**Your Approach:** Build this however you think best demonstrates your skills. You might focus heavily on creating a robust, scalable API with comprehensive testing and documentation. Or you might build an exceptional user interface with advanced interactions and state management. You could also strike a balance between both frontend and backend. The choice is yours.

**What We're Looking For:** Production-quality code that shows your expertise, whether that's in API design, user experience, system architecture, testing strategies, or performance optimization. Focus on what you do best and make it great.

## 💱 Advanced Feature: Currency Conversion (Enhancement)

**For Senior Engineers:** If you want to showcase advanced concepts like third-party API integration, caching strategies, and error handling, implement real-time currency conversion for visa prices.

### Requirements
- **Currency Support**: Design API endpoints to handle multiple currencies
- **Real-time Conversion**: Integrate with external exchange rate services
- **Performance**: Consider how to handle repeated requests efficiently
- **Reliability**: Plan for when external services are unavailable
- **User Experience**: Handle invalid inputs gracefully

### Recommended APIs
**Use one of these (credentials can be created easily):**
- **ExchangeRate-API** (exchangerate-api.com) - Simple, reliable
- **Fixer.io** - Professional grade with good documentation
- **CurrencyAPI** (currencyapi.com) - Modern REST API with good rate limits

### Consider
- How will you structure your API to support currency conversion?
- What happens when exchange rate APIs are slow or down?
- How can you minimize external API calls while keeping rates current?
- What's the best user experience for invalid currency requests?

**This feature demonstrates:** API integration, caching patterns, error handling, performance optimization, and production-ready thinking.

## 🚦 Getting Started

Quick setup:
```
npm i -g yarn # if you don't have yarn installed
yarn
```

Running the applications:
```
npx nx run client:serve  # For the frontend
npx nx run server:serve  # For the backend
```

Need help? Contact us immediately if you encounter any setup issues!

## 🛠️ Tech Stack
This project mimiks our own codebase, so it gives you a preview of what you can expect joining the team!
However we don't expect you to be fully familiar with the specific frameworks and tools. 

We have an [Nx monorepo](https://nx.dev) with:
1. An Angular application
2. A NestJS application 
3. A CSV dataset example of visa products

Feel free to use these or swap them for your preferred frameworks. 

Just ensure you're working with TypeScript which is the only hard requirement. 

The setup is intentionally minimal to give you creative freedom without having to start from scratch.


<details>
<summary>See our complete Techstack</summary>
  
```
TypeScript
NodeJS
Express
NestJS
NoSQL (Firestore)
SQL (PostgreSQL)
Nx (monorepo)
Angular (17+)
TailwindCSS
Terraform
GitHub
Datadog
Launchdarkly
Google Cloud Platform (Cloud Run, Cloud Functions, PubSub, BigQuery, Scheduler, Cloud Endpoints, Firestore)
```
</details>

### Prefer React?
We understand you might not have all the Angular sills (yet) to hit the ground running. We deeply care about what user experience you're able to shape using technology as your tools. On the job we will support you getting up to speed with Angular.

Follow the basic steps below to install react and create a new application for you to work with in Nx.
```
npx nx add @nx/react
npx nx g @nx/react:application apps/react-client
npx nx run react-client:serve
```

### Prefer Express/Fastify/etc?
We understand you might not have all the NestJS sills (yet) to hit the ground running. We deeply care about building resilient and performant APIs that are delightful for developers to use. On the job we will support you getting up to speed with NestJS.

```
npx nx add @nx/node
npx nx g @nx/node:application apps/node-server
npx nx run node-server:serve
```

Other supported frameworks by Nx can be found [in the Nx online documentation](https://nx.dev/nx-api).

## 📊 Data

The provided CSV contains visa product information with the following fields:
- Country
- Visa Type
- Price (USD)
- Length of Stay (Days)
- Number of Entries
- Filing Fee (USD)


```
Country,Visa Type,Price (USD),Length of Stay (Days),Number of Entries,Filing Fee (USD)
USA,Tourist,160,90,Single,20
USA,Business,185,180,Multiple,25
USA,Student,350,730,Multiple,50
Canada,Tourist,100,180,Single,15
Canada,Business,150,365,Multiple,30
Canada,Student,200,1095,Multiple,40
UK,Tourist,130,180,Single,25
UK,Business,200,365,Multiple,35
UK,Student,450,1095,Multiple,55
France,Schengen,80,90,Single,10
Germany,Schengen,90,90,Multiple,12
Italy,Schengen,85,90,Single,11
Spain,Schengen,88,90,Multiple,13
Australia,Tourist,145,90,Single,18
Australia,Business,250,365,Multiple,40
Australia,Student,620,1095,Multiple,60
Japan,Tourist,30,90,Single,8
Japan,Business,55,180,Multiple,12
Japan,Student,100,730,Multiple,25
China,Tourist,140,90,Single,20
China,Business,185,180,Multiple,30
China,Student,250,1095,Multiple,45
India,Tourist,25,30,Single,5
India,Business,75,180,Multiple,10
India,Student,100,365,Multiple,20
Brazil,Tourist,40,90,Single,10
Brazil,Business,160,180,Multiple,25
Brazil,Student,200,730,Multiple,35
Russia,Tourist,50,30,Single,15
Russia,Business,150,180,Multiple,25
Russia,Student,250,1095,Multiple,40
UAE,Tourist,90,30,Single,10
UAE,Business,120,180,Multiple,15
UAE,Student,250,1095,Multiple,35
Mexico,Tourist,36,180,Single,8
Mexico,Business,100,365,Multiple,20
Mexico,Student,200,1095,Multiple,30
South Africa,Tourist,50,90,Single,12
South Africa,Business,125,180,Multiple,18
South Africa,Student,200,1095,Multiple,30
Argentina,Tourist,150,90,Single,15
Argentina,Business,180,180,Multiple,25
Argentina,Student,250,1095,Multiple,35
Thailand,Tourist,35,60,Single,5
Thailand,Business,75,180,Multiple,10
Thailand,Student,175,730,Multiple,25
Vietnam,Tourist,25,30,Single,5
Vietnam,Business,50,180,Multiple,12
Vietnam,Student,150,730,Multiple,20
```
## ✅ What We're Evaluating

We're more interested in your approach and decision-making than feature completeness. Show us your expertise in the areas you care most about:

**Code Quality & Architecture:** Clean, maintainable code with thoughtful structure. Whether that's elegant API design, component architecture, testing strategies, or performance optimizations.

**Production Readiness:** Code that feels ready for real users. This might include proper error handling, input validation, documentation, logging, or user experience considerations.

**Technical Depth:** Deep implementation in your chosen focus areas rather than surface-level coverage of everything. We'd rather see excellent API design with comprehensive testing than basic implementations across all features.

**Communication:** Clear documentation of your approach, trade-offs, and decisions. Help us understand your thinking and what you'd improve with more time.

### Out of Scope
Don't worry about: Authentication, CI/CD pipelines, deployment configurations, or extensive wireframes.

### Submission Requirements
Include a brief document explaining:
- Your focus areas and why you chose them
- Key architectural decisions and trade-offs
- How you'd scale this with more users/data
- What you'd improve given more time

> **A note on AI:** Feel free to use AI tools if helpful—we do too! Just be prepared to discuss your experience with them.

We're excited to see your approach and discuss your solution. Good luck!
