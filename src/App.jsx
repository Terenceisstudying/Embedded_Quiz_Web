import React, { useState } from 'react';
import TopicSelection from './components/TopicSelection';
import QuizInterface from './components/QuizInterface';
import ResultScreen from './components/ResultScreen';
import AnimeMascot2D from './components/AnimeMascot2D';
import AnimeMascot3D from './components/AnimeMascot3D';
import ConfirmationDialog from './components/ConfirmationDialog';
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
  const [mascotVersion, setMascotVersion] = useState('2d'); // '2d', '3d', or 'both'
  const [showExitConfirm, setShowExitConfirm] = useState(false);

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
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 relative" role="main">
      <div className="speed-lines" aria-hidden="true"></div>
      <div className="w-full max-w-4xl relative z-10">
        <header className="mb-6 sm:mb-8 text-center relative">
          <nav className="mb-4 text-sm text-slate-400" aria-label="Breadcrumb">
            <ol className="flex items-center justify-center gap-2">
              <li className={currentScreen === 'topics' ? 'text-white font-semibold' : ''}>
                Topics
              </li>
              {currentScreen !== 'topics' && (
                <>
                  <li aria-hidden="true">→</li>
                  <li className={currentScreen === 'quiz' ? 'text-white font-semibold' : ''}>
                    Quiz
                  </li>
                </>
              )}
              {currentScreen === 'results' && (
                <>
                  <li aria-hidden="true">→</li>
                  <li className="text-white font-semibold">Results</li>
                </>
              )}
            </ol>
          </nav>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-3 sm:mb-4 relative text-white"
            style={{
              fontFamily: "'Bangers', cursive",
              textShadow: '2px 2px 0px #FF6B9D, 4px 4px 0px #FFD93D',
              letterSpacing: '0.02em',
              lineHeight: '1.2'
            }}>
            Embedded Systems Quiz
          </h1>
          <p className="text-base sm:text-lg md:text-xl mt-2 sm:mt-3 font-medium text-slate-300">
            Test your knowledge and improve your skills
          </p>
        </header>

        <main className="rounded-xl sm:rounded-2xl shadow-2xl p-4 sm:p-6 md:p-8 border-2 sm:border-4 backdrop-blur-sm relative overflow-hidden bg-slate-800/95 border-slate-600"
          style={{
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)'
          }}
          aria-label="Quiz content">
          {currentScreen === 'topics' && (
            <TopicSelection topics={quizData} onSelect={handleTopicSelect} />
          )}
          {currentScreen === 'quiz' && selectedTopic && (
            <QuizInterface
              topic={selectedTopic}
              onSubmit={handleQuizSubmit}
              onBack={() => setShowExitConfirm(true)}
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

      {/* Mascot Version Toggle - Accessible and mobile-friendly */}
      <div className="fixed top-4 right-4 z-50 flex flex-col sm:flex-row gap-2" role="group" aria-label="Mascot display options">
        <button
          onClick={() => setMascotVersion('2d')}
          aria-pressed={mascotVersion === '2d'}
          aria-label="Show 2D mascot"
          className={`min-w-[44px] min-h-[44px] px-4 py-2 rounded-lg text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${mascotVersion === '2d'
              ? 'bg-red-500 text-white shadow-lg'
              : 'bg-white/90 text-slate-700 hover:bg-white'
            }`}
        >
          2D
        </button>
        <button
          onClick={() => setMascotVersion('3d')}
          aria-pressed={mascotVersion === '3d'}
          aria-label="Show 3D mascot"
          className={`min-w-[44px] min-h-[44px] px-4 py-2 rounded-lg text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${mascotVersion === '3d'
              ? 'bg-red-500 text-white shadow-lg'
              : 'bg-white/90 text-slate-700 hover:bg-white'
            }`}
        >
          3D
        </button>
        <button
          onClick={() => setMascotVersion('both')}
          aria-pressed={mascotVersion === 'both'}
          aria-label="Show both mascots"
          className={`min-w-[44px] min-h-[44px] px-4 py-2 rounded-lg text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${mascotVersion === 'both'
              ? 'bg-red-500 text-white shadow-lg'
              : 'bg-white/90 text-slate-700 hover:bg-white'
            }`}
        >
          Both
        </button>
        <button
          onClick={() => setMascotVersion('none')}
          aria-pressed={mascotVersion === 'none'}
          aria-label="Hide mascot"
          className={`min-w-[44px] min-h-[44px] px-4 py-2 rounded-lg text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary ${mascotVersion === 'none'
              ? 'bg-red-500 text-white shadow-lg'
              : 'bg-white/90 text-slate-700 hover:bg-white'
            }`}
        >
          Hide
        </button>
      </div>

      {/* Mascots */}
      {(mascotVersion === '2d' || mascotVersion === 'both') && (
        <AnimeMascot2D
          mood={mascotMood}
          message={mascotVersion === 'both' ? null : mascotMessage}
          position={mascotVersion === 'both' ? 'right' : 'right'}
        />
      )}
      {(mascotVersion === '3d' || mascotVersion === 'both') && (
        <AnimeMascot3D
          mood={mascotMood}
          message={mascotVersion === 'both' ? null : mascotMessage}
          position={mascotVersion === 'both' ? 'left' : 'right'}
        />
      )}

      {/* Exit Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={showExitConfirm}
        onConfirm={() => {
          setShowExitConfirm(false);
          handleRestart();
        }}
        onCancel={() => setShowExitConfirm(false)}
        title="Exit Quiz?"
        message="Are you sure you want to exit? Your progress will be lost."
        confirmText="Exit"
        cancelText="Continue Quiz"
        type="warning"
      />
    </div>
  );
}

export default App;
