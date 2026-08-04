export default function GradientFlowText({ children, className = '' }) {
  return (
    <span className={`gradient-flow-text animate-gradient-flow ${className}`}>
      {children}
    </span>
  )
}
