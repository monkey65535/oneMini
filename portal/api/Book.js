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