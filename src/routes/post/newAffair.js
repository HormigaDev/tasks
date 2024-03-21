module.exports = (app, { generateID, affairs }) => {
  app.post('/new-affair', async (req, res) => {
    let id = generateID(7);
    while(await affairs.findOne({ id })) id = generateID(7);
    let { title, description, person, _id } = req.body;
    if(!title || !description || !person) return res.status(400).json({error: 'Campos obligatorios vacíos'});
    if(!_id){
      let newAffair = {
        id,
        title,
        timeline: [
          {
            date: new Date().toFormat('yyyy-mm-dd hh:ii'),
            description,
            person
          }
        ],
        createdAt: new Date().toFormat('yyyy-mm-dd hh:ii'),
        archived: false
      }
      await affairs.insertOne(newAffair);
      res.status(200).json({ message: 'Affair created' });
    } else {
      let affair = await affairs.findOne({ id: _id });
      let timeline = affair.timeline;
      timeline.push({
        date: new Date().toFormat('yyyy-mm-dd hh:ii'),
        description,
        person
      });
      await affairs.updateOne({ id: _id }, { timeline });
      res.status(200).json({ message: 'Affair updated' });
    }
  });
}

