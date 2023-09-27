import React from 'react'
import { Redirect } from 'react-router-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Pro from '../views/pro'
import Master from '../views/master'
import Dev from '../views/dev'

type Props = {}

const index = (props: Props) => {
  return (
    <Switch>
      <Route path='/master' component={Master} />
      <Route path='/dev' component={Dev} />
      <Route path='/pro' component={Pro} />
      <Route path='/' render={() => <Master></Master>} />
    </Switch>
  )
}

export default index