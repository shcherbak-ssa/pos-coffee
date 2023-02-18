import type { Notification } from 'shared/types';
import type { EntityName } from 'shared/constants';

export const notifications: {
  created: (entity: EntityName) => Notification,
  updated: (entity: EntityName) => Notification,
  archived: (entity: EntityName) => Notification,
  restored: (entity: EntityName) => Notification,
  createProcess: (entity: EntityName) => Notification,
  updateProcess: (entity: EntityName) => Notification,
  archiveProcess: (entity: EntityName) => Notification,
  restoreProcess: (entity: EntityName) => Notification,
} = {
  created: (entity: EntityName) => ({
    severity: 'success',
    heading: 'Created',
    message: `${entity} created successfully`,
  }),
  updated: (entity: EntityName) => ({
    severity: 'success',
    heading: 'Updated',
    message: `${entity} updated successfully`,
  }),
  archived: (entity: EntityName) => ({
    severity: 'success',
    heading: 'Archived',
    message: `${entity} archived successfully`,
  }),
  restored: (entity: EntityName) => ({
    severity: 'success',
    heading: 'Restored',
    message: `${entity} restored successfully`,
  }),
  createProcess: (entity: EntityName) => ({
    type: 'process',
    severity: 'info',
    heading: 'Creating...',
    message: `A new ${entity.toLowerCase()} is being created`,
  }),
  updateProcess: (entity: EntityName) => ({
    type: 'process',
    severity: 'info',
    heading: 'Updating...',
    message: `A new ${entity.toLowerCase()} is being updated`,
  }),
  archiveProcess: (entity: EntityName) => ({
    type: 'process',
    severity: 'info',
    heading: 'Archiving...',
    message: `A new ${entity.toLowerCase()} is being archived`,
  }),
  restoreProcess: (entity: EntityName) => ({
    type: 'process',
    severity: 'info',
    heading: 'Restoring...',
    message: `A new ${entity.toLowerCase()} is being restored`,
  }),
};
