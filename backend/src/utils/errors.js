module.exports = {
	required: field => `ERR_VALID_REQUIRED_${field}`,
	max: (length, field) => `ERR_VALID_MAX_${length}_CHARACTER_${field}`,
	min: (length, field) => `ERR_VALID_MIN_${length}_CHARACTER_${field}`,
	notFound: field => `ERR_NOT_FOUND_${field}`,
	wrong: field => `ERR_WRONG_${field}`,
	blocked: field => `ERR_BLOCKED_${field}`,
	alreadyHave: field => `ERR_ALREADY_HAVE_${field}`,
	invalid: field => `ERR_INVALID_${field}`,
	notMatch: field => `ERR_NOT_MATCH_${field}`,
};
