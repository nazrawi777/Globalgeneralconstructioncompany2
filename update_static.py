import os
import re

TEMPLATE_DIR = "web/templates/web"


def update_file(filepath):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # Add {% load static %} if not present
    if "{% load static %}" not in content:
        content = "{% load static %}\n" + content

    # Regex to find static links
    # Matches src="folder/..." or href="folder/..."
    # Folders: assets, css, js, fonts, front
    pattern = r'(src|href)=["\'](assets|css|js|fonts|front)/([^"\']+)["\']'

    def replace_match(match):
        attr = match.group(1)
        folder = match.group(2)
        path = match.group(3)
        return f"{attr}=\"{{% static '{folder}/{path}' %}}\""

    new_content = re.sub(pattern, replace_match, content)

    if new_content != content:
        with open(filepath, "w", encoding="utf-8") as f:
            f.write(new_content)
        print(f"Updated {filepath}")
    else:
        print(f"No changes in {filepath}")


def main():
    for root, dirs, files in os.walk(TEMPLATE_DIR):
        for file in files:
            if file.endswith(".html"):
                update_file(os.path.join(root, file))


if __name__ == "__main__":
    main()
