import { createClient } from '@sanity/client';
import fs from 'node:fs/promises';
import path from 'node:path';

const required = ['SANITY_PROJECT_ID', 'SANITY_DATASET'];
const missing = required.filter((name) => !process.env[name]);

if (missing.length) {
  console.error(`Missing env vars: ${missing.join(', ')}`);
  process.exit(1);
}

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: process.env.SANITY_API_VERSION || '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_TOKEN
});

const outputDir = path.resolve('src/_data');

const [site, shows, comedians, menuItems, packages] = await Promise.all([
  client.fetch(`*[_type == "siteSettings"] | order(_updatedAt desc)[0]{clubName,defaultLocation,locations,tagline,description,promoCopy,city,doorsOpen,address,phone,email,bioSubmissionBaseUrl,ticketing,menuOrdering,features}`),
  client.fetch(`*[_type == "show"] | order(date asc, time asc){date,locationSlug,time,title,host,headliner,headlinerSlug,"image": coalesce(tourPoster.asset->url, image),notes,ticketPrice,ticketUrl}`),
  client.fetch(`*[_type == "comedian"] | order(date asc, name asc){name,slug,locationSlug,date,blurb,image,bio,bioUpdateUrl,bioStatus,pendingBio,credits,showType}`),
  client.fetch(`*[_type == "menuItem"]{kind,name,locationSlug,description,price,image}`),
  client.fetch(`*[_type == "bookingPackage"]{name,locationSlug,description,startingPrice,capacity}`)
]);

const menu = {
  food: menuItems.filter((item) => item.kind === 'food').map(({ kind, ...rest }) => rest),
  drinks: menuItems.filter((item) => item.kind === 'drinks').map(({ kind, ...rest }) => rest)
};

await fs.writeFile(path.join(outputDir, 'site.json'), JSON.stringify(site || {}, null, 2));
await fs.writeFile(path.join(outputDir, 'shows.json'), JSON.stringify({ items: shows || [] }, null, 2));
await fs.writeFile(path.join(outputDir, 'comedians.json'), JSON.stringify({ items: comedians || [] }, null, 2));
await fs.writeFile(path.join(outputDir, 'menu.json'), JSON.stringify(menu, null, 2));
await fs.writeFile(path.join(outputDir, 'booking.json'), JSON.stringify({ packages: packages || [] }, null, 2));

console.log('Sanity content synced into src/_data/*.json');
