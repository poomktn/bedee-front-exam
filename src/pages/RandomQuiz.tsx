import {Box, Radio, ScrollView, Text} from 'native-base';
import React, {useContext, useEffect, useMemo, useState} from 'react';
import {FormContext} from '../App';

interface QuizStarterProps {
  quiz: number;
}

interface QuestionProps extends QuizStarterProps {
  choice: number[];
}

function randomChoice(correctChoice: number, range: number) {
  const arraySize = 4;
  let numbers: number[] = [];

  for (let i = 0; i < arraySize - 1; ) {
    let random = Math.floor(Math.random() * range);
    if (random !== correctChoice && !numbers.includes(random)) {
      numbers.push(random); // random number between 0 and range
      i++;
    }
  }

  numbers.push(correctChoice);

  // Shuffle the array
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }

  return numbers;
}

function generateRandom(TOTAL_QUIZ: number) {
  let randomQuiz: QuestionProps[] = [];
  let usedQuiz: number[] = [];
  while (randomQuiz.length < 20) {
    let numberRandom = Math.floor(Math.random() * TOTAL_QUIZ);
    if (!usedQuiz.includes(numberRandom)) {
      let choice = randomChoice(numberRandom + 1, TOTAL_QUIZ);
      let eachQuiz = {quiz: numberRandom + 1, choice};
      randomQuiz.push(eachQuiz);
      usedQuiz.push(numberRandom);
    }
  }
  return randomQuiz;
}

const TOTAL_QUIZ = 20;
const Quiz_Group = generateRandom(TOTAL_QUIZ);

export function RandomQuiz() {
  const [quizGroup] = useState(Quiz_Group);
  const {scoreGroup, setScoreGroup} = useContext(FormContext);
  const score = useMemo(
    () => Object.values(scoreGroup).reduce((prev, next) => prev + next, 0),
    [scoreGroup],
  );
  function addScore(quiz: number, correctAns: string) {
    setScoreGroup(prev => ({
      ...prev,
      [quiz]: quiz.toString() === correctAns ? 1 : 0,
    }));
  }

  // for log score group
  // useEffect(() => {
  //   console.log(scoreGroup);
  // }, [scoreGroup]);

  return (
    <>
      <Box py={2} backgroundColor='green.100'>
        <Text>True choice is equal to number of quiz</Text>
        <Text>Total Score: {score}</Text>
      </Box>
      <ScrollView>
        {quizGroup.map(({quiz, choice}, index) => (
          <Box key={index} backgroundColor='amber.100' py={2}>
            <Text key={index}>QUIZ: {quiz}</Text>
            <Radio.Group
              name="myRadioGroup"
              accessibilityLabel="favorite number"
              onChange={nextValue => {
                addScore(quiz, nextValue);
              }}>
              {choice.map((elem, idx) => (
                <Radio value={`${elem}`} my={1} key={idx}>
                  <Text>choice: {elem}</Text>
                </Radio>
              ))}
            </Radio.Group>
          </Box>
        ))}
      </ScrollView>
    </>
  );
}
