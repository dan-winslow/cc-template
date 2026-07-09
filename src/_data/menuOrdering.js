const site = require('./site.json');

const PRESETS = {
  toast: {
    platformName: 'Toast',
    ctaLabel: 'Order on Toast',
    embedTitle: 'Toast online ordering'
  },
  square: {
    platformName: 'Square',
    ctaLabel: 'Order on Square',
    embedTitle: 'Square online ordering'
  },
  chownow: {
    platformName: 'ChowNow',
    ctaLabel: 'Order on ChowNow',
    embedTitle: 'ChowNow online ordering'
  },
  ubereats: {
    platformName: 'Uber Eats',
    ctaLabel: 'Order on Uber Eats',
    embedTitle: 'Uber Eats online ordering'
  },
  doordash: {
    platformName: 'DoorDash',
    ctaLabel: 'Order on DoorDash',
    embedTitle: 'DoorDash online ordering'
  },
  grubhub: {
    platformName: 'Grubhub',
    ctaLabel: 'Order on Grubhub',
    embedTitle: 'Grubhub online ordering'
  },
  generic: {
    platformName: 'Online Ordering',
    ctaLabel: 'Order Food + Drinks',
    embedTitle: 'Online ordering'
  }
};

function normalizeProvider(value) {
  return String(value || '')
    .toLowerCase()
    .replace(/[^a-z]/g, '');
}

function detectProvider(source) {
  const normalized = normalizeProvider(source);
  if (normalized.includes('ubereats')) return 'ubereats';
  if (normalized.includes('doordash')) return 'doordash';
  if (normalized.includes('grubhub')) return 'grubhub';
  if (normalized.includes('chownow')) return 'chownow';
  if (normalized.includes('toast')) return 'toast';
  if (normalized.includes('square')) return 'square';
  return 'generic';
}

const configured = site.menuOrdering || {};
const providerFromConfig = normalizeProvider(configured.provider || '');
const provider = PRESETS[providerFromConfig]
  ? providerFromConfig
  : detectProvider(`${configured.platformName || ''} ${configured.orderingUrl || ''} ${configured.embedUrl || ''}`);
const preset = PRESETS[provider] || PRESETS.generic;

module.exports = {
  enabled: Boolean(configured.enabled),
  provider,
  platformName: configured.platformName || preset.platformName,
  orderingUrl: configured.orderingUrl || '',
  embedUrl: configured.embedUrl || '',
  ctaLabel: configured.ctaLabel || preset.ctaLabel,
  embedTitle: configured.embedTitle || preset.embedTitle
};
