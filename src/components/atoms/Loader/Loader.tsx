type LoaderProps = {
  text?: string;
  className?: string;
};

function Loader({ text = 'Загрузка...', className = 'page-loading' }: LoaderProps) {
  return <div className={className}>{text}</div>;
}

export default Loader;
