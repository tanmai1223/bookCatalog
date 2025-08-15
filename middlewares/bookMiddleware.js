export const validateBook = (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      status: "error",
      message: "Request body is missing. Please send user details.",
    });
  }

  const { title, author, genre, price } = req.body;
  let { inStock } = req.body;

  if (!title || title.trim().length <= 2) {
    return res.status(400).json({
      status: "error",
      field: "title",
      message: "Title must be at least 3 characters long.",
    });
  }

  if (!author || author.trim().length <= 2) {
    return res.status(400).json({
      status: "error",
      field: "author",
      message: "Author must be at least 3 characters long.",
    });
  }

  if (!genre || genre.trim().length <= 2) {
    return res.status(400).json({
      status: "error",
      field: "genre",
      message: "Genre must be at least 3 characters long.",
    });
  }

  if (price == null || isNaN(price) || price <= 0) {
    return res.status(400).json({
      status: "error",
      field: "price",
      message: "Price must be a number greater than 0.",
    });
  }

  if (inStock === "true") inStock = true;
  else if (inStock === "false") inStock = false;

  if (typeof inStock !== "boolean") {
    return res.status(400).json({
      status: "error",
      field: "inStock",
      message: "inStock should be either true or false.",
    });
  }
  req.body.inStock = inStock;

  if (!req.file) {
    return res.status(400).json({
      status: "error",
      field: "image",
      message: "Please upload an image.",
    });
  }

  next();
};
