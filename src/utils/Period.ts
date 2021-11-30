import { sub, Duration } from "date-fns";

export class Period {
  readonly duration?: Duration;

  get startDate(): Date {
    return this._startDate ?? new Date();
  }

  get endDate(): Date {
    return this._endDate ?? new Date();
  }

  get isValid() {
    return this.startDate < this.endDate;
  }

  get boundaries() {
    if (!this.isValid) {
      throw new Error("Invalid period boundaries");
    }

    return {
      from: this.startDate,
      to: this.endDate,
    };
  }

  private readonly _startDate?: Date;
  private readonly _endDate?: Date;

  constructor(duration: Duration);
  constructor(_startDate: Date, _endDate?: Date);
  constructor(arg1: Date | Duration, arg2?: Date) {
    if (arg1 instanceof Date) {
      this._startDate = arg1;
      this._endDate = arg2;
    } else {
      this.duration = arg1;
      this._startDate = sub(this.endDate, this.duration);
    }
  }
}
