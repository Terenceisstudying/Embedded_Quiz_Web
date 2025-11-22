import React, { useState } from 'react';
import TopicSelection from './components/TopicSelection';
import QuizInterface from './components/QuizInterface';
import ResultScreen from './components/ResultScreen';
import AnimeMascot from './components/AnimeMascot';
import quizData from './data/quiz_data.json';

function App() {
  const [currentScreen, setCurrentScreen] = useState('topics'); // topics, quiz, results
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [userAnswers, setUserAnswers] = useState({}); // { questionId: [selectedOptionIndices] }
  const [rankingAnswers, setRankingAnswers] = useState({}); // { questionId: [orderedOptionIndices] }
  const [textAnswers, setTextAnswers] = useState({}); // { questionId: ["answer1", "answer2"] }
  const [matchingAnswers, setMatchingAnswers] = useState({}); // { questionId: { symbol: descriptionIndex } }
  const [score, setScore] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);
  const [mascotMood, setMascotMood] = useState('neutral');
  const [mascotMessage, setMascotMessage] = useState("Hi! Let's ace this!");

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic);
    setUserAnswers({});
    setRankingAnswers({});
    setTextAnswers({});
    setScore(0);
    setTimeTaken(0);
    setCurrentScreen('quiz');
    setMascotMood('thinking');
    setMascotMessage('Good luck! You can do it!');
  };

  const handleQuizSubmit = (answers, calculatedScore, elapsedTime, rankingAnswers = {}, textAnswers = {}, matchingAnswers = {}) => {
    setUserAnswers(answers);
    setRankingAnswers(rankingAnswers);
    setTextAnswers(textAnswers);
    setMatchingAnswers(matchingAnswers);
    setScore(calculatedScore);
    setTimeTaken(elapsedTime);
    setCurrentScreen('results');
    // Mascot mood updated in ResultScreen or here based on score
    const percentage = (calculatedScore / (selectedTopic.questions.length || 1)) * 100;
    if (percentage >= 80) {
      setMascotMood('excited');
      setMascotMessage('Wow! Perfect score!');
    } else if (percentage >= 50) {
      setMascotMood('happy');
      setMascotMessage('Great job! Keep it up!');
    } else {
      setMascotMood('sad');
      setMascotMessage('Don\'t worry, practice makes perfect!');
    }
  };

  const handleRestart = () => {
    setCurrentScreen('topics');
    setSelectedTopic(null);
    setUserAnswers({});
    setRankingAnswers({});
    setTextAnswers({});
    setScore(0);
    setMascotMood('neutral');
    setMascotMessage('Ready for another round?');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative">
      <div className="speed-lines"></div>
      <div className="w-full max-w-4xl relative z-10">
        <header className="mb-8 text-center relative">
          {/* Anime-style title with manga effect */}
          <div className="relative inline-block">
            <h1 className="text-6xl md:text-7xl font-bold mb-2 relative"
              style={{
                fontFamily: "'Bangers', cursive",
                textShadow: '4px 4px 0px #FF6B9D, 8px 8px 0px #FFD93D',
                color: '#FFFFFF',
                letterSpacing: '0.05em'
              }}>
              ⚡ EMBEDDED SYSTEMS QUIZ ⚡
            </h1>
            {/* Manga-style burst effect */}
            <div className="absolute -top-6 -right-6 text-6xl animate-bounce">💥</div>
            <div className="absolute -bottom-4 -left-4 text-4xl animate-pulse">✨</div>
          </div>
          <p className="text-xl mt-4 font-semibold"
            style={{ color: '#FFD93D', textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}>
            Level up your knowledge! 🚀
          </p>
        </header>

        <main className="rounded-2xl shadow-2xl p-6 border-4 backdrop-blur-sm relative overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(45, 50, 80, 0.95) 0%, rgba(37, 40, 59, 0.95) 100%)',
            borderImage: 'linear-gradient(45deg, #FF6B9D, #FFD93D, #6BCB77, #4D96FF) 1',
            boxShadow: '0 0 40px rgba(255, 107, 157, 0.3), 0 0 80px rgba(255, 217, 61, 0.2)'
          }}>
          {/* Decorative corner elements */}
          <div className="absolute top-0 left-0 w-20 h-20 border-l-4 border-t-4 border-primary rounded-tl-2xl"></div>
          <div className="absolute top-0 right-0 w-20 h-20 border-r-4 border-t-4 border-secondary rounded-tr-2xl"></div>
          <div className="absolute bottom-0 left-0 w-20 h-20 border-l-4 border-b-4 border-accent-1 rounded-bl-2xl"></div>
          <div className="absolute bottom-0 right-0 w-20 h-20 border-r-4 border-b-4 border-accent-2 rounded-br-2xl"></div>
          {currentScreen === 'topics' && (
            <TopicSelection topics={quizData} onSelect={handleTopicSelect} />
          )}
          {currentScreen === 'quiz' && selectedTopic && (
            <QuizInterface
              topic={selectedTopic}
              onSubmit={handleQuizSubmit}
              onBack={handleRestart}
              setMascotMood={setMascotMood}
              setMascotMessage={setMascotMessage}
            />
          )}
          {currentScreen === 'results' && selectedTopic && (
            <ResultScreen
              topic={selectedTopic}
              answers={userAnswers}
              rankingAnswers={rankingAnswers}
              textAnswers={textAnswers}
              matchingAnswers={matchingAnswers}
              score={score}
              timeTaken={timeTaken}
              onRestart={handleRestart}
            />
          )}
        </main>
      </div>
      <AnimeMascot mood={mascotMood} message={mascotMessage} />
    </div>
  );
}

export default App;
