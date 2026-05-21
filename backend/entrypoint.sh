#!/bin/sh
set -e

echo "▶ Waiting for Postgres at $POSTGRES_HOST:$POSTGRES_PORT…"
while ! nc -z "$POSTGRES_HOST" "$POSTGRES_PORT" 2>/dev/null; do
  sleep 0.5
done
echo "✓ Postgres is up."

echo "▶ Running migrations…"
python manage.py migrate --noinput

echo "▶ Collecting static…"
python manage.py collectstatic --noinput || true

echo "▶ Ensuring superuser exists…"
python manage.py shell <<'PY'
import os
from django.contrib.auth import get_user_model
User = get_user_model()
u = os.environ.get("DJANGO_SUPERUSER_USERNAME", "admin")
e = os.environ.get("DJANGO_SUPERUSER_EMAIL", "admin@example.com")
p = os.environ.get("DJANGO_SUPERUSER_PASSWORD", "admin12345")
if not User.objects.filter(username=u).exists():
    User.objects.create_superuser(username=u, email=e, password=p)
    print(f"✓ Created superuser '{u}'")
else:
    print(f"✓ Superuser '{u}' already exists")
PY

echo "▶ Starting server…"
exec "$@"
