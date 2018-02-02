module.exports = function (app) {
  // Render the dashboard page on request
  app.get('/state', (req, res) => {
    res.render('state', { session: req.session });
  });
};
