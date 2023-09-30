import { Target } from "./business-logic-interfaces";

export interface TotalElement {
    text: string;
    count: number;
    backgroundColor: string;
    color: string;
}

export interface NavPage {
    text: string;
    icon: string;
    color: string;
    link: string;
}

export interface PercentCalculatorItem {
    text: string;
    percentage: number;
    color: string;
}

export interface LineChartConfigurations {
    series: {
        name: string,
        data: number[]
    },
    xAxisCategories: string[]
}

export interface ColorElement {
    text: string;
    backgroundColor: string;
    color: string;
}

export interface AddModifyDialogData {
    title: string;
    dataType: number;
    element?: any;
}