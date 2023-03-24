import React, { lazy, Suspense, useState } from 'react'
import Class from './components/Class'
import bigImg from '@/assets/imgs/22kb.png'
import { Demo1, Demo2 } from '@/components'
import './App.less'
const LazyDemo = lazy(() => import('@/components/LazyDemo')) // 使用import语法配合react的Lazy动态引入资源
type Props = {}

const App = (props: Props) => {
    const [count, setCounts] = useState('')
    const [show, setShow] = useState(false)
    const onChange = (e: any) => {
        setCounts(e.target.value)
    }
    // 点击事件中动态引入css, 设置show为true
    const onClick = () => {
        // import('./app.css')
        setShow(true)
    }
    return (
        <>
            <h2 onClick={onClick}>展示</h2>
            {/* show为true时加载LazyDemo组件 */}
            {show && <Suspense fallback={null}><LazyDemo /></Suspense>}
        </>
    )
}

export default App