export interface IDateProvider {
    addDays(days: number): Date;
    addHours(hours: number): Date;
    dateNow(): Date;
    compareIfBefore(start: Date, end: Date): boolean;

}