import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'unifiedId',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        description: 'External identifier managed by Anzieu SSO.',
        readOnly: true,
      },
    },
  ],
}
