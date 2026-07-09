import { defineField, defineType } from 'sanity';

export const comedian = defineType({
  name: 'comedian',
  title: 'Comedian',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string' }),
    defineField({ name: 'slug', type: 'string' }),
    defineField({ name: 'locationSlug', type: 'string' }),
    defineField({ name: 'date', type: 'date' }),
    defineField({ name: 'blurb', type: 'text' }),
    defineField({ name: 'image', type: 'url' }),
    defineField({ name: 'bio', type: 'text' }),
    defineField({ name: 'bioUpdateUrl', type: 'url' }),
    defineField({
      name: 'bioStatus',
      type: 'string',
      initialValue: 'approved',
      options: {
        list: [
          { title: 'Approved', value: 'approved' },
          { title: 'Pending Review', value: 'pending' }
        ]
      }
    }),
    defineField({ name: 'pendingBio', type: 'text' }),
    defineField({ name: 'credits', type: 'string' }),
    defineField({ name: 'showType', type: 'string' })
  ]
});
