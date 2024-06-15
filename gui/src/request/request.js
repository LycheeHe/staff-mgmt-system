const { info, error, log } = console

const requestQueue = [] // save request

const requestFn = async (url, options) => {
  info('requesting ')
  const response = await fetch(url, options)
  if (!response.ok) {
    error(`got http request error, ${response}`)
    throw new Error(response.statusText || '')
  }
  const json = await response.json()
  info(`got response sucessfully`)
  if (options.method === 'GET') return json
  // if (json.code === 200 && !url.includes('auth')) return json.data
  return json.code === 200
}

export default class HttpRequest {
  static async get(url, signal) {
    return await requestFn(url, { method: 'GET', signal })
  }
  static async post(url, body, signal) {
    const headers = new Headers()
    headers.set('Content-Type', 'application/json')
    const isToAuth = url.includes('auth')
    if (isToAuth) {
      headers.set('Authorization', body)
    }
    const options = {
      method: 'POST',
      headers,
      signal,
      body: isToAuth ? undefined : JSON.stringify(body)
    }
    return await requestFn(url, options)
  }
  static async delete(url) {
    const options = {
      method: 'DELETE',
    }
    return await requestFn(url, options)
  }
  static async put(url, data, signal) {
    const options = {
      method: 'PUT',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
      signal
    }
    return await requestFn(url, options)
  }
}