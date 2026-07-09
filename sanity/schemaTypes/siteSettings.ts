import { defineField, defineType } from 'sanity';

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'clubName', type: 'string' }),
    defineField({ name: 'defaultLocation', type: 'string' }),
    defineField({
      name: 'locations',
      type: 'array',
      of: [
        defineField({
          name: 'location',
          type: 'object',
          fields: [
            defineField({ name: 'slug', type: 'string' }),
            defineField({ name: 'name', type: 'string' }),
            defineField({ name: 'city', type: 'string' }),
            defineField({ name: 'address', type: 'string' }),
            defineField({ name: 'phone', type: 'string' }),
            defineField({ name: 'email', type: 'string' })
          ]
        })
      ]
    }),
    defineField({ name: 'tagline', type: 'string' }),
    defineField({ name: 'description', type: 'text' }),
    defineField({ name: 'promoCopy', type: 'text' }),
    defineField({ name: 'city', type: 'string' }),
    defineField({ name: 'doorsOpen', type: 'string' }),
    defineField({ name: 'address', type: 'string' }),
    defineField({ name: 'phone', type: 'string' }),
    defineField({ name: 'email', type: 'string' }),
    defineField({ name: 'bioSubmissionBaseUrl', type: 'url' }),
    defineField({
      name: 'ticketing',
      type: 'object',
      fields: [
        defineField({ name: 'enabled', type: 'boolean', initialValue: true }),
        defineField({ name: 'platformName', type: 'string' }),
        defineField({ name: 'eventsPageUrl', type: 'url' }),
        defineField({ name: 'embedUrl', type: 'url' })
      ]
    }),
    defineField({
      name: 'menuOrdering',
      type: 'object',
      fields: [
        defineField({ name: 'enabled', type: 'boolean', initialValue: false }),
        defineField({
          name: 'provider',
          type: 'string',
          options: {
            list: [
              { title: 'Auto Detect', value: '' },
              { title: 'Toast', value: 'toast' },
              { title: 'Square', value: 'square' },
              { title: 'ChowNow', value: 'chownow' },
              { title: 'Uber Eats', value: 'ubereats' },
              { title: 'DoorDash', value: 'doordash' },
              { title: 'Grubhub', value: 'grubhub' },
              { title: 'Generic', value: 'generic' }
            ]
          }
        }),
        defineField({ name: 'platformName', type: 'string' }),
        defineField({ name: 'orderingUrl', type: 'url' }),
        defineField({ name: 'embedUrl', type: 'url' })
      ]
    }),
    defineField({
      name: 'features',
      type: 'object',
      fields: [
        defineField({ name: 'menuEnabled', type: 'boolean', initialValue: true })
      ]
    })
  ]
});
