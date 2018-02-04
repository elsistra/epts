module.exports = function (app) {
  // Render the dashboard page on request
  app.get('/order/', (req, res) => {
    res.render('order', { session: req.session });
  });
};
