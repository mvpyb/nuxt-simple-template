import Vue from 'vue'
import svgIcon from '../components/svgIcon'

Vue.component( svgIcon.name, svgIcon )

const req = require.context( '../assets/icons/svg/', false, /\.svg$/ )
const requireAll = requireContext => requireContext.keys().map( requireContext )
requireAll( req )
