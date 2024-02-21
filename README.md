# 📚 READ ME

## 📌 2차 프로젝트 개요

1. 3-Layered Architecture 구조 변경 적용

   - Controller, Service, Repository Layer로 변경
   - 각 Layer를 Class로 구현

2. 유닛 테스트 코드 작성

   - 각 계층에 Jest를 사용한 테스트 코드 작성

3. Redis

   - RefreshToken을 Hash 자료구조 형태로 Redis에 저장
   - Redis Cloud 연결 (30MB)

4. AWS EC2 배포
   - ~~시도: Docker-Compose를 이용하여 다중 컨테이너 운영~~
     ~~(Docker-Node 웹서버, Docker-Mysql, Docker-Redis)~~

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
│   ├── errorhandler.Middleware.js
│   └── jwt-validate.Middleware.js
│   └── auth.Middleware.js
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

   - 상태와 데이터를 조작하는 프로세스(메서드)가 같은 모듈 내부에 배치할 수 있으며,
     코드의 가독성과 재사용성이 높아지고, 유지보수를 쉽게할 수 있는 장점이 있습니다.

2. **3-Layered Architecture의 장점과 단점을 아는대로 적어주세요.**

   - 장점

     - 가장 크게 다가왔던 장점은, 각 계층별로 테스트 코드를 구성함으로써 단위 테스트를 조금 더 빠르고 명확하게 작성할 수 있었던 것 같습니다.
     - 각각의 관심사를 분리하여 구현하려는 코드를 명확하게 인지할 수 있습니다.
     - 각 계층이 자신의 바로 아래 계층에만 의존하게 만들어 모듈 교체나 코드 수정이 더욱 쉬워지는 것 같습니다. 애플리케이션을 더욱 안정적으로 개발할 수 있을 것 같습니다.
     - 협업시 분리 계층에 대한 업무 분담이 가능할 것으로 생각되며, 효율적인 업무가 가능할 것 같습니다.
     - 계층별로 여러 대의 서버를 나누는 방식으로 서버의 부하를 줄이거나, 스케일업도 가능하다고 알고 있습니다.

       <br>

   - 단점

     - 하지만 복잡한 서비스 구조나 로직들이 추가되는 상황에서 분리된 계층 구조로 작업하는 것에서는 오히려 업무량이 많아지거나 관리할 포인트가 늘어날 것 같습니다.
     - 한 계층의 변화가 다른 계층의 변화를 발생시키는 의존 관계에서 발생되는 단점들이 존재할 것 같습니다.

3. **테스트코드 작성의 장점과 단점을 아는대로 적어주세요.**

   - 장점
     - 개발 과정에서 예상치 못한 문제를 발견할 수 있습니다.
     - 실제 코드가 의도한 대로 작동하는지 검증할 수 있습니다.
     - 코드의 구조 변경이나 리펙터링할 때, 변경한 부분으로 인해 어디에 어떤 영향을 주는지 쉽게 파악할 수 있었습니다.
     -
   - 단점
     - 실제 코드와 테스트 코드 모두를 작성하며 개발할때는 소요되는 시간을 잘 계획해야한다는 것을 느꼈습니다.
     - 실제 코드를 변경하면, 테스트 코드 또한 변경해야하므로 유지보수 비용이 추가됩니다.
     - 테스트를 해야하는 코드, 하지 않아도 되는 코드를 구분하는 것도 필요할 것으로 보입니다. 단순히 테스트 커버리지 100%만 쫓는 것은 의미가 없다는 사실도 알게 되었습니다.

4. **테스트의 종류 3가지와 각각이 무엇인지 간단히 설명해 주세요.**

   - 단위 테스트(Unit Test) : 개별적인 코드 단위가 예상대로 작동하는지 확인하기 위한 테스트
   - 통합 테스트(Integration Test) : 단위 테스트가 끝난 모듈을 통합하는 과정에서 발생할 수 있는 오류를 찾기 위한 테스트
   - E2E 테스트(End-to-end Test) : 종단(Endpoint) 간 테스트를 뜻하며, 실제 사용자의 입장에서 테스트하는 것을 의미

5. **서버가 2대 이상 있을경우 장점이 어떤게 있고, 무중단 서비스는 어떤 원리로 동작하는지 설명해주세요.**

   - 하나의 서버가 다운되더라도 다른 서버가 그 역할을 대신할 수 있어 서비스가 중단되지 않게 대비할 수 있으며, 서비스 장애와 데이터 백업과 복구, 배포에 있어 부담을 줄일 수 있습니다.
   - 여러 서버를 사용하면 트래픽이나 부하 분산을 통해 서버 성능을 최적화할 수 있고, 사용자에게 더 빠르고 안정적인 서비스를 제공할 수 있습니다.
   - 여러 대의 서버는 독립적으로 작동하기 때문에 장애가 발생해도 다른 서버나 사용자에게 미치는 영향 또한 최소화할 수 있습니다.
   - Blue-Green 배포, Rolling 업데이트 등의 배포 기법과 같이 새로운 변경사항을 적용하기 전에 준비하고 기존 환경과 교체하는 방식, 또는 전체 시스템을 중단하지 않고 순차적으로 업데이트하거나 교체하는 방식 등으로 동작합니다.
