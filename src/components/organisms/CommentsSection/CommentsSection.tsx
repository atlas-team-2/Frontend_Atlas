import { FormEvent } from 'react';
import { Comment } from '@/client/api/nations';
import Loader from '@/components/atoms/Loader/Loader';
import EmptyState from '@/components/atoms/EmptyState/EmptyState';
import CommentCard from '@/components/moleculs/CommentCard/CommentCard';
import CommentForm from '@/components/moleculs/CommentForm/CommentForm';

interface CommentsSectionProps {
  isAuth: boolean;
  comments: Comment[];
  isLoadingComments: boolean;
  authorName: string;
  commentText: string;
  onAuthorNameChange: (value: string) => void;
  onCommentTextChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  commentError: string;
  commentSuccess: string;
  isCommentSubmitting: boolean;
}

function CommentsSection({
  isAuth,
  comments,
  isLoadingComments,
  authorName,
  commentText,
  onAuthorNameChange,
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
          <CommentForm
            isAuth={isAuth}
            authorName={authorName}
            commentText={commentText}
            onAuthorNameChange={onAuthorNameChange}
            onCommentTextChange={onCommentTextChange}
            onSubmit={onSubmit}
            commentError={commentError}
            commentSuccess={commentSuccess}
            isCommentSubmitting={isCommentSubmitting}
          />

          <div className="comments-list">
            {isLoadingComments ? (
              <Loader text="Загружаем комментарии..." className="comments-loading" />
            ) : comments.length > 0 ? (
              comments.map((comment) => <CommentCard key={comment.id} comment={comment} />)
            ) : (
              <EmptyState
                title="Комментариев пока нет"
                text="Станьте первым, кто поделится впечатлениями."
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CommentsSection;
