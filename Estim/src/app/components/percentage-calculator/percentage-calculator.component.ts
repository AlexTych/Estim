import { Component, Input, SimpleChanges } from '@angular/core';
import { PercentCalculatorItem, TotalElement } from 'src/app/utils/interfaces';

@Component({
    selector: 'percentage-calculator',
    templateUrl: 'percentage-calculator.component.html',
    styleUrls: ['percentage-calculator.component.css']
})

export class PercentageCalculatorComponent {
    
    data: PercentCalculatorItem[];
    @Input() percData: TotalElement[];
    @Input() title: string;

    constructor() { }

    ngOnChanges(changes: SimpleChanges) {
       if(!changes['title']) this.calculatePercentages();
    }

    // Calculate percentages based on the provided configuration
    private calculatePercentages(): void {
        this.data = [];
        const tempData = this.percData.slice(0, -1);
        const onePerc: number = this.percData[this.percData.length - 1].count / 100;

        let totalPercentage = 0;
        for (let i = 0; i < tempData.length - 1; i++) {
            const el = tempData[i];
            const percentage: number = Number((el.count / onePerc).toFixed(2));
            totalPercentage += percentage;
            this.data.push({ text: el.text, percentage, color: el.color });
        }

        const lastEntry = tempData[tempData.length - 1];
        const percentage: number = Number((100 - totalPercentage).toFixed(2));
        this.data.push({ text: lastEntry.text, percentage, color: lastEntry.color });
    }

    // Check for NaN values and return 0 if value is NaN
    checkForNaN(value: number): number {
        return isNaN(value) ? 0 : value;
    }
}
