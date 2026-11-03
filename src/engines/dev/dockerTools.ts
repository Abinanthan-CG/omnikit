export interface ParsedDockerRun {
  image: string;
  containerName?: string;
  ports: string[];
  volumes: string[];
  environment: Record<string, string>;
  restart?: string;
}

export function parseDockerRun(cmd: string): ParsedDockerRun {
  const clean = cmd.trim().replace(/\\\r?\n/g, ' ');
  const ports: string[] = [];
  const volumes: string[] = [];
  const environment: Record<string, string> = {};
  let containerName: string | undefined;
  let restart: string | undefined;

  // Ports -p 80:80 / -p 127.0.0.1:8080:80
  const portRegex = /(?:-p|--publish)\s+['"]?([^\s'"]+)['"]?/g;
  let pMatch;
  while ((pMatch = portRegex.exec(clean)) !== null) {
    ports.push(pMatch[1]);
  }

  // Volumes -v /host:/container
  const volRegex = /(?:-v|--volume)\s+['"]?([^\s'"]+)['"]?/g;
  let vMatch;
  while ((vMatch = volRegex.exec(clean)) !== null) {
    volumes.push(vMatch[1]);
  }

  // Environment -e KEY=VAL
  const envRegex = /(?:-e|--env)\s+['"]?([^=\s'"]+)=([^\s'"]*)['"]?/g;
  let eMatch;
  while ((eMatch = envRegex.exec(clean)) !== null) {
    environment[eMatch[1]] = eMatch[2];
  }

  // Name --name foo
  const nameMatch = clean.match(/--name\s+['"]?([^\s'"]+)['"]?/);
  if (nameMatch) {
    containerName = nameMatch[1];
  }

  // Restart --restart unless-stopped
  const restartMatch = clean.match(/--restart\s+['"]?([^\s'"]+)['"]?/);
  if (restartMatch) {
    restart = restartMatch[1];
  }

  // Last token is usually the image
  const tokens = clean.split(/\s+/).filter(t => !t.startsWith('-'));
  const image = tokens.length > 1 ? tokens[tokens.length - 1] : 'my-app:latest';

  return {
    image,
    containerName,
    ports,
    volumes,
    environment,
    restart,
  };
}

export function dockerRunToCompose(cmd: string): string {
  const parsed = parseDockerRun(cmd);
  const serviceName = parsed.containerName || 'app';

  let yaml = `version: '3.8'\nservices:\n  ${serviceName}:\n    image: ${parsed.image}\n`;

  if (parsed.containerName) {
    yaml += `    container_name: ${parsed.containerName}\n`;
  }

  if (parsed.restart) {
    yaml += `    restart: ${parsed.restart}\n`;
  }

  if (parsed.ports.length > 0) {
    yaml += `    ports:\n`;
    for (const p of parsed.ports) {
      yaml += `      - "${p}"\n`;
    }
  }

  if (parsed.volumes.length > 0) {
    yaml += `    volumes:\n`;
    for (const v of parsed.volumes) {
      yaml += `      - "${v}"\n`;
    }
  }

  if (Object.keys(parsed.environment).length > 0) {
    yaml += `    environment:\n`;
    for (const [k, v] of Object.entries(parsed.environment)) {
      yaml += `      ${k}: "${v}"\n`;
    }
  }

  return yaml;
}
