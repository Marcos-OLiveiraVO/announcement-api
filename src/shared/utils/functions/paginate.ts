export function paginationSkipItens(page: number, limitPerPage: number) {
  return (page - 1) * limitPerPage;
}

export function paginate(totalRecords: number, limit: number) {
  return Math.ceil(totalRecords / limit);
}
