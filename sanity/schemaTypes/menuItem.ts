import { defineField, defineType } from 'sanity';

export const menuItem = defineType({
  name: 'menuItem',
  title: 'Menu Item',
  type: 'document',
  fields: [
    defineField({ name: 'kind', type: 'string', options: { list: ['food', 'drinks'] } }),
    defineField({ name: 'name', type: 'string' }),
    defineField({ name: 'locationSlug', type: 'string' }),
    defineField({ name: 'description', type: 'text' }),
    defineField({ name: 'price', type: 'string' })
  ]
});
