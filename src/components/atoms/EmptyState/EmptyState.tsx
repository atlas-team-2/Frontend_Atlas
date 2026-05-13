type EmptyStateProps = {
  title: string;
  text?: string;
};

function EmptyState({ title, text }: EmptyStateProps) {
  return (
    <div className="page-empty">
      <h3 className="page-empty__title">{title}</h3>
      {text && <p className="page-empty__text">{text}</p>}
    </div>
  );
}

export default EmptyState;
