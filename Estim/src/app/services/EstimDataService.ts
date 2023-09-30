import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Expense, Target } from '../utils/business-logic-interfaces';

@Injectable()
export class EstimDataService {

  constructor(private http: HttpClient) { }

  // Method to retrieve target data from a JSON file
  getTargetsData(): Observable<Target[]> {
    // Using HttpClient to make a GET request, expecting an array of 'Target' objects
    return this.http.get<Target[]>('assets/data/targets.json');
  }

  // Method to retrieve expense data from a JSON file
  getExpensesData(): Observable<Expense[]> {
    // Using HttpClient to make a GET request, expecting an array of 'Expense' objects
    return this.http.get<Expense[]>('assets/data/expenses.json');
  }
}
