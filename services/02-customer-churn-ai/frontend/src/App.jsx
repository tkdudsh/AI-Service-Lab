import { useState } from 'react'
import './App.css'

// 화면에 기본값으로 보여줄 입력 데이터입니다.
const initialForm = {
  Gender: 'Female',
  Age: '74',
  'Under 30': 'No',
  'Senior Citizen': 'Yes',
  Married: 'Yes',
  Dependents: 'Yes',
  'Number of Dependents': '1',
  Country: 'United States',
  State: 'California',
  City: 'Los Angeles',
  'Zip Code': '90063',
  Latitude: '34.044271',
  Longitude: '-118.185237',
  Population: '55668',
  Quarter: 'Q3',
  'Referred a Friend': 'Yes',
  'Number of Referrals': '1',
  'Tenure in Months': '8',
  Offer: 'Offer E',
  'Phone Service': 'Yes',
  'Avg Monthly Long Distance Charges': '48.85',
  'Multiple Lines': 'Yes',
  'Internet Service': 'Yes',
  'Internet Type': 'Fiber Optic',
  'Avg Monthly GB Download': '17',
  'Online Security': 'No',
  'Online Backup': 'Yes',
  'Device Protection Plan': 'No',
  'Premium Tech Support': 'No',
  'Streaming TV': 'No',
  'Streaming Movies': 'No',
  'Streaming Music': 'No',
  'Unlimited Data': 'Yes',
  Contract: 'Month-to-Month',
  'Paperless Billing': 'Yes',
  'Payment Method': 'Credit Card',
  'Monthly Charge': '80.65',
  'Total Charges': '633.3',
  'Total Refunds': '0.0',
  'Total Extra Data Charges': '0',
  'Total Long Distance Charges': '390.8',
  'Total Revenue': '1024.1',
  'Satisfaction Score': '3',
  CLTV: '5302',
}

// 핵심 입력값만 먼저 보여주고, 나머지는 필요할 때 확인할 수 있게 구성했습니다.
const fieldGroups = [
  {
    title: '기본 정보',
    fields: [
      { name: 'Gender', label: 'Gender' },
      { name: 'Age', label: 'Age', type: 'number' },
      { name: 'Under 30', label: 'Under 30' },
      { name: 'Senior Citizen', label: 'Senior Citizen' },
      { name: 'Married', label: 'Married' },
      { name: 'Dependents', label: 'Dependents' },
      { name: 'Number of Dependents', label: 'Number of Dependents', type: 'number' },
    ],
  },
  {
    title: '거주 정보',
    fields: [
      { name: 'Country', label: 'Country' },
      { name: 'State', label: 'State' },
      { name: 'City', label: 'City' },
      { name: 'Zip Code', label: 'Zip Code', type: 'number' },
      { name: 'Latitude', label: 'Latitude', type: 'number', step: 'any' },
      { name: 'Longitude', label: 'Longitude', type: 'number', step: 'any' },
      { name: 'Population', label: 'Population', type: 'number' },
      { name: 'Quarter', label: 'Quarter' },
    ],
  },
  {
    title: '서비스/계약 정보',
    fields: [
      { name: 'Referred a Friend', label: 'Referred a Friend' },
      { name: 'Number of Referrals', label: 'Number of Referrals', type: 'number' },
      { name: 'Tenure in Months', label: 'Tenure in Months', type: 'number' },
      { name: 'Offer', label: 'Offer' },
      { name: 'Phone Service', label: 'Phone Service' },
      { name: 'Internet Service', label: 'Internet Service' },
      { name: 'Internet Type', label: 'Internet Type' },
      { name: 'Contract', label: 'Contract' },
      { name: 'Paperless Billing', label: 'Paperless Billing' },
      { name: 'Payment Method', label: 'Payment Method' },
      { name: 'Monthly Charge', label: 'Monthly Charge', type: 'number', step: 'any' },
      { name: 'Total Charges', label: 'Total Charges', type: 'number', step: 'any' },
      { name: 'Satisfaction Score', label: 'Satisfaction Score', type: 'number' },
      { name: 'CLTV', label: 'CLTV', type: 'number' },
    ],
  },
]

function App() {
  const [formData, setFormData] = useState(initialForm)
  const [result, setResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  // 입력창 값이 바뀔 때 상태를 함께 바꿉니다.
  const handleInputChange = (event) => {
    const { name, value } = event.target

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }))
  }

  // 예측 버튼을 누르면 FastAPI 서버에 요청을 보냅니다.
  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)
    setErrorMessage('')
    setResult(null)

    // FastAPI가 요구하는 JSON 형태로 변환합니다.
    const requestBody = Object.fromEntries(
      Object.entries(formData).map(([key, value]) => [key, Number.isNaN(Number(value)) ? value : Number(value)]),
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
        throw new Error('예측 요청에 실패했습니다.')
      }

      const data = await response.json()
      setResult(data)
    } catch {
      setErrorMessage('FastAPI 서버에 연결할 수 없습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="app-shell">
      <section className="predict-card">
        <header className="app-header">
          <p className="eyebrow">React + FastAPI 기반</p>
          <h1>Customer Churn AI</h1>
          <p className="header-copy">고객 이탈 예측 서비스</p>
        </header>

        <form className="input-form" onSubmit={handleSubmit}>
          {fieldGroups.map((group) => (
            <section className="field-group" key={group.title}>
              <h2>{group.title}</h2>
              <div className="input-grid">
                {group.fields.map((field) => (
                  <label className="field" key={field.name}>
                    <span className="field-label">{field.label}</span>
                    <input
                      type={field.type || 'text'}
                      name={field.name}
                      value={formData[field.name]}
                      onChange={handleInputChange}
                      step={field.step || '1'}
                      required
                    />
                  </label>
                ))}
              </div>
            </section>
          ))}

          <button className="predict-button" type="submit" disabled={isLoading}>
            {isLoading ? '예측 중...' : '예측하기'}
          </button>
        </form>

        {result && (
          <section className="result-card" aria-live="polite">
            <p className="result-label">예측 결과</p>
            <strong>{result.result}</strong>
            <p className="result-detail">prediction: {result.prediction}</p>
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
