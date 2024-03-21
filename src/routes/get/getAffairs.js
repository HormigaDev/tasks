module.exports = (app, { affairs }) => {
  app.get('/get-affairs', async (req, res) => {
    let { order_by, page, results, search, archives } = req.query;
    let affairList = await affairs.getAll();
    let order = order_by === 'az' ? 'asc' : 'desc';
    affairList = affairList.sort((a, b) => {
      if(order === 'asc'){
        if(a.title === b.title) return 0;
        return a.title > b.title ? 1 : -1;
      } else {
        if(a.title === b.title) return 0;
        return a.title < b.title ? 1 : -1;
      }
    });
    if(search){
      affairList = affairList.filter(affair => {
        if(affair.title.toLowerCase().includes(search.toLowerCase()) ||
        affair.timeline.find(t => t.person.name.toLowerCase().includes(search.toLowerCase()) ||
          t.description.toLowerCase().includes(search.toLowerCase()) ||
          t.person.phone.toLowerCase().includes(search.toLowerCase())) ? true : false){
          return true;
          }
        return false;
      });
    }
    if(archives === 'false' || archives === false){
      affairList = affairList.filter(affair => {
        if(affair.archived === false) return true;
        return false;
      });
    }

    let totalResults = affairList.length;
    let pages = affairList.pages(results);
    let prev = false;
    let next = false;

    if(page > 1){
      prev = true;
    }
    if(page < pages){
      next = true;
    }
    affairList = affairList.paginate(results, page);
    res.dispatch({ affairs: affairList, prev, next, page, pages, totalResults });
  });
}

