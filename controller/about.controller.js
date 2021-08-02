exports.about = (req, res, next) => {
    res.render('about', { 
      title: "Blog",
      id: "aboutPage",
      contents : 
      [
        {menu : "ap1"},
        {menu : "ap2"},
        {menu : "ap3"},
        {menu : "ap4"},
        {menu : "ap5"}
      ]
  });
}
