import { Component, Input, SimpleChanges } from '@angular/core';
import { LineChartConfigurations } from 'src/app/utils/interfaces';
import * as Highcharts from 'highcharts';

@Component({
    selector: 'line-chart',
    templateUrl: 'line-chart.component.html',
    styleUrls: ['line-chart.component.css']
})

export class LineChartComponent {

    @Input() chartConfigurations: LineChartConfigurations;
    @Input() title: string;

    constructor() { }

    ngOnChanges(changes: SimpleChanges): void {
        this.buildChart();
    }

    // Initialize line chart
    private buildChart(): void {
        Highcharts.chart('lineChart', {
            title: {
                text: ''
            },
            plotOptions: {
                line: {
                    dataLabels: {
                        enabled: true
                    },
                    allowPointSelect: true,
					cursor: 'pointer',
                }
            },
            xAxis: {
                categories: this.chartConfigurations.xAxisCategories.length > 0? this.chartConfigurations.xAxisCategories : ["No data."],
                labels: {
                    enabled: this.chartConfigurations.xAxisCategories.length < 1
                }
            },
            yAxis: {
                title: {
                    text: ''
                }
            },
            series: 
            [{
                type: 'line',
                name: this.chartConfigurations.series.name,
                data: this.chartConfigurations.series.data.length > 0? this.chartConfigurations.series.data : [0],
                showInLegend: true
            }],
            legend: {
                enabled: false
            },
            exporting: {
				enabled: false
			},
			credits: {
				enabled: false
			}
        });
    }
}
