const { execSync } = require('child_process');

process.env.NODE_OPTIONS = '--openssl-legacy-provider';

execSync('npm run real-deploy', { stdio: 'inherit' });
