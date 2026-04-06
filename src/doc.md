### Plan and helper for verstka action:

1. **Роутинг по пользовательским сценариям:**
   - `/` → Карта России (Татарстан выделен)
   - `/peoples` → Список народов
   - `/peoples/:id` → Визуальный профиль народа
   - `/auth/login` → Вход по email
   - `/admin/*` → Админ-панель (модерация, пользователи)
   - `*` → страница ошибки

2. **Защита роутов:**
   - `/admin` доступен только роли `admin`
   - Форма комментариев видна только авторизованным
   - Нет публичной регистрации

3. **Atomic Design:**
   - `atoms/` → Button, Input, Typography
   - `molecules/` → CommentForm, PeopleCard, AvatarPair
   - `organisms/` → RussiaMap, PeopleProfile, CommentsBlock
