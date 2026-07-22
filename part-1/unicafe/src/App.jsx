import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>

      {/* Feedback buttons */}
      <div>
        <Button handleClick={() => setGood(good + 1)} text="good" />
        <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
        <Button handleClick={() => setBad(bad + 1)} text="bad" />
      </div>

      {/* Feedback Statistics */}
      <h1>statistics</h1>
      {
        good + neutral + bad > 0 ? (
          <Statistics good={good} neutral={neutral} bad={bad} />
        ) : (
          <p>No feedback given</p>
        )
      }
    </div>
  )
}

const Button = (props) => {
  const { handleClick, text } = props

  return (
    <button onClick={handleClick}>{text}</button>
  )
}

const Statistics = (props) => {
  const { good, neutral, bad } = props

  return (
    <div>
      <StatisticsLine text="good" value={good} />
      <StatisticsLine text="neutral" value={neutral} />
      <StatisticsLine text="bad" value={bad} />

      {/* Feedback statistics summary */}
      <StatisticsLine text="all:" value={good + neutral + bad} />
      <StatisticsLine text="average:" value={(good - bad) / (good + neutral + bad)} />
      <StatisticsLine text="positive:" value={`${(good / (good + neutral + bad)) * 100} %`} />
    </div>
  )
}

const StatisticsLine = (props) => {
  const { text, value } = props

  return (
    <p>{text} {value}</p>
  )
}

export default App
