export const BaseResponse = <T>(): RootResponse<T> => {
  return {
    value: null!,
    isSuccess: true,
    message: "",
  }
}

export const BaseResponseWithPagination = <T>(): RootResponse<Pagination<T>> => {
  return {
    value: {
      items: [],
      totalItems: 0,
      pageNumber: 1,
      pageSize: 10,
      hasNext: false,
    },
    isSuccess: true,
    message: "",
  }
}
