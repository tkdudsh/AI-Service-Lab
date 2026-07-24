# House Price AI - FastAPI 만들기

## 작업 위치

`services/01-house-price-ai/ai-server`

## 목표

이미 학습된 모델 파일을 사용해서 집값 예측 API를 만든다.

모델 파일 위치:

`models/house_price_model.pkl`

## Claude Code에게 요청할 일

`main.py` 파일을 수정해서 FastAPI 서버를 완성해주세요.

## 반드시 지킬 것

1. `templates` 폴더는 수정하지 마세요.
2. `services/01-house-price-ai/ai-server/main.py`만 수정하세요.
3. `joblib`으로 `models/house_price_model.pkl` 파일을 불러오세요.
4. `POST /predict` API를 만들어 주세요.
5. 입력값은 아래 8개입니다.

- MedInc
- HouseAge
- AveRooms
- AveBedrms
- Population
- AveOccup
- Latitude
- Longitude

6. 응답은 아래 형식으로 해주세요.

```json
{
  "predicted_price": 2.845
}

## Claude Code 실행

이 문서의 요구사항을 모두 수행하여
services/01-house-price-ai/ai-server/main.py
파일을 완성해주세요.
commit

```
