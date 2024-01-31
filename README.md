# 📚 READ ME

## 📌 프로젝트 개요

---

<br>
👉🏼 [Domain] http://bogiegie.shop:3000/api

👉🏼 **[Github]** https://github.com/boogie-bogie

👉🏼 **[Swagger API Docs]** http://localhost:3000/api-docs
👉🏼 **[Notion API Dcos]** https://www.notion.so/f09222ba36a444d5802f6c08945468bf
👉🏼 **[ERD]** https://drawsql.app/teams/1-524/diagrams/resume-project

<br>

- 웹 프레임워크/데이터베이스 : Node.js, Express.js, MySQL, Prisma ORM
- 배포 : AWS EC2 배포, Gabia 도메인 연결
  <br><br>

### 🔧 개발 기간

- 2024.01.31 - 2024.02.02

<br><br>

### 📁 Directory Structure: 폴더 구조

```bash
.
├── .env
├── .gitignore
├── .prettierrc
├── middlewares
│   └── auth.middleware.js
└── controllers
│   ├── resumes.js
│   └── users.js
└── routers
│   ├── resumes.router.js
│   └── users.router.js
└── prisma
│   ├── index.js
│   └── schema.prisma
├── tests
│   ├── data
│   ├── integration
│   └── unit
├── app.js
├── package-lock.json
└── package.json

```

<br><br>

## 📢 더 고민해 보기

---

1. **암호화 방식**
   - 비밀번호를 DB에 저장할 때 Hash를 이용했는데, Hash는 단방향 암호화와 양방향 암호화 중 어떤 암호화 방식에 해당할까요?
   - 비밀번호를 그냥 저장하지 않고 Hash 한 값을 저장 했을 때의 좋은 점은 무엇인가요?
2. **인증 방식**
   - JWT(Json Web Token)을 이용해 인증 기능을 했는데, 만약 Access Token이 노출되었을 경우 발생할 수 있는 문제점은 무엇일까요?
   - 해당 문제점을 보완하기 위한 방법으로는 어떤 것이 있을까요?
3. **인증과 인가**
   - 인증과 인가가 무엇인지 각각 설명해 주세요.
   - 과제에서 구현한 Middleware는 인증에 해당하나요? 인가에 해당하나요? 그 이유도 알려주세요.
4. **Http Status Code**
   - 과제를 진행하면서 사용한 Http Status Code를 모두 나열하고, 각각이 의미하는 것과 어떤 상황에 사용했는지 작성해 주세요.
     - #201/POST 요청 성공 : 회원가입 성공
     - #409/유효성 검사 실패 : 중복된 이메일, 비밀번호 6자리
     - #408/정보 불일치 : 존재하지 않는 이메일, 비밀번호 확인과 불일치
5. **리팩토링**
   - MySQL, Prisma로 개발했는데 MySQL을 MongoDB로 혹은 Prisma 를 TypeORM 로 변경하게 된다면 많은 코드 변경이 필요할까요? 주로 어떤 코드에서 변경이 필요한가요?
   - **만약 이렇게 DB를 변경하는 경우가 또 발생했을 때, 코드 변경을 보다 쉽게 하려면 어떻게 코드를 작성하면 좋을 지 생각나는 방식이 있나요? 있다면 작성해 주세요.**
6. **API 명세서**
   - notion 혹은 엑셀에 작성하여 전달하는 것 보다 [swagger](https://swagger.io/) 를 통해 전달하면 장점은 무엇일까요?
