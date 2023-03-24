module.exports = (app) => {
    app.use("/api/v1/auth", require("./auth.routes"));
    app.use("/api/v1/profile", require("./profile.route"));
};
