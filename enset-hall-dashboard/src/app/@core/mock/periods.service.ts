import { Injectable } from "@angular/core";

@Injectable()
export class PeriodsService {
  getYears() {
    return [
      "2022",
      "2023",
    ];
  }

  getMonths() {
    return [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
  }

  getWeeks() {
    return ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  }
}
