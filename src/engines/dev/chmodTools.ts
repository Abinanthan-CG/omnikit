export interface PermissionGroup {
  read: boolean;
  write: boolean;
  execute: boolean;
}

export interface ChmodResult {
  success: boolean;
  octal: string;
  symbolic: string;
  owner: PermissionGroup;
  group: PermissionGroup;
  others: PermissionGroup;
  command: string;
  error?: string;
}

function groupToOctal(g: PermissionGroup): number {
  return (g.read ? 4 : 0) + (g.write ? 2 : 0) + (g.execute ? 1 : 0);
}

function octalToGroup(num: number): PermissionGroup {
  return {
    read: (num & 4) !== 0,
    write: (num & 2) !== 0,
    execute: (num & 1) !== 0,
  };
}

function groupToSymbolic(g: PermissionGroup): string {
  return `${g.read ? 'r' : '-'}${g.write ? 'w' : '-'}${g.execute ? 'x' : '-'}`;
}

export function parseChmodOctal(octalStr: string): ChmodResult {
  const clean = octalStr.trim();
  if (!/^[0-7]{3,4}$/.test(clean)) {
    return {
      success: false,
      octal: clean,
      symbolic: '---------',
      owner: { read: false, write: false, execute: false },
      group: { read: false, write: false, execute: false },
      others: { read: false, write: false, execute: false },
      command: `chmod ${clean} filename`,
      error: 'Invalid octal chmod code (must be 3 or 4 digits 0-7)',
    };
  }

  const lastThree = clean.slice(-3);
  const oNum = parseInt(lastThree[0], 10);
  const gNum = parseInt(lastThree[1], 10);
  const otNum = parseInt(lastThree[2], 10);

  const owner = octalToGroup(oNum);
  const group = octalToGroup(gNum);
  const others = octalToGroup(otNum);

  const symbolic = `${groupToSymbolic(owner)}${groupToSymbolic(group)}${groupToSymbolic(others)}`;

  return {
    success: true,
    octal: lastThree,
    symbolic,
    owner,
    group,
    others,
    command: `chmod ${lastThree} filename`,
  };
}

export function parseChmodFlags(flags: { owner: PermissionGroup; group: PermissionGroup; others: PermissionGroup }): ChmodResult {
  const oNum = groupToOctal(flags.owner);
  const gNum = groupToOctal(flags.group);
  const otNum = groupToOctal(flags.others);

  const octal = `${oNum}${gNum}${otNum}`;
  const symbolic = `${groupToSymbolic(flags.owner)}${groupToSymbolic(flags.group)}${groupToSymbolic(flags.others)}`;

  return {
    success: true,
    octal,
    symbolic,
    owner: flags.owner,
    group: flags.group,
    others: flags.others,
    command: `chmod ${octal} filename`,
  };
}
