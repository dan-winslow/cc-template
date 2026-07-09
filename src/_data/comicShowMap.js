const { DateTime } = require('luxon');
const shows = require('./shows.json');

function slugify(value) {
  return String(value || '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

module.exports = function () {
  const map = {};
  const items = Array.isArray(shows.items) ? shows.items : [];
  const now = DateTime.utc();

  const sorted = items.slice().sort((a, b) => {
    return `${a.date || ''} ${a.time || ''}`.localeCompare(`${b.date || ''} ${b.time || ''}`);
  });

  for (const show of sorted) {
    const showTime = show.time || '00:00';
    const startsAt = DateTime.fromISO(`${show.date}T${showTime}`, { zone: 'utc' });
    if (startsAt.isValid && startsAt < now) {
      continue;
    }

    const key = slugify(show.headlinerSlug || show.headliner);
    if (!key) {
      continue;
    }

    if (!map[key]) {
      map[key] = [];
    }

    map[key].push(show);
  }

  return map;
};
