const uploadImage = async (req, res) => {
  try {
    console.log(req.file);
    if (req.file) {
      res.status(201).send({
        src: req.file.path
      });
    } else {
      throw Error();
    }
  } catch (error) {
    res.status(400).send({
      error: "Unable to upload image."
    });
  }
};

module.exports = {
  uploadImage,
};