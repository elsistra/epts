module.exports = function (app) {
  // Render the dashboard page on request
  app.get('/orders', (req, res) => {
    res.render('orders', { session: req.session });
  });
};
