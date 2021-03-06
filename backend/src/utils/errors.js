module.exports = {
  required: field => `ERR_VALID_REQUIRED_${field}`,
  max: (length, field) => `ERR_VALID_MAX_${length}_CHARACTER_${field}`,
  min: (length, field) => `ERR_VALID_MIN_${length}_CHARACTER_${field}`,
};
