import { Comment } from '@/client/api/nations';

type CommentCardProps = {
  comment: Comment;
};

function getCommentStatusText(status: Comment['status']) {
  if (status === 'approved') return 'Опубликовано';
  if (status === 'pending') return 'На модерации';
  if (status === 'rejected') return 'Отклонено';
  if (status === 'hidden') return 'Скрыто';

  return status;
}

function CommentCard({ comment }: CommentCardProps) {
  return (
    <div className="comment-card">
      <div className="comment-card__header">
        <span className="comment-card__author">Пользователь</span>
        <span className="comment-card__date">
          {new Date(comment.created_at).toLocaleDateString('ru-RU')}
        </span>
      </div>

      <p className="comment-card__text">{comment.text}</p>

      <span className="comment-card__status">{getCommentStatusText(comment.status)}</span>
    </div>
  );
}

export default CommentCard;
