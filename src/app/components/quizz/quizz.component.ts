import { Component, OnInit } from '@angular/core';

import { OpenTriviaApiService } from 'src/app/services/open-trivia-api.service';
import { QUESTION } from 'src/app/interfaces/question.interface';
import quizz_questions from "../../../assets/data/quizz_questions.json"

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})

export class QuizzComponent implements OnInit {

  questionsQ: QUESTION[] = [];


  title:string = ""

  questions:any
  questionSelected:any

  answers:string[] = []
  answerSelected:string =""

  questionIndex:number =0
  questionMaxIndex:number=0

  finished:boolean = false

  constructor(private service: OpenTriviaApiService) { }

  ngOnInit(): void {
    this.getMessages();

    if(quizz_questions){
      this.finished = false
      this.title = "International Generic Quizz"

      this.questions = this.questionsQ;
      this.questionSelected = this.questionsQ[this.questionIndex]

      this.questionIndex = 0
      this.questionMaxIndex = this.questionsQ.length

      console.log("this.questionIndex",this.questionIndex)
      console.log("this.questionMaxIndex",this.questionMaxIndex)
    }

  }

  public getMessages() {
    this.service.getQuestions().subscribe((res) => {
      if (res.results) {
        this.questionsQ = res.results.map((item: any) => {
          const answers = [item.correct_answer, ...item.incorrect_answers];
          const shuffledAnswers = answers.sort(() => Math.random() - 0.5);

          return {
            type: item.type,
            difficulty: item.difficulty,
            category: item.category,
            question: item.question,
            correct_answer: item.correct_answer,
            incorrect_answers: item.incorrect_answers,
            answers: shuffledAnswers
          };
        });
        console.log("QUESTIONS Q",this.questionsQ);
      }
    });
  }

  playerChoose(value:string){
    this.answers.push(value)
    this.nextStep()

  }

  async nextStep(){
    this.questionIndex+=1

    if(this.questionMaxIndex > this.questionIndex){
        this.questionSelected = this.questionsQ[this.questionIndex]
    }else{
      const finalAnswer:string = await this.checkResult(this.answers)
      this.finished = true
      this.answerSelected = this.questions.results[finalAnswer as keyof typeof this.questions.results ]
    }
  }

  async checkResult(anwsers:string[]){

    const result = anwsers.reduce((previous, current, i, arr)=>{
        if(
          arr.filter(item => item === previous).length >
          arr.filter(item => item === current).length
        ){
          return previous
        }else{
          return current
        }
    })

    return result
  }

}
