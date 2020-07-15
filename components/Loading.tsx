import * as React from 'react'

interface LoadingProps {
  root?: boolean
}

export function Loading({ root = false }: LoadingProps) {
  return (
    <div
      className={`spinner absolute left-1/2  -translate-x-1/2 ${
        root ? 'pt-32' : ' top-1/2 -translate-y-1/2'
      }`}
    >
      <div className="sk-wander">
        <div className="sk-wander-cube"></div>
        <div className="sk-wander-cube"></div>
        <div className="sk-wander-cube"></div>
        <div className="sk-wander-cube"></div>
      </div>
    </div>
  )
}
