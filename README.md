# 📚 READ ME

## 📌 프로젝트 개요

---

<br>

👉🏼 **[Github]** https://github.com/boogie-bogie/Resume-project

👉🏼 **[Notion API Dcos]** https://kbworks.notion.site/3a8bbc7f4b2e40f993b7fe0f5e421282?v=9ecdaaf092254802b6888d527b052884&pvs=4

👉🏼 **[ERD]** https://drawsql.app/teams/1-524/diagrams/resume-project

<br>

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
│   └── errorhandler.Middleware
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
     - bcrypt 모듈을 활용하여 처리한 Hash는 복호화를 할 수 없기 때문에 단방향 암호화에 해당합니다.
   - 비밀번호를 그냥 저장하지 않고 Hash 한 값을 저장 했을 때의 좋은 점은 무엇인가요?
     - 개인정보보호법 준수 - 데이터베이스의 데이터가 탈취되더라도 사용자의 비밀번호는 노출되지 않게 됩니다. 악의적인 공격으로부터 사용자의 개인정보 및 서비스 이용정보를 보호할 수 있습니다.

2. **인증 방식**

   - JWT(Json Web Token)을 이용해 인증 기능을 했는데, 만약 Access Token이 노출되었을 경우 발생할 수 있는 문제점은 무엇일까요?

     - Access Token은 사용자 인증에 필요한 모든 정보를 가지고 있고, Stateless한 특성이 있어서 노출된 토큰인지, 현재 사용자와 처음 인증된 사용자가 일치하는지를 구분할 수 없는 문제가 발생합니다. 또한 한 번 발급한 Access Token은 강제로 이 토큰을 만료시킬 수도 없습니다.

   - 해당 문제점을 보완하기 위한 방법으로는 어떤 것이 있을까요?
     - Refresh Token을 발급하고 서버에 저장하는 방법으로 피해를 최소화할 수 있습니다. 로그인 시 클라이언트에게 Access Token과 Refresh Token을 함께 발급하고, 서버는 Refresh Token을 데이터베이스 혹은 Redis에 저장하며, 클라이언트가 인증(인가)가 필요한 요청을 보낼 경우, 클라이언트가 가지고 있는 Refresh Token과 서버에 저장된 Refresh Token을 대조하여 인증된 사용자임을 확인합니다.

3. **인증과 인가**

   - 인증과 인가가 무엇인지 각각 설명해 주세요.

     - 인증 : 서비스를 이용하려는 사용자가 인증된 사람인지를 검증하는 작업 - 인가 : 사용자가 특정 작업을 수행하거나 리소스에 접근할 권한이 있는지를 검증하는 작업

   - 과제에서 구현한 Middleware는 인증에 해당하나요? 인가에 해당하나요? 그 이유도 알려주세요.
     - 인가에 해당한다고 볼 수 있습니다. 인증은 로그인 과정에서 이루어지며, 사용자가 특정한 API(내 정보 확인, 이력서 생성/수정/삭제)를 요청할 경우 해당 작업을 수행할 권한이 있는지를 확인하므로, 인가에 해당합니다.

4. **Http Status Code**

   - 과제를 진행하면서 사용한 Http Status Code를 모두 나열하고, 각각이 의미하는 것과 어떤 상황에 사용했는지 작성해 주세요.
     - #200 OK : 요청이 성공적으로 수행
       - 로그인 성공, 사용자 정보 및 이력서 조회/수정/삭제 성공
     - #201 Created : 요청이 성공하여 그 결과로 새로운 리소스가 생성
       - 회원가입 및 회원정보 생성 성공, 이력서 생성 성공
     - #400 Bad Request : 잘못된 입력
       - 이메일 중복, 비밀번호 유효성 검사
     - #401 Unauthenticated : 인증 불가
       - Accesstoken 또는 Refreshtoken이 만료되어 로그인이 필요한 상황
     - #404 Not Found : 서버가 요청받은 리소스를 찾을 수 없음
       - 이력서 조회 실패
     - #500 Server Error : 서버 에러(요청을 처리할 수 없음)
       - 위 상태 코드를 제외한 모든 예외사항 처리

5. **리팩토링**

   - MySQL, Prisma로 개발했는데 MySQL을 MongoDB로 혹은 Prisma 를 TypeORM 로 변경하게 된다면 많은 코드 변경이 필요할까요? 주로 어떤 코드에서 변경이 필요한가요?

     - 네. 데이터 마이그레이션이 발생할 경우, 설계한 스키마 코드와 테이블 간 참조 관계를 변경하거나 재정의하는 작업이 수행될 것으로 예상됩니다.

   - **만약 이렇게 DB를 변경하는 경우가 또 발생했을 때, 코드 변경을 보다 쉽게 하려면 어떻게 코드를 작성하면 좋을 지 생각나는 방식이 있나요? 있다면 작성해 주세요.**
     - DB를 사용하는 로직을 통합/분리하는 방식으로 어느정도 대비할 수 있을 것 같습니다.
     - 라우터와 미들웨어, 컨트롤러를 분리하여 설계하였지만 아직 클라이언트의 요청을 처리하는 컨트롤러 내부에 DB 관련 로직이 포함되어 있습니다. DB 혹은 ORM/ODM 변경을 고려하여 리펙토링을 진행해보겠습니다.

6. **API 명세서**
   - notion 혹은 엑셀에 작성하여 전달하는 것 보다 [swagger](https://swagger.io/) 를 통해 전달하면 장점은 무엇일까요?
     - 디버깅, 테스트, 리펙토링 과정에서 코드의 변경이 있을 경우 Notion 혹은 엑셀에 작성된 API 명세서에 대한 변경사항이 누락될 수 있고, 이를 수정하는 작업 또한 비효율적이며 리소스 낭비라고 볼 수 있을 것 같습니다. Swagger를 사용함으로써 보다 효율적으로 명세서를 관리할 수 있습니다. - 또한 프론트엔드, PM/PO, 제품 디자이너 등 팀(스쿼드) 구성원과의 원활한 협업에도 Swagger가 큰 도움이 된다고 생각합니다.
