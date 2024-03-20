module.exports = (app) => {
  app.get('/affairs', (req, res) => {
    res.dispatchRender('template', {
      title: "affairs",
      component: 's-affairs',
      data: {}
    })
  });
}