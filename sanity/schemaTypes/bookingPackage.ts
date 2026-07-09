import { defineField, defineType } from 'sanity';

export const bookingPackage = defineType({
  name: 'bookingPackage',
  title: 'Booking Package',
  type: 'document',
  fields: [
    defineField({ name: 'name', type: 'string' }),
    defineField({ name: 'locationSlug', type: 'string' }),
    defineField({ name: 'description', type: 'text' }),
    defineField({ name: 'startingPrice', type: 'string' }),
    defineField({ name: 'capacity', type: 'string' })
  ]
});
