class QueryBuilder {
  constructor() {
    this.query = null;
  }

  buildQuery(values) {
    this.query = values;
    let queryText = '';

    const pagination = this.paginationBuilder();
    const filter = this.filterBuilder();
    const order = this.sorterBuilder();

    queryText += `${pagination}${filter}${order}`;

    return queryText;
  }

  paginationBuilder() {
    let { skip } = this.query;
    const { take } = this.query;

    if (skip !== 0) {
      skip -= 1;
    }

    skip *= 10;

    return `skip=${skip}&take=${take}`;
  }

  filterBuilder() {
    const { filter } = this.query;

    if (!filter) {
      return '';
    }

    let queryText = '';

    Object.keys(filter).forEach((item) => {
      if (
        filter[item].operator !== undefined &&
        filter[item].value !== undefined
      ) {
        queryText += `&filter=${filter[item].key}._${filter[item].operator}.${filter[item].value}`;
      }
    });

    return queryText;
  }

  sorterBuilder() {
    const { order } = this.query;

    if (!order || !order.operator) {
      return '';
    }

    return `&sort=${order.name},${
      order.operator === 'ascend' ? 'ASC' : 'DESC'
    }`;
  }
}

const instanceBuilder = new QueryBuilder();
export { instanceBuilder as QueryBuilder };
