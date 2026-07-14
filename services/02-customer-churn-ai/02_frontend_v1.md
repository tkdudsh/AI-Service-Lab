# AI Service Blueprint

# Project 02 - Customer Churn AI

## 현재 단계

STEP 6 - React + FastAPI 연결

---

## 작업 위치

services/02-customer-churn-ai/frontend

---

## 목표

React 화면에서 고객 정보를 입력하면  
FastAPI의 `/predict` API를 호출하여  
고객 이탈 여부를 화면에 출력한다.

---

## 현재 백엔드 정보

FastAPI 서버 주소:

http://127.0.0.1:8000

예측 API:

POST http://127.0.0.1:8000/predict

응답 예시:

```json
{
  "prediction": 1,
  "result": "Churn"
}
```

prediction 의미:

- 0 → Stay
- 1 → Churn

---

## 중요한 규칙

- services/02-customer-churn-ai/frontend 폴더만 수정한다.
- templates 폴더는 수정하지 않는다.
- prompts 폴더는 수정하지 않는다.
- ai-server 폴더는 수정하지 않는다.
- 기존 React 구조를 최대한 유지한다.
- 불필요한 라이브러리를 설치하지 않는다.

---

# 화면 요구사항

## 제목

Customer Churn AI

## 설명

React + FastAPI 기반 고객 이탈 예측 서비스

## 입력폼

FastAPI `/predict`에서 요구하는 입력값을 기준으로 폼을 만든다.

입력값이 많을 경우, 핵심 입력값 위주로 보기 좋게 구성한다.

예상 입력 예시:

- Gender
- Age
- Under 30
- Senior Citizen
- Married
- Dependents
- Tenure in Months
- Phone Service
- Internet Service
- Contract
- Paperless Billing
- Payment Method
- Monthly Charge
- Total Charges
- Satisfaction Score

## 버튼

예측하기

## 결과 카드

예측 성공 시 다음처럼 출력한다.

- 예측 결과: Churn
- prediction: 1

prediction이 0이면:

- 예측 결과: Stay
- prediction: 0

## Loading

API 요청 중에는 버튼 텍스트를

예측 중...

으로 표시한다.

## Error

API 호출 실패 시

FastAPI 서버에 연결할 수 없습니다.

라는 메시지를 출력한다.

---

# 코드 요구사항

- React Hooks 사용
- useState 사용
- fetch 사용
- App.jsx와 App.css 중심으로 작성
- 초보자가 이해할 수 있도록 주요 코드에 한글 주석 작성
- 기존 Vite 기본 화면 제거
- 카드형 UI
- 반응형 CSS
- Project 01 House Price AI와 비슷한 디자인 톤 유지

---

# 출력 형식

수정한 파일 목록과 전체 코드를 작성한다.

예:

- src/App.jsx
- src/App.css
