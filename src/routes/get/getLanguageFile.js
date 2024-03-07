module.exports = (app) => {
  app.get('/get-language-file', async (req, res) => {
    return res.json({ $t: req.lang })
  });
}