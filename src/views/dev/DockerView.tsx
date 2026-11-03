import React, { useState } from 'react';
import { ToolShell, CopyButton } from '../../components/ToolShell';
import { dockerRunToCompose } from '../../engines/dev/dockerTools';

const SAMPLE_DOCKER = `docker run -d \\
  --name web-app \\
  -p 8080:80 \\
  -v /var/log:/var/log \\
  -e NODE_ENV=production \\
  -e PORT=80 \\
  --restart unless-stopped \\
  nginx:alpine`;

export const DockerView: React.FC = () => {
  const [cmd, setCmd] = useState(SAMPLE_DOCKER);

  const compose = dockerRunToCompose(cmd);

  return (
    <ToolShell
      title="Docker Run to Docker Compose Converter"
      category="dev"
      description="Convert docker run CLI commands into structured docker-compose.yml configuration files."
      icon="🐳"
      onReset={() => setCmd(SAMPLE_DOCKER)}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-xs text-neutral-400 mb-1">docker run command</label>
          <textarea
            value={cmd}
            onChange={(e) => setCmd(e.target.value)}
            rows={5}
            className="w-full bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-xs text-neutral-100 font-mono focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="p-4 bg-neutral-950/70 border border-neutral-800 rounded-xl space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-xs text-neutral-400 font-semibold font-mono">docker-compose.yml</span>
            <CopyButton text={compose} />
          </div>
          <pre className="font-mono text-xs text-emerald-400 bg-neutral-900/50 p-3 rounded overflow-x-auto leading-relaxed">
            {compose}
          </pre>
        </div>
      </div>
    </ToolShell>
  );
};
