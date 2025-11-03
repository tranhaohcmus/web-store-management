/**
 * Standard success response
 */
const successResponse = (
  res,
  message,
  data = null,
  meta = null,
  statusCode = 200
) => {
  const response = {
    success: true,
    message,
  };

  if (data !== null) {
    response.data = data;
  }

  if (meta !== null) {
    response.meta = meta;
  }

  return res.status(statusCode).json(response);
};

/**
 * Standard error response
 */
const errorResponse = (res, message, errors = null, statusCode = 400) => {
  const response = {
    success: false,
    message,
  };

  if (errors) {
    response.errors = errors;
  }

  return res.status(statusCode).json(response);
};

/**
 * Pagination metadata
 */
const getPaginationMeta = (page, limit, total) => {
  return {
    page: parseInt(page),
    limit: parseInt(limit),
    total,
    totalPages: Math.ceil(total / limit),
  };
};

module.exports = {
  successResponse,
  errorResponse,
  getPaginationMeta,
};
