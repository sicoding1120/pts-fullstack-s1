export  class BaseResponse {
    _success(message:string, data?:any): ResponseSuccess {
        return {
            status: "ok",
            message: message,
            data: data
        }
    }

    _pagination(massage:string, data:any,total:number, page:number, pageSize:number): ResponsePagination {
        return {
            status: "ok",
            message: massage,
            data: data,
            pagination: {
                total: total,
                page: page,
                pageSize: pageSize,
                totalPage : Math.ceil(total / pageSize)
            }
        }
    }
}
