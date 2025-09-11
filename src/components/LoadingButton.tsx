interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  spinnerClassName?: string;
  variant?: 'default' | 'icon';
  hideChildrenWhenLoading?: boolean;
}

function LoadingButton({ loading, spinnerClassName, variant = 'default', hideChildrenWhenLoading, children, ...props }: LoadingButtonProps) {
  const spinnerClass =
    spinnerClassName ??
    (variant === 'icon'
      ? 'loading loading-spinner loading-xs'
      : 'loading loading-spinner mr-2');

  const overlay = (hideChildrenWhenLoading ?? (variant === 'icon'));

  return (
    <button {...props} disabled={loading || props.disabled} className={`relative inline-flex items-center ${props.className ?? ''}`}>
      {loading && overlay && (
        <span className="absolute inset-0 flex items-center justify-center">
          <span className={spinnerClass}></span>
        </span>
      )}
      {loading && !overlay && (
        <span className={spinnerClass}></span>
      )}
      <span className={loading && overlay ? 'invisible' : ''}>
        {children}
      </span>
    </button>
  );
}

export {LoadingButton}