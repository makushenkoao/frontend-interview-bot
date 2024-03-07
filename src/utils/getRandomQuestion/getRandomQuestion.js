const { Random } = require("random-js");
const questions = require("../../../databases/questions.json");
const getRandomQuestion = (topic) => {
  const random = new Random();

  let questionTopic = topic.toLowerCase();

  if (questionTopic === "случайный вопрос") {
    questionTopic =
      Object.keys(questions)[
        random.integer(0, Object.keys(questions).length - 1)
      ];
  }

  const randomQuestionIndex = random.integer(
    0,
    questions[questionTopic].length - 1,
  );

  return {
    question: questions[questionTopic][randomQuestionIndex],
    questionTopic,
  };
};

module.exports = getRandomQuestion;
