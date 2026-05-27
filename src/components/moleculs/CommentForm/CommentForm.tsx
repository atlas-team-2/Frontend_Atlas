import { FormEvent } from 'react';

type CommentFormProps = {
  isAuth: boolean;
  authorName: string;
  commentText: string;
  onAuthorNameChange: (value: string) => void;
  onCommentTextChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  commentError: string;
  commentSuccess: string;
  isCommentSubmitting: boolean;
};

function CommentForm({
  isAuth,
  authorName,
  commentText,
  onAuthorNameChange,
  onCommentTextChange,
  onSubmit,
  commentError,
  commentSuccess,
  isCommentSubmitting,
}: CommentFormProps) {
  return (
    <form className="comments-block__form" onSubmit={onSubmit}>
      {!isAuth && (
        <input
          className="comments-block__input"
          type="text"
          placeholder="Ваше имя"
          value={authorName}
          onChange={(event) => onAuthorNameChange(event.target.value)}
          disabled={isCommentSubmitting}
        />
      )}

      <textarea
        className="comments-block__textarea"
        placeholder="Оставьте комментарий"
        value={commentText}
        onChange={(event) => onCommentTextChange(event.target.value)}
        disabled={isCommentSubmitting}
      />

      {commentError && <p className="comments-block__error">{commentError}</p>}

      <div className="comments-block__actions">
        <button className="comments-block__submit" type="submit" disabled={isCommentSubmitting}>
          {isCommentSubmitting ? 'Отправка...' : 'Отправить'}
        </button>
      </div>
    </form>
  );
}

export default CommentForm;
