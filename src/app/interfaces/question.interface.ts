
 export type ApiResponse = {
  results: QUESTION[];
};

 export type QUESTION = {
  results: any;
  type: string,
  difficulty: string,
  category: string,
  question: string,
  correct_answer: string,
  answers: [],
  incorrect_answers: []

}
