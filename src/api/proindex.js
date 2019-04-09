import _request from '@/libs/request'

export function getProindex () {
  return _request.get('proindex')
}
