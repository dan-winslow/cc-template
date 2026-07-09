const { DateTime } = require("luxon");

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function toSundayFirstWeekday(luxonWeekday) {
  return luxonWeekday % 7;
}

function buildCalendar(items) {
  const entries = (items || []).slice().sort((a, b) => {
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
}

module.exports = function (eleventyConfig) {
  eleventyConfig.setDataDeepMerge(false);

  eleventyConfig.addPassthroughCopy({ "src/styles": "styles" });
  eleventyConfig.addPassthroughCopy({ "src/admin": "admin" });
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  eleventyConfig.addFilter("readableDate", (dateObj) => {
    return DateTime.fromISO(dateObj, { zone: "utc" }).toFormat("cccc, LLLL d");
  });

  eleventyConfig.addFilter("readableTime", (timeValue) => {
    return DateTime.fromFormat(timeValue, "HH:mm").toFormat("h:mm a");
  });

  eleventyConfig.addFilter("slugify", slugify);
  eleventyConfig.addFilter("toCalendar", buildCalendar);

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "_site"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};