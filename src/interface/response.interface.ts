 interface ResponseSuccess {
    status: string;
    message: string;
    data?: any;
}

interface ResponsePagination extends ResponseSuccess {
    pagination: {
        total_page: number,
        page: number,
        pageSize: number,
        total: number,
        nextPage: number,
        previosPage: number
    }
}

interface ResponseError {
    req?:any
    error: string
}
