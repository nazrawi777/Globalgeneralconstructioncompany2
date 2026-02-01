import os
import sys

project_home = os.path.join(os.path.dirname(__file__), 'nazra_project')
if project_home not in sys.path:
    sys.path.insert(0, project_home)

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "nazra_project.settings")

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()