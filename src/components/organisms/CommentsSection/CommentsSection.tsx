import { Comment, FormEvent } from 'react';

interface CommentsSectionProps {
  isAuth: boolean;
  canWriteComment: boolean;
  comments: Comment[];
  isLoadingComments: boolean;
  commentText: string;
  onCommentTextChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  commentError: string;
  commentSuccess: string;
  isCommentSubmitting: boolean;
}

function CommentsSection({
  isAuth,
  canWriteComment,
  comments,
  isLoadingComments,
  commentText,
  onCommentTextChange,
  onSubmit,
  commentError,
  commentSuccess,
  isCommentSubmitting,
}: CommentsSectionProps) {
  return (
    <section className="nation-section">
      <div className="nation-section__header">
        <h2 className="nation-section__title">Комментарии</h2>
      </div>

      <div className="nation-section__content">
        <div className="comments-block">
          {isAuth && canWriteComment ? (
            <form className="comments-block__form" onSubmit={onSubmit}>
              <textarea
                className="comments-block__textarea"
                placeholder="Поделитесь впечатлениями или историей..."
                value={commentText}
                onChange={(e) => onCommentTextChange(e.target.value)}
                disabled={isCommentSubmitting}
              />

              {commentError && <p className="comments-block__error">{commentError}</p>}
              {commentSuccess && <p className="comments-block__success">{commentSuccess}</p>}

              <div className="comments-block__actions">
                <p className="comments-block__hint">
                  Комментарий будет опубликован после модерации
                </p>
                <button
                  className="comments-block__submit"
                  type="submit"
                  disabled={isCommentSubmitting}
                >
                  {isCommentSubmitting ? 'Отправка...' : 'Отправить'}
                </button>
              </div>
            </form>
          ) : (
            <div className="comments-block__login-note">
              Войдите в аккаунт, чтобы оставить комментарий.
            </div>
          )}

          <div className="comments-list">
            {isLoadingComments ? (
              <div className="comments-loading">Загружаем комментарии...</div>
            ) : comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id} className="comment-card">
                  <div className="comment-card__header">
                    <span className="comment-card__author">Пользователь</span>
                    <span className="comment-card__date">
                      {new Date(comment.created_at).toLocaleDateString('ru-RU')}
                    </span>
                  </div>
                  <p className="comment-card__text">{comment.text}</p>
                  <span className="comment-card__status">
                    {comment.status === 'approved'
                      ? 'Опубликовано'
                      : comment.status === 'pending'
                        ? 'На модерации'
                        : comment.status}
                  </span>
                </div>
              ))
            ) : (
              <div className="page-empty">
                <h3 className="page-empty__title">Комментариев пока нет</h3>
                <p className="page-empty__text">Станьте первым, кто поделится впечатлениями.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CommentsSection;
