import dayjs from "dayjs";
import { DEFAULT_SETTING } from "../configs/defaultSetting";

export function isUrgent(
  deadline,
  remind_before = DEFAULT_SETTING.remind_before
) {
  if (!deadline || !dayjs(deadline).isValid() || isOverdue(deadline))
    return false;
  const { value, unit } = remind_before;

  return dayjs(deadline).subtract(value, unit).isBefore(dayjs());
}

export function isOverdue(deadline) {
  let date = dayjs(deadline);
  return date && date.isValid() && dayjs().isAfter(date);
}
