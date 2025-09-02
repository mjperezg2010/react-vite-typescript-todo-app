interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

function LoadingButton({ loading, children, ...props }: LoadingButtonProps) {
  return (
    <button {...props} disabled={loading || props.disabled}>
      {loading ? (
        <span className="loading loading-spinner mr-2"></span>
      ) : null}
      {children}
    </button>
  );
}

export {LoadingButton}