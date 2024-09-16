 interface ResponseSuccess {
    status: string;
    message: string;
    data?: any;
}

interface ResponsePagination extends ResponseSuccess {
    pagination: {
        total: number,
        page: number,
        pageSize: number,
        totalPage: number
    }
}
