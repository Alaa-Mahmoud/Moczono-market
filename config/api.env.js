const devConfig = {
    MongoDB_URL: "mongodb://alaa:alaa@ds233208.mlab.com:33208/amazono",
    PORT: process.env.PORT || 3000,
    JWT_SECRET: "opsitisasecretyeah",
}

module.exports = {
    ...devConfig
}