export interface PermissionFlag {
  id: string;
  name: string;
  bit: number;
  value: number;
  description: string;
}

export const COMMON_PERM_FLAGS: PermissionFlag[] = [
  { id: 'read', name: 'Read', bit: 0, value: 1, description: 'View and read resources' },
  { id: 'write', name: 'Write', bit: 1, value: 2, description: 'Create and update resources' },
  { id: 'delete', name: 'Delete', bit: 2, value: 4, description: 'Purge or destroy resources' },
  { id: 'execute', name: 'Execute', bit: 3, value: 8, description: 'Run executable routines or scripts' },
  { id: 'manage_users', name: 'Manage Users', bit: 4, value: 16, description: 'Invite, edit, or remove team members' },
  { id: 'manage_billing', name: 'Billing Admin', bit: 5, value: 32, description: 'Modify payment and subscriptions' },
  { id: 'manage_roles', name: 'Role Admin', bit: 6, value: 64, description: 'Grant or revoke permissions' },
  { id: 'super_admin', name: 'Super Admin', bit: 7, value: 128, description: 'Unrestricted root bypass permissions' }
];

export function evaluateBitmask(mask: number): {
  activeFlags: PermissionFlag[];
  binaryRepresentation: string;
  hexRepresentation: string;
  totalActive: number;
} {
  const safe = Math.max(0, mask || 0);
  const activeFlags = COMMON_PERM_FLAGS.filter((flag) => (safe & flag.value) !== 0);

  return {
    activeFlags,
    binaryRepresentation: safe.toString(2).padStart(8, '0'),
    hexRepresentation: `0x${safe.toString(16).toUpperCase().padStart(2, '0')}`,
    totalActive: activeFlags.length
  };
}

export function buildBitmask(selectedFlagValues: number[]): number {
  return selectedFlagValues.reduce((acc, val) => acc | val, 0);
}
