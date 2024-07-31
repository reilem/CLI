import ky from 'ky'
import { defaultApiHost } from './utils'

export function track(event: string, data: Record<string, string | number | boolean>) {
  console.log('track', event, data)
  // send event to backend defaultApiHost + '/private/track'
  return ky
    .post(`${defaultApiHost}/private/track`, {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        event,
        data,
      }),
    })
    .then(res => res.json())
    .catch((err) => {
      console.error('Cannot track', err)
      return Promise.reject(err)
    })
}
