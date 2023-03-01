import type { Notification } from 'shared/types';
import type { EntityName } from 'shared/constants';

export const notifications: {
  created: (entity: EntityName) => Notification;
  updated: (entity: EntityName) => Notification;
  archived: (entity: EntityName) => Notification;
  restored: (entity: EntityName) => Notification;
  deleted: (entity: EntityName) => Notification;
  createProcess: (entity: EntityName) => Notification;
  updateProcess: (entity: EntityName) => Notification;
  archiveProcess: (entity: EntityName) => Notification;
  restoreProcess: (entity: EntityName) => Notification;
  deleteProcess: (entity: EntityName) => Notification;
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
  deleted: (entity: EntityName) => ({
    severity: 'success',
    heading: 'Deleted',
    message: `${entity} deleted successfully`,
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
    message: `${entity} is being updated`,
  }),
  archiveProcess: (entity: EntityName) => ({
    type: 'process',
    severity: 'info',
    heading: 'Archiving...',
    message: `${entity} is being archived`,
  }),
  restoreProcess: (entity: EntityName) => ({
    type: 'process',
    severity: 'info',
    heading: 'Restoring...',
    message: `${entity} is being restored`,
  }),
  deleteProcess: (entity: EntityName) => ({
    type: 'process',
    severity: 'info',
    heading: 'Deleting...',
    message: `${entity} is being deleted`,
  }),
};
