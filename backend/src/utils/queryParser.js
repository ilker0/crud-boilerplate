const {
	Not,
	LessThan,
	MoreThan,
	LessThanOrEqual,
	MoreThanOrEqual,
	Equal,
	Like,
	Between,
	In,
	Any,
	IsNull,
} = require('typeorm');

// @Todo Filter, Sort, Pagination
class QueryParser {
	constructor() {
		this.requestQuery = null;
	}

	parseQuery(query) {
		this.requestQuery = query;
		const queryObject = {};

		const whereResult = this.filterParser();
		const orderResult = this.sortParser();

		if (whereResult) {
			queryObject.where = whereResult;
		}

		if (orderResult) {
			queryObject.order = orderResult;
		}

		queryObject.skip = this.skipParser();
		queryObject.take = this.takeParser();

		return queryObject;
	}

	sortParser() {
		const { sort } = this.requestQuery;

		if (!sort) {
			return null;
		}

		const sortObject = {};

		if (Array.isArray(sort)) {
			sort.forEach(item => {
				const splitedItem = item.split(',');
				sortObject[splitedItem[0]] = splitedItem[1] || 'ASC';
			});
		} else {
			const splitedItem = sort.split(',');
			sortObject[splitedItem[0]] = splitedItem[1] || 'ASC';
		}

		return sortObject;
	}

	skipParser() {
		const { skip } = this.requestQuery;
		const skipValue = Number(skip);

		if (!skip || isNaN(skipValue) || !Number.isInteger(skipValue)) {
			return 0;
		}

		return skipValue;
	}

	takeParser() {
		const { take } = this.requestQuery;
		const takeValue = Number(take);

		if (!take || isNaN(takeValue) || !Number.isInteger(takeValue)) {
			return 10;
		}

		return takeValue;
	}

	getFilterCondition(value, condition) {
		if (condition === '_in' || condition === '_any' || condition === '_between') {
			value = value.split(',');
		}

		const conditions = {
			_not: Not(value),
			_lthan: LessThan(value),
			_mthan: MoreThan(value),
			_lthane: LessThanOrEqual(value),
			_mthane: MoreThanOrEqual(value),
			_equal: Equal(value),
			_like: Like(`%${value}%`),
			_start: Like(`${value}%`),
			_end: Like(`%${value}`),
			_between: Between(...value),
			_in: In(value),
			_any: Any(value),
			_isnull: IsNull(value),
			_notin: Not(In(value)),
			_notnull: Not(IsNull()),
			_notequal: Not(Equal(value)),
		};

		return conditions[condition];
	}

	filterParser() {
		const { filter } = this.requestQuery;
		const filterObject = null;

		if (!filter) {
			return false;
		}

		filterObject = {};

		if (Array.isArray(filter)) {
			filter.forEach(item => {
				const splitedItem = item.split('.');
				filterObject[splitedItem[0]] = this.getFilterCondition(splitedItem[2], splitedItem[1]);
			});
		} else {
			const splitedItem = filter.split('.');
			filterObject[splitedItem[0]] = this.getFilterCondition(splitedItem[2], splitedItem[1]);
		}

		return filterObject;
	}
}

module.exports = new QueryParser();
