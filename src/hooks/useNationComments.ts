import { useEffect, useState, type FormEventHandler } from 'react';
import { Comment, createNationComment, getNationComments } from '@/client/api/nations';

export function useNationComments(nationId: string | null, isAuth: boolean) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [authorName, setAuthorName] = useState('');
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
    const trimmedAuthorName = isAuth ? 'Пользователь' : authorName.trim();

    if (!isAuth && !trimmedAuthorName) {
      setCommentError('Введите имя');
      return;
    }

    if (!trimmedComment) {
      setCommentError('Введите текст комментария');
      return;
    }

    setIsCommentSubmitting(true);
    setCommentError('');
    setCommentSuccess('');

    try {
      await createNationComment(currentNationId, trimmedComment, trimmedAuthorName);

      setCommentText('');
      setCommentSuccess('Комментарий отправлен');

      const refreshedComments = await getNationComments(currentNationId);
      setComments(refreshedComments);
    } catch (error) {
      setCommentError(error instanceof Error ? error.message : 'Не удалось отправить комментарий');
    } finally {
      setIsCommentSubmitting(false);
    }
  };

  return {
    comments,
    authorName,
    setAuthorName,
    commentText,
    setCommentText,
    commentError,
    commentSuccess,
    isLoadingComments,
    isCommentSubmitting,
    handleCommentSubmit,
  };
}
