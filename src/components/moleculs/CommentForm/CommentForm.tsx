import { FormEvent } from 'react';

type CommentFormProps = {
  commentText: string;
  onCommentTextChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  commentError: string;
  commentSuccess: string;
  isCommentSubmitting: boolean;
};

function CommentForm({
  commentText,
  onCommentTextChange,
  onSubmit,
  commentError,
  commentSuccess,
  isCommentSubmitting,
}: CommentFormProps) {
  return (
    <form className="comments-block__form" onSubmit={onSubmit}>
      <textarea
        className="comments-block__textarea"
        placeholder="Поделитесь впечатлениями или историей..."
        value={commentText}
        onChange={(event) => onCommentTextChange(event.target.value)}
        disabled={isCommentSubmitting}
      />

      {commentError && <p className="comments-block__error">{commentError}</p>}
      {commentSuccess && <p className="comments-block__success">{commentSuccess}</p>}

      <div className="comments-block__actions">
        <p className="comments-block__hint">Комментарий будет опубликован после модерации</p>

        <button className="comments-block__submit" type="submit" disabled={isCommentSubmitting}>
          {isCommentSubmitting ? 'Отправка...' : 'Отправить'}
        </button>
      </div>
    </form>
  );
}

export default CommentForm;
