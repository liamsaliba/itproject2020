const uploadImage = async (req, res) => {
  try {
    if (req.file) {
      res.status(201).send({
        src: req.file.path,
      });
    } else {
      throw Error();
    }
  } catch (error) {
    res.status(400).send({
      error: "Unable to upload image.",
    });
  }
};

const deleteImage = async (req, res) => {
  try {
    if (req.deleteStatus) {
      res.sendStatus(200);
    } else {
      throw Error();
    }
  } catch (error) {
    res.status(400).send({
      error: "Unable to delete image.",
    });
  }
};

module.exports = {
  uploadImage,
  deleteImage,
};
