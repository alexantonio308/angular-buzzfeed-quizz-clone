import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QUESTION } from '../interfaces/question.interface';

@Injectable({
  providedIn: 'root'
})
export class OpenTriviaApiService {
  private baseUrl = 'https://opentdb.com/api.php?amount=10'

  constructor(private http: HttpClient) {
   }


getQuestions():Observable<QUESTION>{

  return this.http.get<QUESTION>(this.baseUrl)
}


}
