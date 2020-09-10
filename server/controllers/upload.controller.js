const uploadImage = async (req, res) => {
  try {
    if (req.file) {
      res.status(201).send({ src: req.file.secure_url });
    } else {
      throw Error();
    }
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = {
  uploadImage,
}