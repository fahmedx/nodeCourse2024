SELECT * FROM nodemysql.users;

DELETE FROM nodemysql.users  WHERE nodemysql.users.id IS NOT NULL;

COMMIT;