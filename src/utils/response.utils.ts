export class BaseResponse {
  _success(message: string, data?: any): ResponseSuccess {
    return {
      status: 'Success',
      message: message,
      data: data ? data : {},
    };
  }

  _pagination(
    massage: string,
    data: any,
    total: number,
    page: number,
    pageSize: number,
  ): ResponsePagination {
    return {
      status: 'Success',
      message: massage,
      data: data,
      pagination: {
        total_page: total,
        page: page,
        pageSize: pageSize,
        total: Math.ceil(total / pageSize),
        nextPage: page + 1,
        previosPage: page - 1 === 0 ? 1 : page - 1,
      },
    };
  }
  _error(req:any) {
    return {
      req,
      error: 'Internal Server Error',
    };
  }
}
