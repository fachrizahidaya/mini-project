module.exports = {
  apps: [
    {
      name: "minpro-blog", // Format JCWD-{batchcode}-{groupnumber}
      script: "./projects/server/src/index.js",
      env: {
        NODE_ENV: "production",
        PORT: 8099,
      },
      time: true,
    },
  ],
};
