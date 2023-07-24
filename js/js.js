const questions = [
  {
      question: "When was founded Case Western Reserve University?",
      answers: ["1826", "1848", "1879","1903"],
      correct: 1,
  }, 
  {
      question: "CWRU is a member of which athletic conference?",
      answers: ["Big Ten Conference", "Atlantic Coast Conference", "University Athletic Association","Ivy League"],
      correct: 3,
  },
  {
      question: "What is the name of the stadium on the CWRU campus for the football team's games?",
      answers: ["DiSanto Field", "Don Shula Stadium", "Tomlinson Fieldhouse","Veale Athletic Center"],
      correct: 1,
  },
  {
      question: "Which of the following colleges is not part of Case Western Reserve University?",
      answers: [  "College of Arts and Sciences", 
                  "Weatherhead School of Business", 
                  "School of Medicine",
                  "School of Medicine",
                  "Case School of Engineering"],
      correct: 2,
  },
  {
      question: "Which building is a symbol of Case Western Reserve University?",
      answers: ["Old Dorm Block", "Maltz Performing Arts Center", "Tinkham Veale University Center","Adelbert Hall"],
      correct: 4,
  },
  {
      question: "What is the name of the governing body of Case Western Reserve University?",
      answers: ["Senate", "Student Government Association", "Faculty Council","Board of Trustees"],
      correct: 4,
  },
  {
      question: "How many colleges are included in Case Western Reserve University?",
      answers: ["2", "5", "8","10"],
      correct: 3,
  },
  {
      question: "What is the name of the school that offers lifelong learning programs at CWRU?",
      answers: ["Weatherhead School of Management", "Siegal Lifelong Learning Program", "Frances Payne Bolton School of Nursing","Jack, Joseph, and Morton Mandel School of Applied Social Sciences"],
      correct: 2,
  },
  
  
  
];

let score = 0;
let questionIndex = 0;

const headerContainer = document.querySelector("#qz-header");
const listContainer = document.querySelector("#list");
const submitBtn = document.querySelector("#submit");

clearPage();
showQuestion();
submitBtn.addEventListener("click", checkAnswer);

function clearPage() {
  headerContainer.innerHTML = "";
  listContainer.innerHTML = "";
}

function showQuestion() {
  
  const headerTemplate = `<h2 class="title">%title%</h2>`;
  const title = headerTemplate.replace("%title%", questions[questionIndex].question);
  headerContainer.innerHTML = title;

  let answerNumber = 1;
  for (const answerText of questions[questionIndex].answers) {
    const questionTemplate = `
      <li>
        <label>
          <input value="%number%" type="radio" class="answer" name="answer">
          <span>%answer%</span>
        </label>
      </li>`;

    const answerHTML = questionTemplate
      .replace("%answer%", answerText)
      .replace("%number%", answerNumber);

    listContainer.innerHTML += answerHTML;
    answerNumber++;
  }
}

function checkAnswer() {
  const checkedRadio = listContainer.querySelector("input[type=radio]:checked");

  if (!checkedRadio) {
      submitBtn.blur();
      return;
  }

  const userAnswer = parseInt(checkedRadio.value);
  const correctAnswer = questions[questionIndex].correct;

  const answerLabels = listContainer.querySelectorAll("label");

  answerLabels.forEach((label, index) => {
      label.classList.remove("correct", "incorrect");

      if (index + 1 === userAnswer) {
          if (userAnswer === correctAnswer) {
              label.classList.add("correct");
          } else {
              label.classList.add("incorrect");
          }
      } else if (index + 1 === correctAnswer) {
          label.classList.add("correct");
      }
  });

  if (userAnswer === correctAnswer) {
      score++;
  }

  submitBtn.removeEventListener("click", checkAnswer);

  if (questionIndex !== questions.length - 1) {
      questionIndex++;
      setTimeout(() => {
          clearPage();
          showQuestion();
          submitBtn.addEventListener("click", checkAnswer);
          submitBtn.disabled = false;
      }, 700);
  } else {
      setTimeout(() => {
          clearPage();
          showResults();
      }, 700);
  }
}


function showResults() {
  const resultsTemplate = `
    <h2 class="title">%title%</h2>
    <h3 class="summary">%message%</h3>
    <p class="result">%result%</p>`;

  let title, message;
  if (score === questions.length) {
    title = "Поздравляю!";
    message = "Вы ответили верно на все вопросы.";
  } else if ((score * 100) / questions.length >= 50) {
    title = "Не плохо!";
    message = "Вы ответили правильно на более чем половину вопросов.";
  } else {
    title = "Ужасно!";
    message = "Вы ответили правильно на меньше чем половину вопросов.";
  }

  const result = `${score} из ${questions.length}`;
  const finalMessage = resultsTemplate
    .replace("%title%", title)
    .replace("%message%", message)
    .replace("%result%", result);

  headerContainer.innerHTML = finalMessage;
  submitBtn.blur();
  submitBtn.innerText = "Начать заново";
  submitBtn.addEventListener("click", () => {
    history.go();
  });
}

