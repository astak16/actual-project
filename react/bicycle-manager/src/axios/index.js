import JsonP from 'jsonp'

export class Axios {
  static jsonP(options) {
    console.log(options)
    return new Promise((resolve, reject) => {
      JsonP(options.url, {
        param: 'callback',
      }, (err, resposne) => {
        if (resposne.status === 'success') {
          resolve(resposne)
        } else {
          reject(resposne.message)
        }
      })
    })
  }
}
