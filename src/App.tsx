import { useState } from 'react';

type Choice = {
  text: string;
  correct: boolean;
};

type Question = {
  category: string;
  icon: string;
  question: string;
  choices: Choice[];
  explanation: string;
};

const questions: Question[] = [
  {
    category: 'Road Safety',
    icon: '🚦',
    question: 'You want to cross the road. What should you do?',
    choices: [
      { text: 'Run across quickly', correct: false },
      { text: 'Stop, look both ways, and use a safe crossing', correct: true },
      { text: 'Cross between parked cars', correct: false },
      { text: 'Look at your phone while crossing', correct: false }
    ],
    explanation: 'Stop, look carefully, listen for cars, and cross with a trusted adult when possible.'
  },
  {
    category: 'Fire Safety',
    icon: '🔥',
    question: 'What should you do if you see a fire?',
    choices: [
      { text: 'Hide under the bed', correct: false },
      { text: 'Tell an adult, leave safely, and call for help', correct: true },
      { text: 'Try to play with the fire', correct: false },
      { text: 'Go back to collect your toys', correct: false }
    ],
    explanation: 'Get away from the fire, tell a trusted adult, and never go back inside.'
  },
  {
    category: 'Water Safety',
    icon: '🌊',
    question: 'Which choice is safest near a swimming pool?',
    choices: [
      { text: 'Run around the pool', correct: false },
      { text: 'Swim only when a trusted adult is watching', correct: true },
      { text: 'Push your friends into the water', correct: false },
      { text: 'Jump in without checking the water', correct: false }
    ],
    explanation: 'Always follow pool rules and swim with a trusted adult watching.'
  },
  {
    category: 'Online Safety',
    icon: '💻',
    question: 'What should you do before sharing personal information online?',
    choices: [
      { text: 'Share it with everyone', correct: false },
      { text: 'Ask a trusted adult first', correct: true },
      { text: 'Post your home address', correct: false },
      { text: 'Accept every friend request', correct: false }
    ],
    explanation: 'Keep private information private and ask a trusted adult for help online.'
  },
  {
    category: 'Stranger Safety',
    icon: '🛡️',
    question: 'A stranger asks you to go somewhere with them. What should you do?',
    choices: [
      { text: 'Go with them', correct: false },
      { text: 'Say no, move away, and tell a trusted adult', correct: true },
      { text: 'Keep it a secret', correct: false },
      { text: 'Take a gift from them', correct: false }
    ],
    explanation: 'Say no, move to a safe place, and tell a trusted adult immediately.'
  },
  {
    category: 'Home Safety',
    icon: '🏠',
    question: 'You find a sharp object on the floor. What should you do?',
    choices: [
      { text: 'Pick it up quickly', correct: false },
      { text: 'Tell an adult and stay away from it', correct: true },
      { text: 'Throw it at a wall', correct: false },
      { text: 'Put it in your pocket', correct: false }
    ],
    explanation: 'Sharp objects can hurt you. Tell an adult and do not touch them.'
  }
];

function App() {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [score, setScore] = useState(0);

  const question = questions[questionIndex];
  const answered = selectedIndex !== null;
  const isLastQuestion = questionIndex === questions.length - 1;
  const progress = ((questionIndex + (answered ? 1 : 0)) / questions.length) * 100;

  const selectAnswer = (index: number) => {
    if (answered) return;
    setSelectedIndex(index);
    if (question.choices[index].correct) setScore((value) => value + 1);
  };

  const nextQuestion = () => {
    if (isLastQuestion) {
      setQuestionIndex(0);
      setSelectedIndex(null);
      setScore(0);
      return;
    }
    setQuestionIndex((value) => value + 1);
    setSelectedIndex(null);
  };

  return (
    <main className="page-shell">
      <div className="game-card">
        <header className="topbar">
          <div>
            <p className="eyebrow">Safety Adventure</p>
            <h1>Safety Star Game</h1>
          </div>
          <div className="score-box" aria-label={`Score: ${score}`}>
            <span>⭐</span>
            <strong>{score}</strong>
          </div>
        </header>

        <div className="progress-wrap" aria-label="Game progress">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <p>Question {questionIndex + 1} of {questions.length}</p>
        </div>

        <section className="question-panel">
          <div className="category-badge">
            <span>{question.icon}</span>
            {question.category}
          </div>
          <h2>{question.question}</h2>

          <div className="options-list">
            {question.choices.map((choice, index) => {
              const isSelected = selectedIndex === index;
              const className = [
                'option-button',
                answered && choice.correct ? 'correct' : '',
                answered && isSelected && !choice.correct ? 'wrong' : ''
              ].filter(Boolean).join(' ');

              return (
                <button
                  className={className}
                  key={choice.text}
                  type="button"
                  disabled={answered}
                  onClick={() => selectAnswer(index)}
                >
                  {choice.text}
                </button>
              );
            })}
          </div>

          {answered && (
            <div className="feedback-box" role="status">
              <p className={question.choices[selectedIndex].correct ? 'good' : 'bad'}>
                {question.choices[selectedIndex].correct
                  ? 'Great job! That is a safe choice.'
                  : 'Nice try! The safe choice is highlighted in green.'}
              </p>
              <p>{question.explanation}</p>
            </div>
          )}

          {answered && (
            <div className="action-row">
              <button className="next-button" type="button" onClick={nextQuestion}>
                {isLastQuestion ? 'Play Again' : 'Next Question'}
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default App;
