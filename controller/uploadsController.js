export const uploadImages = (req, res) => {
  const images = [];
  const files = req.files;

  files.forEach((file) => {
    const url = file.destination + file.filename;
    images.push(url);
  });

  res.status(200).json({ images: images });
};
