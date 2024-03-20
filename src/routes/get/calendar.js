module.exports = (app) => {
  app.get('/calendar', (req, res) => {
    res.dispatchRender('template', {
      title: "calendar",
      component: 's-calendar',
      data: {},
      $t: req.lang,
      selectDate: false
    })
  });
}