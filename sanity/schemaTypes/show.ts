import { defineField, defineType } from 'sanity';

export const show = defineType({
  name: 'show',
  title: 'Show',
  type: 'document',
  fields: [
    defineField({ name: 'date', type: 'date' }),
    defineField({ name: 'locationSlug', type: 'string' }),
    defineField({ name: 'time', type: 'string', description: 'Use HH:mm 24-hour format.' }),
    defineField({ name: 'title', type: 'string' }),
    defineField({ name: 'host', type: 'string' }),
    defineField({ name: 'headliner', type: 'string' }),
    defineField({ name: 'headlinerSlug', type: 'string' }),
    defineField({
      name: 'tourPoster',
      title: 'Tour Poster',
      type: 'image',
      options: { hotspot: true }
    }),
    defineField({ name: 'notes', type: 'text' }),
    defineField({ name: 'ticketPrice', type: 'string' }),
    defineField({ name: 'ticketUrl', type: 'url' })
  ]
});
