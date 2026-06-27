interface SectionTitleProps {
  title: string
  subtitle?: string
  children?: React.ReactNode
  align?: 'left' | 'center'
}

export default function SectionTitle({ 
  title, 
  subtitle, 
  children, 
  align = 'center' 
}: SectionTitleProps) {
  return (
    <div className={`text-${align} max-w-3xl mx-auto mb-12`}>
      {subtitle && (
        <span className="text-primary font-semibold text-sm tracking-wider uppercase">
          {subtitle}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold text-navy-900 mt-2 mb-4">
        {title}
      </h2>
      {children && (
        <p className="text-lg text-navy-900/70">{children}</p>
      )}
    </div>
  )
}