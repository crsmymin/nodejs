exports.about = (req, res, next) => {
    res.render('about', { 
      title: "Blog",
      id: "aboutPage" 
  });
}
