type PageErrorProps = {
  message: string;
};

function PageError({ message }: PageErrorProps) {
  if (!message) {
    return null;
  }

  return <div className="page-error">{message}</div>;
}

export default PageError;
