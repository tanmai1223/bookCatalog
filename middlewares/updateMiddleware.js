export const validateUpdateBook = (req, res, next) => {
   if (!req.body || Object.keys(req.body).length === 0) {
  return res.status(400).json({
    status: "error",
    message: "Request body is missing. Please send user details."
  });
}


  const { title, author, genre, price, inStock } = req.body;

  if (title !== undefined && title.trim().length <= 2) {
    return res.status(400).json({
      status: "error",
      field: "title",
      message: "Title must be at least 3 characters long.",
    });
  }

  if (author !== undefined && author.trim().length <= 2) {
    return res.status(400).json({
      status: "error",
      field: "author",
      message: "Author must be at least 3 characters long.",
    });
  }

  if (genre !== undefined && genre.trim().length <= 2) {
    return res.status(400).json({
      status: "error",
      field: "genre",
      message: "Genre must be at least 3 characters long.",
    });
  }

  if (price !== undefined && (isNaN(price) || price <= 0)) {
    return res.status(400).json({
      status: "error",
      field: "price",
      message: "Price must be a number greater than 0.",
    });
  }

  if (inStock !== undefined) {
    if (inStock === "true") req.body.inStock = true;
    else if (inStock === "false") req.body.inStock = false;

    if (typeof req.body.inStock !== "boolean") {
      return res.status(400).json({
        status: "error",
        field: "inStock",
        message: "inStock should be either true or false.",
      });
    }
  }

  next();
};
