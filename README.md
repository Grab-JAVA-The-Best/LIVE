# Live(누구나 쉽게 집을 구할 수 있는 One-Stop 완전 비대면 부동산 서비스)

![CON_1](/uploads/a2d156cceaaddba9751fe63a4098ea91/CON_1.png)


## 1. Live 소개

---

### Live는 부동산에 방문하여 직접 발품을 팔기 어려운 사람들을 위한 비대면 부동산 플랫폼으로,  온라인을 통해 간편하게 매물 정보를 획득할 수 있을 뿐만 아니라 국토교통부 부동산 거래 전자계약 시스템과 연결하여 고객과 부동산이 비대면으로도 실시간 소통 및 계약을 할 수 있는 One-Stop 서비스를 제공합니다.

## 2. 주요 기능

![화면_녹화_전체](/uploads/46cc39ffbc6c2d0d4ba372d99c0f8ad4/화면_녹화_전체.gif)

---

### 2-1.  서비스 소개

**1. 지역별 공인중개사 검색 및 상담예약**

**2. 중개사 매물 관리**

**3. 상담매물 검색 및 상담매물목록 수정**

**4. 실시간 화상통화 상담**

**5. 상담 시 현재 보고있는 방 실시간 표시**

**6. 상담 리뷰 작성**

**7. 계약 요청**

**8. 중개사가 계약 승인 시 국토교통부 전자계약 시스템으로 이동**

**9. SMS 알림 및 상담 당일 안내문자 발송**

### 2-2. 기술 특이점

- **Spring Security, JWT**
사용자마다 '인증'과 '권한'을 통해 사용자 정보를 보호
Credential 을 사용하여 Credential 기반의 인증 방식을 사용하여 보안 로직 구현
- **Kurento WebRTC**
WebSocket, Session으로 Signaling Server를 구축하고 Kurento Media Server와 연결하여 실시간 화상 통화 구현
모든 사용자가 상담실을 벗어나더라도 상담실을 유지하여 링크를 통해 재접속 가능
상담실은 사용자의 종료 요청 또는 매일 자정 스케줄러를 통해 close 됨
- MediaStream에서 실시간 영상을 녹화하여 AWS EC2 스토리지에 저장하고, 웹에서 스트리밍 방식으로 제공
- Jenkins와 Dokcer을 이용해 서버를 분기해 배포하여 결합도를 낮추고, 젠킨스 환경변수로 주요 정보 암호화

## 3. 개발 환경

---

### 3-1. 환경 설정

💎 **프론트엔드**

- React : 18.2.0
- React-Redux : 8.0.5
- Node : 16.16.0
- React-Router-Dom : 6.7.0
- Javascript

👑 **백엔드**

- Java, : JDK8
- SpringBoot : 2.7.7
- Thymeleaf : 3.1.1.RELEASE
- Jwt : 0.11.2

💡 **DB**

- MySQL :  8.0.32
- Redis : 7.0.8
- S3 : 1.12.387

🌳 **운영체제, 서버**

- Docker : 20.10.12
- Nginx : 1.18.0
- Ubuntu : 20.04.5 LTS
- Jenkins : 2.375.2
- Certbot

**미디어서버**

- Kurento : 6.18.0

### 3-2. 서비스 아키텍처

![010](/uploads/d25989c92da14299eaddc1b02737ea73/010.png)


## 4. 설계 문서

---

### 4-1. ERD

![Untitled](/uploads/b1ee4c4745cc52ee2158758278fec8b6/Untitled.png)


### 4-2. 화면 설계서

![_ED_99_94_EB_A9_B4__EC_84_A4_EA_B3_84_EC_84_9C](/uploads/e5387e076af85891b0116703f2255183/_ED_99_94_EB_A9_B4__EC_84_A4_EA_B3_84_EC_84_9C.png)


### 4-3. 요구사항 명세서

![요구사항_명세서](/uploads/1dad104a101bd9319ae8fe962ad2279e/요구사항_명세서.gif)


### 4-4. API 명세서

![API_명세서](/uploads/b7bac6b6df9fe90669788402ada98899/API_명세서.gif)


## 5. 협업 툴 및 코드 컨벤션

---

### 5-1. 협업 툴

- Git
- Jira
- Notion
- Mattermost
- Webex

### 5-2. 코드 컨벤션

**공통 규칙**

식별자(identifier)는 아스키코드 글자와 숫자, 몇몇 예외경우, 언더바 만 허용한다. 

**클래스 이름**

UpperCamelCase 로 작성한다. UpperCamelCase 란 문장의 공백을 삭제한 후 첫글자를 대문자로 작성하고 다음 단어의 첫글자들을 대문자로 바꾸어주는 것을 의미한다.

**메소드 이름**

lowerCamelCase 🐫 로 작성한다. 메소드 이름은 동사로 작성한다. ex) `sendMessage` `stop`

**상수 이름**

상수이름은 `CONSTANT_CASE` 스타일로 작성한다. 

### 5-3. Git 컨벤션

**Git Flow**

main < develop < feature/개발할기능

1. feature명은 **하이픈 `-**` 으로 잇기
2. 모두 소문자

ex) **feature/live-func**

**commit 규칙**

- gitmoji를 사용
- Commit 메시지는 자세한 설명을 포함해야 한다.
- 영어는 **첫 글자**만 대문자, **축약형**은 모두 대문자

## 6. 팀원 소개

---

![020](/uploads/bb106efaa6d9726104af4a479534e0ab/020.png)
