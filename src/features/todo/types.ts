export interface Todo {
    id:number;
    title:string;
    targetDate:string;
    targetTime:string;
    completed:boolean;
    observation?:string
}