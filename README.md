# 📚 READ ME

## 📌 2차 프로젝트 개요

1. 3-Layered Architecture 구조 변경 적용

   - Controller, Service, Repository Layer로 변경
   - 각 Layer를 Class로 구현

2. 유닛 테스트 코드 작성

   - 각 계층에 Jest를 사용한 테스트 코드 작성

3. Redis

   - 로컬 전역변수로 관리하고 있는 RefreshToken을 Redis에 저장

---

## 📌 1차 프로젝트 개요

1. MySQL, Prisma ORM을 이용한 데이터베이스 설계 및 활용

   - 데이터 모델링을 통한 ERD 작성
   - Prisma를 이용한 스키마 코드 작성
   - JOIN을 통해 다른 Table의 데이터와 결합

2. 인증 기능 구현

   - JWT(AccessToken, RefreshToken) 이해
   - 회원가입 API, 로그인 API 및 인증 Middleware 구현
   - 이력서 관련 기능에 인증 로직 추가

3. 라우터, 미들웨어, 컨트롤러 분리 및 테스트 코드 작성

   - 라우터, 미들웨어, 컨트롤러 분리와 역할 이해
   - Jest, node-mocks-http, Supertest를 활용한 테스트 코드 작성

4. 기타 구현사항
   - 간편 로그인, 자동 로그인
   - bcrypt 모듈을 활용한 ClientId 및 Password Hash 처리
   - 인사담당자 권한 분리
   - Swagger를 활용한 API 명세서 작성
     <br>

👉🏼 **[Github]** https://github.com/boogie-bogie/Resume-project

👉🏼 **[Notion API Dcos]** https://kbworks.notion.site/3a8bbc7f4b2e40f993b7fe0f5e421282?v=9ecdaaf092254802b6888d527b052884&pvs=4

👉🏼 **[ERD]** https://drawsql.app/teams/1-524/diagrams/resume-project

<br>

<br><br>

### 🔧 개발 기간

- 1차 : 2024.01.31 - 2024.02.02
- 2차 : 2024.02.16 - 2024.02.21

<br><br>

### 📁 Directory Structure: 폴더 구조

```bash
.
├── .env
├── .gitignore
├── .prettierrc
├── middlewares
│   ├── errorhandler.Middleware
│   └── auth.middleware.js
└── repositories
│   ├── resumes.repository.js
│   └── users.repository.js
└── services
│   ├── resumes.service.js
│   └── users.service.js
└── controllers
│   ├── resumes.controller.js
│   └── users.controller.js
└── routers
│   ├── resumes.router.js
│   ├── token.router.js
│   └── users.router.js
└── uils
│   └── prisma
│       └── index.js
└── prisma
│   └── schema.prisma
└── redis
│   ├── client.js
│   └── keys.js
├── tests
│   ├── data
│   │   ├── all-resumes.data.json
│   │   ├── new-resume.data.json
│   │   ├── all-users.data.json
│   │   └── new-user.data.json
│   ├── integration
│   └── unit
│       ├── repositories
│       │   └── resumes.repository.uint.spec.js
│       ├── services
│       │   └── resumes.service.uint.spec.js
│       └── controllers
│           └── resumes.controller.uint.spec.js
├── app.js
├── swagger-output.json
├── swagger.js
├── package-lock.json
└── package.json

```

<br><br>

## 📢 더 고민해 보기

---

1. **Class로 리팩토링 했을 때 장점이 무엇인지 설명해 주세요.**

   -

2. **3-Layered Architecture의 장점과 단점을 아는대로 적어주세요.**

   -

3. **테스트코드 작성의 장점과 단점을 아는대로 적어주세요.**

   -

4. **테스트의 종류 3가지와 각각이 무엇인지 간단히 설명해 주세요.**

   -

5. **서버가 2대 이상 있을경우 장점이 어떤게 있고, 무중단 서비스는 어떤 원리로 동작하는지 설명해주세요.**

   -

6. **이번 과제에서 Prisma를 TypeORM로 교체할 때 3-Layered Architecture를 기반으로 프로젝트가 구성되어있으면 어떤 장점이 있었나요?**
