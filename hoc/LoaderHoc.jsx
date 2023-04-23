import Loader from '@/components/Loader'
import React, { Suspense } from 'react'

const LoaderHoc = ({Component}) => {
  return (
    <Suspense fallback={<Loader/>}>
    <Component/>
    </Suspense>
  )
}

export default LoaderHoc