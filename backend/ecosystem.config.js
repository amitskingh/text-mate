module.exports = {
  apps: [
    {
      name: "TextMate",
      script: "./app.js",
      instances: "max", 
      exec_mode: "cluster", 
      env: {
        NODE_ENV: "production",
      },
    },
  ],
}
