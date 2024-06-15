import HttpRequest from '../request/request'

/**
 * Util to make similar request together
 */
class RequestUtil {
  getQueue = {} // { url: { controller, request } }
  postQueue = {}
  deleteQueue = {}
  putQueue = {}
  async get(url) {
    const existedRequest = this.getQueue[url]
    if (existedRequest !== undefined) {
      existedRequest.controller.abort()
      console.log('Cancelling privious request, url: ', url)
      delete this.getQueue[url]
    }
    this.getQueue[url] = {}
    const controller = new AbortController()
    this.getQueue[url].controller = controller

    const request = await HttpRequest.get(url, controller.signal)
    this.getQueue[url].request = request
    return request
  }
  async post(url, data) {
    const existedRequest = this.postQueue[url]
    if (existedRequest !== undefined) {
      existedRequest.controller.abort()
      console.log('Cancelling privious request, url: ', url)
      delete this.postQueue[url]
    }
    this.postQueue[url] = {}
    const controller = new AbortController()
    this.postQueue[url].controller = controller

    try {
      const request = await HttpRequest.post(url, data, controller.signal)
      this.postQueue[url].request = request
      return request
    } catch (e) {
      return false
    }

  }
  async delete(url) {
    const existedRequest = this.deleteQueue[url]
    if (existedRequest !== undefined) {
      existedRequest.controller.abort()
      console.log('Cancelling privious request, url: ', url)
      delete this.deleteQueue[url]
    }
    this.deleteQueue[url] = {}
    const controller = new AbortController()
    this.deleteQueue[url].controller = controller

    try {
      const request = await HttpRequest.delete(url, controller.signal)
      this.deleteQueue[url].request = request
      return request
    } catch (e) {
      return false
    }

  }

  async put(url, body) {
    const existedRequest = this.putQueue[url]
    if (existedRequest !== undefined) {
      existedRequest.controller.abort()
      console.log('Cancelling privious request, url: ', url)
      delete this.putQueue[url]
    }
    this.putQueue[url] = {}
    const controller = new AbortController()
    this.putQueue[url].controller = controller
    try {
      const request = await HttpRequest.put(url, body, controller.signal)
      this.putQueue[url].request = request
      return request
    } catch (e) {
      return false
    }
  }
}

const requestUtil = new RequestUtil()
export default requestUtil
