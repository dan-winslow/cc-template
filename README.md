# Comedy Club 11ty Template

Sellable, CMS-ready Eleventy template for comedy clubs with two client demos and two CMS options.

## Included Sections

- Home page
- Show schedule page
- Upcoming comedians page
- Food and drink menu page (toggle on/off)
- Contact and event booking page

## Demo Gallery

- Demo index: `/demos/`
- Demo 1 (classic): `/demos/classic/`
- Demo 2 (modern): `/demos/neon/`

Each demo has its own full site routes:

- `/schedule/`
- `/comedians/`
- `/menu/`
- `/book/`

## Demo Feature Matrix

| Feature | Base Template | Classic Demo | Neon Demo |
| --- | --- | --- | --- |
| Visual direction | Warm modern club | Brick cellar / old-school club | Bright modern / future-forward |
| Core pages (home, schedule, comedians, booking) | Yes | Yes | Yes |
| Full schedule calendar view | Yes | Yes | Yes |
| Comedian image cards | Yes | Yes | Yes |
| Click-through comedian bio pages | Yes | Yes | Yes |
| Menu section supported | Yes (toggle) | Yes (enabled by default) | Yes (toggle, off by default) |
| Decap CMS ready | Yes | Yes | Yes |
| Sanity CMS ready | Yes | Yes | Yes |
| Best fit | Most clubs | Traditional comedy rooms | Trend-forward venues |

Sales note:
Use Base for fast launches, Classic for legacy rooms, and Neon for modern entertainment brands.

## Run Locally

```bash
npm install
npm run dev
```

Build output goes to `_site/`:

```bash
npm run build
```

## Content Model

Default template content:

- `src/_data/site.json`
- `src/_data/shows.json`
- `src/_data/comedians.json`
- `src/_data/menu.json`
- `src/_data/booking.json`

Demo content is stored in directory data files:

- `src/demos/classic/classic.11tydata.json`
- `src/demos/neon/neon.11tydata.json`

## Menu Toggle

Set `site.features.menuEnabled` in the relevant data source.

- `true` = show menu nav + page content
- `false` = hide menu nav and show a disabled message on the menu route

## Multi-location Support

Owners with multiple venues can manage all locations in one CMS.

- Add locations in `site.locations` with at least:
	- `slug`
	- `name`
- Optionally set `site.defaultLocation` to control the initial selection.
- Tag location-specific entries with `locationSlug` in:
	- `shows.items[]`
	- `comedians.items[]`
	- `menu.food[]` and `menu.drinks[]`
	- `booking.packages[]`

Behavior:

- Header + footer location dropdowns appear automatically when two or more locations are configured.
- Selected location is persisted and propagated through internal links using the `?location=<slug>` query param.
- Untagged entries (no `locationSlug`) are treated as shared and visible for all locations.

## Ticketing Platform Integration

The template supports seamless ticketing links with any platform (Eventbrite, Tixr, Universe, Ticketmaster, etc.).

Configure in data/CMS:

- Site-level settings (`ticketing` object):
	- `enabled`
	- `platformName`
	- `eventsPageUrl`
	- `embedUrl` (optional iframe URL)
- Show-level setting:
	- `ticketUrl` per event
	- `image` (tour/show poster)

Where ticket links appear:

- Home page upcoming show cards
- Full calendar day entries on schedule pages
- Show cards on schedule pages

Tour poster upload:

- Decap CMS: Show Schedule -> each show -> `Tour Poster` upload field.
- Sanity CMS: Show document -> `Tour Poster` image field.
- Synced output writes poster URL into `shows.items[].image` for template rendering.

## CMS Option 1: Decap CMS (Git-based, Netlify)

Admin files:

- `src/admin/index.html`
- `src/admin/config.yml`

Setup steps:

1. Deploy to Netlify.
2. Enable Identity and Git Gateway in Netlify project settings.
3. Invite client editors in Netlify Identity.
4. Visit `/admin/` and log in.
5. Update settings, schedule, comedians, menu, and booking packages.

### Netlify Launch Checklist

Use this checklist before handing admin access to a client.

1. Deploy status
	- Confirm latest commit is published in Netlify.
	- Confirm site loads at production URL.
2. Identity setup
	- Netlify Dashboard -> Identity -> Enable Identity.
	- Set registration preference (Invite only recommended for client projects).
3. Git Gateway
	- Netlify Dashboard -> Identity -> Services -> Enable Git Gateway.
4. Editor access
	- Invite each editor email from Identity.
	- Confirm each user accepts invite and sets password.
5. Admin route
	- Open `/admin/` on production domain.
	- Confirm Decap login screen appears.
6. Write test
	- Log in as editor and change one low-risk value (for example `site.tagline`).
	- Save and publish.
	- Confirm a commit is created in Git provider.
	- Confirm Netlify auto-build triggers and deployed site shows the update.
7. Media test
	- Upload one image in CMS (for example show `Tour Poster`).
	- Confirm file appears under `src/assets/uploads` in repo.
	- Confirm image renders on site after deploy.
8. Rollback safety
	- Verify Netlify deploy history is enabled.
	- Verify Git history is intact for content rollback.

Common issues:

- `/admin/` shows blank page: check browser console and confirm `src/admin/index.html` is being published.
- Login works but publish fails: confirm Git Gateway is enabled and user has repo write permissions.
- Upload fails: confirm `media_folder` and `public_folder` values in `src/admin/config.yml` are unchanged.

## CMS Option 2: Sanity (Hosted Structured CMS)

Sanity Studio and schema files:

- `sanity/sanity.config.ts`
- `sanity/sanity.cli.ts`
- `sanity/schemaTypes/*`

Sanity commands:

```bash
npm run sanity:dev
npm run sanity:deploy
```

Sync Sanity data into Eleventy JSON files:

```bash
npm run sync:sanity
```

Environment variables are documented in `.env.example`.

## Client Delivery Workflow

1. Clone this template for a client.
2. Pick a style baseline: default, classic demo, or neon demo.
3. Connect Decap CMS (Netlify) or Sanity CMS.
4. Replace sample content and deploy.
