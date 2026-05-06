import './AdminPage.css';

const users = [
  { id: '1', email: 'admin@example.com', role: 'Администратор', status: 'active' },
  { id: '2', email: 'moderator@example.com', role: 'Модератор', status: 'active' },
  { id: '3', email: 'user@example.com', role: 'Пользователь', status: 'active' },
];

function AdminUser() {
  return (
    <main className="admin-page">
      <section className="admin-hero">
        <p className="admin-kicker">Пользователи</p>
        <h1 className="admin-title">Управление пользователями</h1>
        <p className="admin-text">MVP-раздел.</p>
      </section>

      <section className="admin-table-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>Роль</th>
              <th>Статус</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <span className="admin-status">{user.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </main>
  );
}

export default AdminUser;
