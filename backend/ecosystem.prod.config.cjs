module.exports = {
  apps: [
    {
      instances: 1,
      watch: false,
      name: 'tts_backend',
      script: 'npm run prod',
    },
  ],
};
