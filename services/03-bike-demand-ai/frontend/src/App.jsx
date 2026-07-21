import { useState } from 'react'
import axios from 'axios'
import './App.css'

// 브라우저는 Vite 개발 서버의 /predict로 요청하고, vite.config.js의 프록시가
// 이 요청을 FastAPI(http://127.0.0.1:8000)로 대신 전달합니다.
const API_URL = '/predict'

// 화면을 처음 열었을 때 각 입력창에 보여 줄 예시 값입니다.
// HTML input의 값은 문자열로 관리하고, 서버에 전송하기 직전에 숫자로 변환합니다.
const initialForm = {
  hour: '18',
  temperature: '25',
  humidity: '60',
  wind_speed: '2',
  visibility: '2000',
  dew_point: '16.5',
  solar_radiation: '0.5',
  rainfall: '0',
  snowfall: '0',
  season: 'Summer',
  holiday: 'No Holiday',
  functioning_day: 'Yes',
}

// 숫자로 변환해야 하는 입력값을 별도로 정의합니다.
// season, holiday, functioning_day는 문자 데이터이므로 이 목록에 넣지 않습니다.
const numericFields = new Set([
  'hour',
  'temperature',
  'humidity',
  'wind_speed',
  'visibility',
  'dew_point',
  'solar_radiation',
  'rainfall',
  'snowfall',
])

// 입력 필드를 성격에 따라 묶어 렌더링합니다. 같은 JSX를 반복해서 작성하지 않아도
// 되며, 필드를 추가할 때도 이 배열에 항목만 추가하면 됩니다.
const fieldGroups = [
  {
    title: '시간 및 기상 정보',
    fields: [
      { name: 'hour', label: 'Hour', type: 'number', min: 0, max: 23, step: 1 },
      { name: 'temperature', label: 'Temperature (°C)', type: 'number', step: 'any' },
      { name: 'humidity', label: 'Humidity (%)', type: 'number', min: 0, max: 100, step: 'any' },
      { name: 'wind_speed', label: 'Wind speed (m/s)', type: 'number', min: 0, step: 'any' },
      { name: 'visibility', label: 'Visibility (10m)', type: 'number', min: 0, step: 'any' },
      { name: 'dew_point', label: 'Dew point (°C)', type: 'number', step: 'any' },
      { name: 'solar_radiation', label: 'Solar radiation (MJ/m²)', type: 'number', min: 0, step: 'any' },
      { name: 'rainfall', label: 'Rainfall (mm)', type: 'number', min: 0, step: 'any' },
      { name: 'snowfall', label: 'Snowfall (cm)', type: 'number', min: 0, step: 'any' },
    ],
  },
  {
    title: '운영 정보',
    fields: [
      { name: 'season', label: 'Season', options: ['Spring', 'Summer', 'Autumn', 'Winter'] },
      { name: 'holiday', label: 'Holiday', options: ['No Holiday', 'Holiday'] },
      { name: 'functioning_day', label: 'Functioning day', options: ['Yes', 'No'] },
    ],
  },
]

function App() {
  // formData는 모든 입력값, prediction은 서버가 돌려준 예측값을 저장합니다.
  const [formData, setFormData] = useState(initialForm)
  const [prediction, setPrediction] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  // 사용자가 입력하거나 선택한 필드 하나만 새로운 값으로 바꿉니다.
  const handleInputChange = (event) => {
    const { name, value } = event.target
    setFormData((currentData) => ({ ...currentData, [name]: value }))
  }

  // Predict 버튼을 누르면 실행되는 함수입니다.
  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    setErrorMessage('')
    setPrediction(null)

    // FastAPI의 Pydantic 모델이 숫자를 정확히 받도록 숫자 필드만 Number로 변환합니다.
    const requestBody = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [
        key,
        numericFields.has(key) ? Number(value) : value,
      ]),
    )

    try {
      // axios.post(주소, 데이터)는 JSON POST 요청을 보내고 응답을 자동으로 파싱합니다.
      const response = await axios.post(API_URL, requestBody)

      // 현재 API 응답명과 실습 자료에서 사용할 수 있는 일반적인 응답명을 모두 지원합니다.
      const predictedValue =
        response.data.predicted_bike_count ??
        response.data.prediction ??
        response.data.bike_count

      if (predictedValue === undefined || predictedValue === null) {
        throw new Error('응답에 예측값이 없습니다.')
      }

      setPrediction(Number(predictedValue))
    } catch (error) {
      // FastAPI가 자세한 오류를 보냈다면 그 내용을 사용하고, 아니면 연결 안내를 표시합니다.
      const apiDetail = error.response?.data?.detail
      setErrorMessage(
        typeof apiDetail === 'string'
          ? apiDetail
          : '예측에 실패했습니다. FastAPI 서버가 실행 중인지 확인해주세요.',
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="app-shell">
      <section className="predict-card">
        <header className="app-header">
          <p className="eyebrow">React + FastAPI 기반</p>
          <h1>Seoul Bike Demand AI</h1>
          <p className="header-copy">시간과 날씨를 입력하여 서울시 공공자전거 대여 수요를 예측해보세요.</p>
        </header>

        <form className="input-form" onSubmit={handleSubmit}>
          {fieldGroups.map((group) => (
            <section className="field-group" key={group.title}>
              <h2>{group.title}</h2>
              <div className="input-grid">
                {group.fields.map((field) => (
                  <label className="field" key={field.name}>
                    <span className="field-label">{field.label}</span>

                    {field.options ? (
                      <select name={field.name} value={formData[field.name]} onChange={handleInputChange}>
                        {field.options.map((option) => (
                          <option value={option} key={option}>{option}</option>
                        ))}
                      </select>
                    ) : (
                      <input
                        type={field.type}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleInputChange}
                        min={field.min}
                        max={field.max}
                        step={field.step}
                        required
                      />
                    )}
                  </label>
                ))}
              </div>
            </section>
          ))}

          <button className="predict-button" type="submit" disabled={isLoading}>
            {isLoading ? 'Predicting...' : 'Predict'}
          </button>
        </form>

        {prediction !== null && (
          <section className="result-card" aria-live="polite">
            <p className="result-label">Prediction</p>
            <strong>{prediction.toLocaleString(undefined, { maximumFractionDigits: 1 })} bikes</strong>
          </section>
        )}

        {errorMessage && <p className="error-message" role="alert">{errorMessage}</p>}
      </section>
    </main>
  )
}

export default App
