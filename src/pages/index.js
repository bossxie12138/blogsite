import React from 'react'
import loadable from '@loadable/component'
import { Loading } from '../components'

const UiHome = loadable(() => import('./list'), {
	fallback: <Loading />
})

const NotFound = loadable(() => import('./404'), {
	fallback: <Loading />
})

const About = loadable(() => import('./about'), {
	fallback: <Loading />
})

const Archive = loadable(() => import('./archive'), {
	fallback: <Loading />
})

const Detail = loadable(() => import('./detail'), {
	fallback: <Loading />
})

const Login = loadable(() => import('./login'), {
	fallback: <Loading />
})

const UiCollect = loadable(() => import('./collection'), {
	fallback: <Loading />
})

const Register = loadable(() => import('./register'), {
	fallback: <Loading />
})

const UserInfo = loadable(() => import('./userinfo'), {
	fallback: <Loading />
})

const UserMsg = loadable(() => import('./message'), {
	fallback: <Loading />
})

export {
  UiHome,
  About,
  Archive,
  Detail,
  Login,
  UiCollect,
  Register,
  NotFound,
  UserInfo,
  UserMsg
}