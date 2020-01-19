import {
  HTTPRequest
} from '../utils/request.js'


export function getHotBooks() {
  return HTTPRequest({
    method: "GET",
    url: "api/book/hotbook"
  })
}

export function serachBook(bookname, start = 0, count = 20, summary = 1) {
  return HTTPRequest({
    method: "post",
    url: "api/book/search",
    params: {
      bookname,
      start,
      count,
      summary
    }
  })
}

export function getBookDetail(id) {
  if (!id) {
    return Promise.reject('请传入书籍ID')
  }
  return HTTPRequest({
    method: "GET",
    url: `api/book/bookdetail/${id}`
  })
}

// 获取我喜欢的书籍
export function loveBooks() {
  return HTTPRequest({
    method: "post",
    url: "api/book/mybook"
  })
}