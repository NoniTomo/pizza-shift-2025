export interface MainProps {
  children: React.ReactNode
  className?: string
}

export function Main({ children, className }: MainProps) {
  return (
    <div className="flex flex-col items-center">
      <div
        className={`relative w-full p-5 sm:w-[600px] md:w-[700px] lg:w-[900px] xl:w-[1000px] 2xl:w-[1200px] ${className}`}
      >
        {children}
      </div>
    </div>
  )
}
