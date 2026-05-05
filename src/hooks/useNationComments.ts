import { useEffect, useState, type FormEventHandler } from 'react';
import { Comment, createNationComment, getNationComments } from '@/client/api/nations';
import { authStorage } from '@/client/api/auth-storage';

export function useNationComments(nationId: string | null) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentText, setCommentText] = useState('');
  const [commentError, setCommentError] = useState('');
  const [commentSuccess, setCommentSuccess] = useState('');
  const [isLoadingComments, setIsLoadingComments] = useState(false);
  const [isCommentSubmitting, setIsCommentSubmitting] = useState(false);

  useEffect(() => {
    if (!nationId) {
      setComments([]);
      return;
    }

    const currentNationId = nationId;

    async function loadComments() {
      setIsLoadingComments(true);
      setCommentError('');
      setCommentSuccess('');

      try {
        const items = await getNationComments(currentNationId);
        setComments(items);
      } catch (error) {
        setCommentError(
          error instanceof Error ? error.message : 'Не удалось загрузить комментарии'
        );
      } finally {
        setIsLoadingComments(false);
      }
    }

    void loadComments();
  }, [nationId]);

  const handleCommentSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();

    if (!nationId) {
      return;
    }

    const currentNationId = nationId;
    const trimmedComment = commentText.trim();

    if (!trimmedComment) {
      return;
    }

    setIsCommentSubmitting(true);
    setCommentError('');
    setCommentSuccess('');

    try {
      const token = authStorage.getAccessToken() || undefined;

      await createNationComment(currentNationId, trimmedComment, token);

      setCommentText('');
      setCommentSuccess('Отправлено');

      setIsLoadingComments(true);

      const refreshedComments = await getNationComments(currentNationId);
      setComments(refreshedComments);
    } catch (error) {
      setCommentError(error instanceof Error ? error.message : 'Не удалось отправить комментарий');
    } finally {
      setIsCommentSubmitting(false);
      setIsLoadingComments(false);
    }
  };

  return {
    comments,
    commentText,
    setCommentText,
    commentError,
    commentSuccess,
    isLoadingComments,
    isCommentSubmitting,
    handleCommentSubmit,
  };
}
