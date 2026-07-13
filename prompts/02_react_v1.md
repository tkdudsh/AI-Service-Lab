# AI Service Lab

# Project 01 - House Price AI

---

## 프로젝트 정보

현재 프로젝트는 AI Service Lab의 Master React Template를 기반으로 생성되었습니다.

기존 프로젝트 구조는 유지하고,
House Price AI 서비스 화면으로 변경해주세요.

---

## 작업 대상

수정 가능한 폴더

services/01-house-price-ai/frontend

수정 금지

- templates
- prompts
- docs
- services/01-house-price-ai/ai-server

---

# 프로젝트 목표

React와 FastAPI를 연동하여

"집값 예측 AI 서비스"

웹 화면을 완성합니다.

---

# 현재 백엔드 정보

FastAPI 서버

http://127.0.0.1:8000

예측 API

POST

/predict

---

## Request JSON

```json
{
  "MedInc": 8.3252,
  "HouseAge": 41,
  "AveRooms": 6.9841,
  "AveBedrms": 1.0238,
  "Population": 322,
  "AveOccup": 2.5556,
  "Latitude": 37.88,
  "Longitude": -122.23
}
```

---

## Response JSON

```json
{
  "predicted_price": 4.26
}
```

---

# 화면 요구사항

화면은 깔끔한 카드(Card) 형태로 구성합니다.

## Header

House Price AI

React + FastAPI 기반
부동산 가격 예측 서비스

---

## 입력폼

숫자 입력(Input Number)

아래 항목을 입력받습니다.

- MedInc
- HouseAge
- AveRooms
- AveBedrms
- Population
- AveOccup
- Latitude
- Longitude

---

## Button

예측하기

---

## Result Card

예측 완료 후

아래처럼 출력합니다.

예측 집값

4.26

---

## Loading

API 호출 중에는

버튼을

예측 중...

으로 변경합니다.

---

## Error

API 실패 시

사용자에게

오류 메시지를 출력합니다.

예)

FastAPI 서버에 연결할 수 없습니다.

---

# 개발 요구사항

React Hooks 사용

useState 사용

API 통신은 fetch 사용

(App Router가 아니라 일반 React 방식)

기존 Template 구조 유지

불필요한 라이브러리 설치 금지

App.jsx

App.css

중심으로 작성

모든 중요한 코드에

초보자를 위한 주석 작성

---

# UI 디자인

Bootstrap 사용하지 않습니다.

Tailwind 사용하지 않습니다.

순수 CSS만 사용합니다.

카드 형태

가운데 정렬

반응형

적당한 여백

읽기 쉬운 디자인

---

# 코드 품질

가독성을 최우선으로 작성합니다.

학생들이 읽고 이해할 수 있도록

복잡한 문법은 사용하지 않습니다.

---

# 실행 방법

React 실행 방법도 설명해주세요.

예)

npm run dev

---

# 출력 형식

수정한 파일 목록

예)

src/App.jsx

src/App.css

각 파일의 전체 코드를 작성해주세요.

코드 외의 불필요한 설명은 생략해주세요.
