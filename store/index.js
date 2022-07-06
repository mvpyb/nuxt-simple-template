
import test from './modules/test'
import user from './modules/user'
const cookieparser = require( 'cookieparser' )

export const state = () => ( {
  roles : [] // [ 'admin', 'user' ]
} )

export const getters = {
  roles : state => state.roles
}

export const mutations = {

}
export const actions = {
  async nuxtServerInit( { commit, dispatch }, payload ) {
    const { req } = payload
    if ( req.headers.cookie ) {
      const parse = cookieparser.parse( req.headers.cookie )
      const token = parse['fat_portal_token']
      dispatch( 'user/setToken', token )
    }
  }
}

export const modules = {
  test, user
}
