// Base Quiz Questions and Answers
const baseQuizData = [
    {
      question: "What is the capital of Kenya?",
      answers: ["Nairobi", "Mombasa", "Kisumu", "Nakuru"],
      correct: 0,
      category: "Geography",
    },
    {
      question: "Which programming language is used for web development?",
      answers: ["Python", "Java", "JavaScript", "C#"],
      correct: 2,
      category: "Programming",
    },
    {
      question: "What is the largest planet in our solar system?",
      answers: ["Earth", "Mars", "Jupiter", "Saturn"],
      correct: 2,
      category: "Science",
    },
    {
      question: "What is the square root of 64?",
      answers: ["6", "8", "10", "12"],
      correct: 1,
      category: "Math",
    },
  ]
  
  // Data for generating new questions
  const questionGenerators = {
    Geography: {
      capitals: [
        { country: "France", capital: "Paris" },
        { country: "Japan", capital: "Tokyo" },
        { country: "Brazil", capital: "Brasília" },
        { country: "Egypt", capital: "Cairo" },
        { country: "Australia", capital: "Canberra" },
        { country: "Canada", capital: "Ottawa" },
        { country: "Germany", capital: "Berlin" },
        { country: "India", capital: "New Delhi" },
        { country: "Mexico", capital: "Mexico City" },
        { country: "South Africa", capital: "Pretoria" },
        { country: "Italy", capital: "Rome" },
        { country: "China", capital: "Beijing" },
        { country: "Argentina", capital: "Buenos Aires" },
        { country: "Russia", capital: "Moscow" },
        { country: "Spain", capital: "Madrid" },
      ],
      largestCities: [
        { country: "USA", city: "New York City" },
        { country: "UK", city: "London" },
        { country: "China", city: "Shanghai" },
        { country: "India", city: "Mumbai" },
        { country: "Brazil", city: "São Paulo" },
        { country: "Japan", city: "Tokyo" },
        { country: "Mexico", city: "Mexico City" },
        { country: "Egypt", city: "Cairo" },
        { country: "Russia", city: "Moscow" },
        { country: "Indonesia", city: "Jakarta" },
      ],
      landmarks: [
        { landmark: "Eiffel Tower", country: "France" },
        { landmark: "Great Wall", country: "China" },
        { landmark: "Taj Mahal", country: "India" },
        { landmark: "Statue of Liberty", country: "USA" },
        { landmark: "Colosseum", country: "Italy" },
        { landmark: "Machu Picchu", country: "Peru" },
        { landmark: "Pyramids of Giza", country: "Egypt" },
        { landmark: "Christ the Redeemer", country: "Brazil" },
        { landmark: "Sydney Opera House", country: "Australia" },
        { landmark: "Angkor Wat", country: "Cambodia" },
      ],
    },
    Math: {
      operations: ["+", "-", "*", "/"],
      ranges: [
        { min: 1, max: 10 },
        { min: 10, max: 50 },
        { min: 50, max: 100 },
        { min: 100, max: 500 },
      ],
    },
    Programming: {
      concepts: [
        {
          question: "Which data structure uses LIFO (Last In, First Out)?",
          answers: ["Queue", "Stack", "Array", "Linked List"],
          correct: 1,
        },
        {
          question: "What does HTML stand for?",
          answers: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Hyper Transfer Markup Language",
            "Home Tool Markup Language",
          ],
          correct: 0,
        },
        {
          question: "Which of these is NOT a JavaScript framework?",
          answers: ["React", "Angular", "Django", "Vue"],
          correct: 2,
        },
        {
          question: "What symbol is used for single-line comments in JavaScript?",
          answers: ["//", "/*", "#", "<!--"],
          correct: 0,
        },
        {
          question: "Which programming paradigm treats computation as the evaluation of mathematical functions?",
          answers: ["Object-Oriented", "Procedural", "Functional", "Imperative"],
          correct: 2,
        },
        {
          question: "What does CSS stand for?",
          answers: ["Cascading Style Sheets", "Computer Style Sheets", "Creative Style System", "Colorful Style Sheets"],
          correct: 0,
        },
        {
          question: "Which of these is a NoSQL database?",
          answers: ["MySQL", "PostgreSQL", "MongoDB", "Oracle"],
          correct: 2,
        },
        {
          question: "What is the correct way to declare a variable in JavaScript?",
          answers: ["var x = 5;", "variable x = 5;", "x := 5;", "int x = 5;"],
          correct: 0,
        },
      ],
    },
    Science: {
      facts: [
        {
          question: "What is the chemical symbol for gold?",
          answers: ["Go", "Au", "Ag", "Gd"],
          correct: 1,
        },
        {
          question: "Which planet is known as the 'Morning Star'?",
          answers: ["Mars", "Jupiter", "Venus", "Mercury"],
          correct: 2,
        },
        {
          question: "What is the hardest natural substance on Earth?",
          answers: ["Platinum", "Titanium", "Quartz", "Diamond"],
          correct: 3,
        },
        {
          question: "Which of these is NOT a type of blood cell?",
          answers: ["Red blood cell", "White blood cell", "Platelet", "Neuron"],
          correct: 3,
        },
        {
          question: "What is the largest organ in the human body?",
          answers: ["Heart", "Liver", "Skin", "Brain"],
          correct: 2,
        },
        {
          question: "Which gas do plants absorb from the atmosphere?",
          answers: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
          correct: 1,
        },
        {
          question: "What is the speed of light approximately?",
          answers: ["300,000 km/s", "150,000 km/s", "500,000 km/s", "1,000,000 km/s"],
          correct: 0,
        },
        {
          question: "Which element has the atomic number 1?",
          answers: ["Helium", "Hydrogen", "Carbon", "Oxygen"],
          correct: 1,
        },
      ],
    },
  }
  
  // Quiz state variables
  let quizData = [...baseQuizData]
  let availableQuestions = []
  let answeredQuestions = 0
  let currentQuiz = null
  let score = 0
  let timeLeft = 60 // 60 seconds for the quiz
  let timerInterval
  let canProceed = false
  let currentRound = 1
  let questionsPerRound = 4 // Same as base quiz length
  
  // DOM elements
  const quizContainer = document.getElementById("quiz-container")
  const questionElement = document.getElementById("question")
  const answersElement = document.getElementById("answers")
  const nextButton = document.getElementById("next")
  const resultElement = document.getElementById("result")
  const resultMessage = document.getElementById("result-message")
  const scoreElement = document.getElementById("score")
  const timerElement = document.getElementById("timer")
  const progressBar = document.getElementById("progress-bar")
  const categoryBadge = document.getElementById("category-badge")
  const feedbackElement = document.getElementById("feedback")
  const restartButton = document.getElementById("restart")
  const roundNumberElement = document.getElementById("round-number")
  
  // Add these lines after the DOM elements section
  const startScreen = document.getElementById("start-screen")
  const startButton = document.getElementById("start-button")
  
  // Add this event listener for the start button
  startButton.addEventListener("click", () => {
    console.log("Start button clicked!")
    startScreen.style.display = "none"
    quizContainer.style.display = "block"
    initQuiz(false)
  })
  
  // Update round display
  function updateRoundDisplay(round, animate = false) {
    roundNumberElement.textContent = round
  
    if (animate) {
      // Add animation class
      roundNumberElement.classList.add("round-change")
  
      // Remove animation class after animation completes
      setTimeout(() => {
        roundNumberElement.classList.remove("round-change")
      }, 500)
    }
  }
  
  // Start the timer
  function startTimer() {
    // Clear any existing timer
    if (timerInterval) {
      clearInterval(timerInterval)
    }
  
    // Set time based on round (more time for later rounds with more questions)
    timeLeft = 60 + (currentRound - 1) * 15
  
    timerElement.textContent = `Time Left: ${timeLeft}s`
    timerElement.classList.remove("warning")
  
    timerInterval = setInterval(() => {
      timeLeft--
      timerElement.textContent = `Time Left: ${timeLeft}s`
  
      // Add warning class when time is running low
      if (timeLeft <= 10) {
        timerElement.classList.add("warning")
      }
  
      if (timeLeft <= 0) {
        clearInterval(timerInterval)
        showResults()
      }
    }, 1000)
  }
  
  // Get a random question from available questions
  function getRandomQuestion() {
    if (availableQuestions.length === 0) {
      return null
    }
  
    const randomIndex = Math.floor(Math.random() * availableQuestions.length)
    const question = availableQuestions[randomIndex]
    availableQuestions.splice(randomIndex, 1)
    return question
  }
  
  // Display the current question
  function displayQuestion() {
    // Reset state for new question
    canProceed = false
    feedbackElement.textContent = ""
    nextButton.disabled = true
  
    // Get and display new question
    currentQuiz = getRandomQuestion()
  
    if (!currentQuiz) {
      showResults()
      return
    }
  
    // Update question text and category
    questionElement.innerText = currentQuiz.question
    categoryBadge.innerText = currentQuiz.category
    categoryBadge.className = "category-badge category-" + currentQuiz.category.toLowerCase()
  
    // Update progress bar
    const progressPercentage = (answeredQuestions / quizData.length) * 100
    progressBar.style.width = `${progressPercentage}%`
    progressBar.className = "progress-bar progress-" + currentQuiz.category.toLowerCase()
  
    // Clear previous answers
    answersElement.innerHTML = ""
  
    // Create new answer options
    currentQuiz.answers.forEach((answer, index) => {
      const answerDiv = document.createElement("div")
      answerDiv.classList.add("answer")
      const uniqueId = `answer-${index}`
  
      answerDiv.innerHTML = `
              <input type="radio" name="answer" id="${uniqueId}" value="${index}">
              <label for="${uniqueId}">${answer}</label>
          `
  
      // Add click event to the answer div
      answerDiv.addEventListener("click", () => selectAnswer(answerDiv, index))
  
      answersElement.appendChild(answerDiv)
    })
  }
  
  // Handle answer selection
  function selectAnswer(answerDiv, selectedIndex) {
    // If already answered, don't allow changing
    if (canProceed) return
  
    // Remove selected class from all answers
    document.querySelectorAll(".answer").forEach((div) => {
      div.classList.remove("selected", "correct", "incorrect")
    })
  
    // Mark this answer as selected
    answerDiv.classList.add("selected")
  
    // Check if answer is correct
    const isCorrect = selectedIndex === currentQuiz.correct
  
    // Show feedback
    if (isCorrect) {
      answerDiv.classList.add("correct")
      feedbackElement.textContent = "Correct!"
      feedbackElement.style.color = "#10b981"
      score++
    } else {
      answerDiv.classList.add("incorrect")
      feedbackElement.textContent = "Incorrect!"
      feedbackElement.style.color = "#ef4444"
  
      // Show the correct answer
      const correctAnswerDiv = document.querySelectorAll(".answer")[currentQuiz.correct]
      correctAnswerDiv.classList.add("correct")
    }
  
    // Enable next button
    nextButton.disabled = false
    canProceed = true
    answeredQuestions++
  }
  
  // Move to next question
  function nextQuestion() {
    if (!canProceed) {
      alert("Please select an answer!")
      return
    }
  
    // If all questions answered, show results
    if (availableQuestions.length === 0) {
      showResults()
    } else {
      displayQuestion()
    }
  }
  
  // Generate a new set of questions
  function generateNewQuestions() {
    const newQuestions = []
  
    // Generate Geography questions
    for (let i = 0; i < currentRound; i++) {
      // Capitals questions
      const capitalData = questionGenerators.Geography.capitals
      const randomCapital = capitalData[Math.floor(Math.random() * capitalData.length)]
  
      // Create wrong answers (other capitals)
      const wrongCapitals = capitalData
        .filter((item) => item.capital !== randomCapital.capital)
        .map((item) => item.capital)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
  
      // Create answers array with correct answer at random position
      const correctPosition = Math.floor(Math.random() * 4)
      const answers = [...wrongCapitals]
      answers.splice(correctPosition, 0, randomCapital.capital)
  
      newQuestions.push({
        question: `What is the capital of ${randomCapital.country}?`,
        answers: answers,
        correct: correctPosition,
        category: "Geography",
      })
  
      // Landmarks question
      if (i % 2 === 0 && i < questionGenerators.Geography.landmarks.length) {
        const landmarkData = questionGenerators.Geography.landmarks
        const randomLandmark = landmarkData[i % landmarkData.length]
  
        // Create wrong answers (other countries)
        const wrongCountries = landmarkData
          .filter((item) => item.country !== randomLandmark.country)
          .map((item) => item.country)
          .sort(() => 0.5 - Math.random())
          .slice(0, 3)
  
        // Create answers array with correct answer at random position
        const correctLandmarkPos = Math.floor(Math.random() * 4)
        const landmarkAnswers = [...wrongCountries]
        landmarkAnswers.splice(correctLandmarkPos, 0, randomLandmark.country)
  
        newQuestions.push({
          question: `In which country is the ${randomLandmark.landmark} located?`,
          answers: landmarkAnswers,
          correct: correctLandmarkPos,
          category: "Geography",
        })
      }
    }
  
    // Generate Math questions
    for (let i = 0; i < currentRound; i++) {
      // Use more difficult ranges for higher rounds
      const rangeIndex = Math.min(i, questionGenerators.Math.ranges.length - 1)
      const range = questionGenerators.Math.ranges[rangeIndex]
  
      // Generate two random numbers
      const num1 = Math.floor(Math.random() * (range.max - range.min)) + range.min
      const num2 = Math.floor(Math.random() * (range.max - range.min)) + range.min
  
      // Choose a random operation
      const operation =
        questionGenerators.Math.operations[Math.floor(Math.random() * questionGenerators.Math.operations.length)]
  
      // Calculate correct answer
      let correctAnswer
      let questionText
  
      switch (operation) {
        case "+":
          correctAnswer = num1 + num2
          questionText = `What is ${num1} + ${num2}?`
          break
        case "-":
          // Ensure positive result
          if (num1 < num2) {
            correctAnswer = num2 - num1
            questionText = `What is ${num2} - ${num1}?`
          } else {
            correctAnswer = num1 - num2
            questionText = `What is ${num1} - ${num2}?`
          }
          break
        case "*":
          // Use smaller numbers for multiplication
          const factor1 = Math.floor(num1 / 5)
          const factor2 = Math.floor(num2 / 5)
          correctAnswer = factor1 * factor2
          questionText = `What is ${factor1} × ${factor2}?`
          break
        case "/":
          // Ensure clean division
          const divisor = Math.max(2, Math.floor(Math.random() * 10))
          const dividend = divisor * Math.floor(Math.random() * 10 + 1)
          correctAnswer = dividend / divisor
          questionText = `What is ${dividend} ÷ ${divisor}?`
          break
      }
  
      // Generate wrong answers (close to correct answer)
      const wrongAnswers = []
      while (wrongAnswers.length < 3) {
        // Generate an answer that's off by a small amount
        const offset = Math.floor(Math.random() * 10) - 5
        const wrongAnswer = correctAnswer + offset
  
        // Ensure it's not the correct answer and not already in wrong answers
        if (wrongAnswer !== correctAnswer && !wrongAnswers.includes(wrongAnswer) && wrongAnswer >= 0) {
          wrongAnswers.push(wrongAnswer)
        }
      }
  
      // Create answers array with correct answer at random position
      const correctMathPos = Math.floor(Math.random() * 4)
      const mathAnswers = [...wrongAnswers]
      mathAnswers.splice(correctMathPos, 0, correctAnswer)
  
      newQuestions.push({
        question: questionText,
        answers: mathAnswers.map(String),
        correct: correctMathPos,
        category: "Math",
      })
    }
  
    // Add Programming questions
    const programmingQuestions = questionGenerators.Programming.concepts
    for (let i = 0; i < Math.min(currentRound, programmingQuestions.length); i++) {
      // Get a random programming question that hasn't been used yet
      const randomIndex = Math.floor(Math.random() * programmingQuestions.length)
      const programmingQ = programmingQuestions[randomIndex]
  
      // Add to new questions
      newQuestions.push({
        question: programmingQ.question,
        answers: programmingQ.answers,
        correct: programmingQ.correct,
        category: "Programming",
      })
  
      // Remove this question so it's not used again
      programmingQuestions.splice(randomIndex, 1)
    }
  
    // Add Science questions
    const scienceQuestions = questionGenerators.Science.facts
    for (let i = 0; i < Math.min(currentRound, scienceQuestions.length); i++) {
      // Get a random science question that hasn't been used yet
      const randomIndex = Math.floor(Math.random() * scienceQuestions.length)
      const scienceQ = scienceQuestions[randomIndex]
  
      // Add to new questions
      newQuestions.push({
        question: scienceQ.question,
        answers: scienceQ.answers,
        correct: scienceQ.correct,
        category: "Science",
      })
  
      // Remove this question so it's not used again
      scienceQuestions.splice(randomIndex, 1)
    }
  
    // Shuffle the questions
    return newQuestions.sort(() => 0.5 - Math.random())
  }
  
  // Show quiz results
  function showResults() {
    clearInterval(timerInterval)
    quizContainer.style.display = "none"
    resultElement.style.display = "block" // Make sure this is set to "block"
  
    const percentage = (score / quizData.length) * 100
    console.log(`Score: ${score}/${quizData.length}, Percentage: ${percentage}%`)
  
    // Check if user passed with good score (70% or higher)
    const passedWithGoodScore = percentage >= 70
    console.log(`Passed with good score: ${passedWithGoodScore}`)
  
    // Set result message based on score and round
    if (percentage === 100) {
      resultMessage.innerText = `Perfect Score! 🎉 (Round ${currentRound})`
    } else if (percentage >= 70) {
      resultMessage.innerText = `Great Job! 👍 (Round ${currentRound})`
    } else if (percentage >= 40) {
      resultMessage.innerText = `Good Effort! 👌 (Round ${currentRound})`
    } else {
      resultMessage.innerText = `Keep Practicing! 💪 (Round ${currentRound})`
    }
  
    scoreElement.innerText = `${score}/${quizData.length} (${percentage.toFixed(0)}%)`
  
    // FIXED: More explicit button handling for next round
    if (passedWithGoodScore) {
      // Clear and explicitly set the button text and class
      restartButton.className = "btn restart-btn next-round"
      restartButton.innerText = "Start Next Round"
      restartButton.setAttribute("data-next-round", "true")
      console.log("Button set to 'Start Next Round' with next-round class")
    } else {
      // Clear and explicitly set the button text and class
      restartButton.className = "btn restart-btn"
      restartButton.innerText = "Try Again"
      restartButton.removeAttribute("data-next-round")
      console.log("Button set to 'Try Again' without next-round class")
    }
  
    // Make sure the button is visible and clickable
    restartButton.style.display = "block"
    restartButton.disabled = false
  }
  
  // Modify the initQuiz function to not automatically start when the page loads
  function initQuiz(nextRound = false) {
    console.log(`Initializing quiz. Next round: ${nextRound}, Current round: ${currentRound}`)
  
    // If passed with good score and clicked "Start Next Round"
    if (nextRound) {
      currentRound++
      console.log(`Advanced to round ${currentRound}`)
  
      // Update round display with animation
      updateRoundDisplay(currentRound, true)
  
      // Generate new questions for the next round
      quizData = generateNewQuestions()
      questionsPerRound = quizData.length
      console.log(`Generated ${quizData.length} new questions`)
    } else {
      // Reset to first round
      currentRound = 1
  
      // Update round display
      updateRoundDisplay(currentRound)
  
      quizData = [...baseQuizData]
      questionsPerRound = quizData.length
      console.log(`Reset to round 1 with ${quizData.length} base questions`)
    }
  
    // Update round indicator in the UI
    document.title = `Quiz Round ${currentRound}`
  
    // Reset quiz state
    score = 0
    answeredQuestions = 0
    canProceed = false
  
    // Reset UI
    timerElement.classList.remove("warning")
    quizContainer.style.display = "block"
    resultElement.style.display = "none"
    nextButton.disabled = true
  
    // Make sure the restart button is reset
    restartButton.innerText = "Try Again"
    restartButton.classList.remove("next-round")
  
    // Reset questions
    availableQuestions = [...quizData]
  
    // Start quiz
    displayQuestion()
    startTimer()
  }
  
  // Event Listeners
  nextButton.addEventListener("click", nextQuestion)
  
  // Replace the restart button event listener with this improved version
  // Find the existing event listener and replace it with this:
  restartButton.addEventListener("click", function () {
    console.log("Restart button clicked!")
    console.log("Button text:", this.innerText)
    console.log("Button classes:", this.className)
    console.log("Next round attribute:", this.getAttribute("data-next-round"))
  
    // Use the data attribute for more reliable detection
    const isNextRound = this.getAttribute("data-next-round") === "true"
    console.log(`Is next round button: ${isNextRound}`)
  
    if (isNextRound) {
      console.log("Starting next round")
      initQuiz(true) // Pass true to indicate next round
    } else {
      console.log("Restarting same round")
      initQuiz(false) // Pass false to restart same round
    }
  })
  
  // Remove or comment out the automatic initQuiz() call at the end of the file
  // and replace it with this:
  // Don't automatically start the quiz, wait for the start button click
  // initQuiz()
  