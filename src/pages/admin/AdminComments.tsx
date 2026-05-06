import { MOCK_COMMENTS, MOCK_NATIONS } from '@/client/api/nations.mock';
import './AdminPage.css';

function AdminComments() {
  const nationNameById = new Map(MOCK_NATIONS.map((nation) => [nation.id, nation.name]));
  const comments = Object.values(MOCK_COMMENTS).flat();

  return (
    <main className="admin-page">
      <section className="admin-hero">
        <p className="admin-kicker">Модерация</p>
        <h1 className="admin-title">Комментарии</h1>
        <p className="admin-text">
          MVP-раздел для просмотра пользовательских комментариев и их статусов.
        </p>
      </section>

      <section className="admin-table-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Народ</th>
              <th>Комментарий</th>
              <th>Дата</th>
              <th>Статус</th>
            </tr>
          </thead>
          <tbody>
            {comments.map((comment) => (
              <tr key={comment.id}>
                <td>{nationNameById.get(comment.nation_id) || comment.nation_id}</td>
                <td>{comment.text}</td>
                <td>{new Date(comment.created_at).toLocaleDateString('ru-RU')}</td>
                <td>
                  <span className="admin-status">{comment.status}</span>
                </td>
              </tr>
            ))}
            {comments.length === 0 && (
              <tr>
                <td colSpan={4}>Комментариев пока нет.</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </main>
  );
}

export default AdminComments;
