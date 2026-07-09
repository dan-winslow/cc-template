import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { schemaTypes } from './schemaTypes';

export default defineConfig({
  name: 'default',
  title: 'Comedy Club Template CMS',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'yourProjectId',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
  plugins: [deskTool()],
  schema: {
    types: schemaTypes
  }
});
