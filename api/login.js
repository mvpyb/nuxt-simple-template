
export function login( request, data ) {
  return request( {
    method : 'post',
    url : '/v1/searchArtRole',
    data
  } )
}
