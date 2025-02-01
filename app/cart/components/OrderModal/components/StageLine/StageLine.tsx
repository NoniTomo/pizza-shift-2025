import React from 'react'

export interface StageLineProps {
  className: string
}

export function StageLine({ className }: StageLineProps) {
  return (
    <div className="w-full h-2 rounded-xl bg-secondary flex flex-row max-w-[600px]">
      <span className={`h-full bg-primary rounded-xl ${className}`}></span>
    </div>
  )
}
