
import cookies from '@/utils/cookie'

const state = () => {
  return {
    user : null,
    token : 'tttsss'
  }
}

const getters = {
  userToken : state => {
    console.log( 'user state', state )
    return state.token
  }
}

const mutations = {
  SAVE_USER( state, userValue ) {
    state.user = userValue
  },
  SAVE_TOKEN( state, token ) {
    state.token = token
  },
  CLEAR_TOKEN( state ) {
    if ( process.client ) {
      cookies.clearAll()
    }
    state.token = ''
    state.token = null
  }
}

const actions = {
  setToken( { commit }, token ) {
    commit( 'SAVE_TOKEN', token )
  },
  getUserInfo( { commit }, token ) {
    return new Promise( ( resolve, reject ) => {
      resolve()
      // tokenLogin( payload )
      //   .then( response => {
      //     const { data, code } = response
      //     if ( !data || code !== 200 ) {
      //       reject( 'token登录失败' )
      //     }
      //     data.roles = ['admin']
      //     commit( 'SET_USER_INFO', data )
      //     resolve( data )
      //   } )
      //   .catch( error => {
      //     reject( error )
      //     // commit( 'CLEAR_USER_INFO' )
      //     // cookies.clearAll()
      //     // resetRouter()
      //   } )
    } )
  },
  loginOut( { commit } ) {
    return new Promise( resolve => {
      // commit( DELETE_USER_ID )
      commit( 'CLEAR_TOKEN' )
      resolve()
    } )
  }
}

export default {
  namespaced : true,
  state,
  actions,
  getters,
  mutations
}
