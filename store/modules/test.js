
import { randomString } from '@/utils/utils'

const state = () => {
  return {
    // 测试信息
    info : {
      headTitle : '标题',
      headKeywords : '关键词',
      headDesc : '描述'
    }
  }
}

const mutations = {
  SET_TEST_INFO( state, info = {} ) {
    state.info = info
  }
}

const actions = {
  /**
   * 获取信息
   */
  getTestInfo : ( { dispatch, commit }, payload ) => {
    return new Promise( ( resolve, reject ) => {
      const str = randomString( 10 )
      const { headTitle, headKeywords, headDesc } = payload
      const result = {
        headTitle : `${headTitle}${str}`,
        headKeywords : `${headKeywords}${str}`,
        headDesc : `${headDesc}${str}`
      }

      commit( 'SET_TEST_INFO', result )
      if ( !headTitle || !headKeywords || !headDesc ) {
        reject( result )
      } else {
        resolve( result )
      }
    } )
  }
}

export default {
  namespaced : true,
  state,
  actions,
  mutations
}
