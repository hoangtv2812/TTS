module.exports = {
  apps: [
    {
      instances: 1,
      watch: true,
      name: 'tts_backend',
      script: 'npm run dev',
      ignore_watch: ['public', 'node_modules', 'coverage'],
    },
  ],
};
