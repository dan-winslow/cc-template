const menuData = require('./menu.json');
const comediansData = require('./comedians.json');

function toArray(value) {
  return Array.isArray(value) ? value : [];
}

function normalizeMenuItem(item, fallbackCategory = '') {
  if (!item || typeof item !== 'object') {
    return null;
  }

  const name = item.name || item.title || item.label || '';
  const description = item.description || item.notes || item.summary || '';
  const price = item.price || item.cost || item.value || '';
  const image = item.image || item.imageUrl || item.photo || '';
  const category = item.category || fallbackCategory;
  const locationSlug = item.locationSlug || '';

  if (!name) {
    return null;
  }

  return { name, description, price, image, category, locationSlug };
}

function collectMenuHighlights(menu) {
  const highlights = [];

  for (const item of toArray(menu.food)) {
    const normalized = normalizeMenuItem(item, 'Food');
    if (normalized) {
      highlights.push(normalized);
    }
  }

  for (const item of toArray(menu.drinks)) {
    const normalized = normalizeMenuItem(item, 'Drink');
    if (normalized) {
      highlights.push(normalized);
    }
  }

  for (const item of toArray(menu.items)) {
    const normalized = normalizeMenuItem(item);
    if (normalized) {
      highlights.push(normalized);
    }
  }

  for (const section of toArray(menu.sections)) {
    const category = section && typeof section === 'object' ? section.title || section.name || '' : '';
    for (const item of toArray(section && section.items)) {
      const normalized = normalizeMenuItem(item, category);
      if (normalized) {
        highlights.push(normalized);
      }
    }
  }

  const seen = new Set();
  return highlights.filter((item) => {
    const key = `${item.name}|${item.price}|${item.category}|${item.locationSlug}`;
    if (seen.has(key)) {
      return false;
    }
    seen.add(key);
    return true;
  });
}

function normalizeComedian(comic) {
  if (!comic || typeof comic !== 'object') {
    return null;
  }

  const name = comic.name || comic.title || '';
  if (!name) {
    return null;
  }

  return {
    name,
    slug: comic.slug || '',
    locationSlug: comic.locationSlug || '',
    image: comic.image || comic.imageUrl || comic.photo || '',
    date: comic.date || '',
    blurb: comic.blurb || comic.description || comic.bio || '',
    credits: comic.credits || '',
    showType: comic.showType || comic.type || ''
  };
}

module.exports = {
  menuHighlights: collectMenuHighlights(menuData).slice(0, 4),
  featuredComedians: toArray(comediansData.items)
    .map(normalizeComedian)
    .filter(Boolean)
    .slice(0, 4)
};
