import { useState } from 'react'
import './App.css'

const initialForm = {
  MedInc: '8.3252',
  HouseAge: '41',
  AveRooms: '6.9841',
  AveBedrms: '1.0238',
  Population: '322',
  AveOccup: '2.5556',
  Latitude: '37.88',
  Longitude: '-122.23',
}

const inputFields = [
  { name: 'MedInc', label: 'MedInc', helper: 'Median income' },
  { name: 'HouseAge', label: 'HouseAge', helper: 'House age' },
  { name: 'AveRooms', label: 'AveRooms', helper: 'Average rooms' },
  { name: 'AveBedrms', label: 'AveBedrms', helper: 'Average bedrooms' },
  { name: 'Population', label: 'Population', helper: 'Population' },
  { name: 'AveOccup', label: 'AveOccup', helper: 'Average occupancy' },
  { name: 'Latitude', label: 'Latitude', helper: 'Latitude' },
  { name: 'Longitude', label: 'Longitude', helper: 'Longitude' },
]

function App() {
  const [formData, setFormData] = useState(initialForm)
  const [predictedPrice, setPredictedPrice] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleInputChange = (event) => {
    const { name, value } = event.target

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    setErrorMessage('')
    setPredictedPrice(null)

    // The FastAPI server expects every field as a number.
    const requestBody = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [key, Number(value)]),
    )

    try {
      const response = await fetch('/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })

      if (!response.ok) {
        throw new Error('FastAPI server returned an error.')
      }

      const data = await response.json()
      setPredictedPrice(data.predicted_price)
    } catch {
      setErrorMessage(
        'FastAPI 서버에 연결할 수 없습니다. ai-server가 실행 중인지 확인해 주세요.',
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
          <h1>House Price AI</h1>
          <p className="header-copy">부동산 가격 예측 서비스</p>
        </header>

        <form className="input-form" onSubmit={handleSubmit}>
          <div className="input-grid">
            {inputFields.map((field) => (
              <label className="field" key={field.name}>
                <span className="field-label">{field.label}</span>
                <input
                  type="number"
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleInputChange}
                  step="any"
                  required
                />
                <span className="field-helper">{field.helper}</span>
              </label>
            ))}
          </div>

          <button className="predict-button" type="submit" disabled={isLoading}>
            {isLoading ? '예측 중...' : '예측하기'}
          </button>
        </form>

        {predictedPrice !== null && (
          <section className="result-card" aria-live="polite">
            <p className="result-label">예측 집값</p>
            <strong>{predictedPrice}</strong>
          </section>
        )}

        {errorMessage && (
          <p className="error-message" role="alert">
            {errorMessage}
          </p>
        )}
      </section>
    </main>
  )
}

export default App
