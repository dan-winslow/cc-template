const { DateTime } = require("luxon");
const shows = require("./shows.json");

function toSundayFirstWeekday(luxonWeekday) {
  return luxonWeekday % 7;
}

module.exports = function () {
  const entries = (shows.items || []).slice().sort((a, b) => {
    return `${a.date} ${a.time}`.localeCompare(`${b.date} ${b.time}`);
  });

  const byDate = new Map();
  const monthMap = new Map();

  for (const show of entries) {
    const dayKey = show.date;
    const monthKey = show.date.slice(0, 7);

    if (!byDate.has(dayKey)) {
      byDate.set(dayKey, []);
    }
    byDate.get(dayKey).push(show);

    if (!monthMap.has(monthKey)) {
      const monthStart = DateTime.fromISO(`${monthKey}-01`, { zone: "utc" });
      monthMap.set(monthKey, {
        key: monthKey,
        title: monthStart.toFormat("LLLL yyyy"),
        firstDayOffset: toSundayFirstWeekday(monthStart.weekday),
        daysInMonth: monthStart.daysInMonth,
        weeks: []
      });
    }
  }

  const months = Array.from(monthMap.values()).sort((a, b) => a.key.localeCompare(b.key));

  for (const month of months) {
    const totalCells = month.firstDayOffset + month.daysInMonth;
    const weekCount = Math.ceil(totalCells / 7);
    const weeks = Array.from({ length: weekCount }, () => Array(7).fill(null));

    for (let day = 1; day <= month.daysInMonth; day += 1) {
      const cellIndex = month.firstDayOffset + day - 1;
      const weekIndex = Math.floor(cellIndex / 7);
      const dayIndex = cellIndex % 7;
      const isoDate = `${month.key}-${String(day).padStart(2, "0")}`;

      weeks[weekIndex][dayIndex] = {
        day,
        isoDate,
        shows: byDate.get(isoDate) || []
      };
    }

    month.weeks = weeks;
  }

  return months;
};
