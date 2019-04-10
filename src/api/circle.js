import _request from '@/libs/request'

export function getCircleData ({ indexName, circle = '1hour' }) {
  return _request.get('proindex/circle', {
    index_name: indexName,
    circle
  })
}
