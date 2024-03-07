module.exports = (app) => {
  app.get('/calendar', (req, res) => {
    res.render('template', {
      title: "calendar",
      component: 's-calendar',
      data: {},
      $t: req.lang,
      selectDate: false
    })
  });
}