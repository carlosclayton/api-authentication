import {IDateProvider} from "./IDateProvider";
import dayjs from "dayjs";
import { injectable } from "tsyringe";

export class DateProvider implements IDateProvider{
    addDays(days: number): Date {
        return dayjs().add(days, "days").toDate();
    }

    addHours(hours: number): Date {
        return dayjs().add(hours, "hours").toDate();
    }

    dateNow(): Date {
        return dayjs().toDate();
    }

    compareIfBefore(start: Date, end: Date): boolean {
        return dayjs(start).isBefore(end);
    }

}