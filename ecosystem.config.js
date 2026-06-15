module.exports = {
  apps: [
    {
      name: 'clinixpro-app',
      script: 'dist/main.js',
      instances: 'max',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'development',
      },
      env_homologation: {
        NODE_ENV: 'homologation',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
};
