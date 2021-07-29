exports.community = (req, res, next) => {
    res.render('community', { 
      title: "Blog",
      id: "communityPage" 
  });
}
