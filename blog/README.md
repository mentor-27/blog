### Области хранения данных:

- БД на json-server
- BFF
- Redux store

### Сущности приложения:

- пользователь: **DB** (список пользователей), **BFF** (сессия текущего пользователя), **Redux store** (отображение в браузере)
- роль пользователя: **DB** (список ролей), **BFF** (сессия текущего пользователя), **Redux store** (использование на клиенте)
- статья: **DB** (список статей), **Redux store** (отображение в браузере)
- комментарий: **DB** (список комментариев), **Redux store** (отображение в браузере)

### Таблицы БД:

- пользователи - **users**: *id* / *login* / *password* / *reg_date* / *role_id*
- роли - **roles**: *id* / *name*
- статьи - **posts**: *id* / *title* / *img_url* / *content* / *pub_date*
- комментарии - **comments**: *id* / *author_id* / *post_id* / *content*

### Схема состояиния на BFF:

- сессия текущего пользователя: *hash* / *login* / *passord* / *role*

### Схема для Redux store (на клиенте):

- **user**: *id* / *login*
- **posts[]**: **post**: *id* / *title* / *img_url* / *pub_date* / *comments_num*
- **post**: *id* / *title* / *img_url* / *content* / *pub_date* / **comments[]**: **comment**: *id* / *author* / *content* / *pub_date*
- **users[]**: **user**: *id* / *login* / *reg_date* / *role* (не использовался)
