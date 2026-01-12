import os
import re

TEMPLATE_DIR = "web/templates/web"


def update_file(filepath):
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    # Add {% load static %} if not present
    if "{% load static %}" not in content:
        content = "{% load static %}\n" + content

    # 1. Handle standard src/href with folders
    # Matches src="folder/..." or href="folder/..." or src="/folder/..."
    # Folders: assets, css, js, fonts, front
    pattern_standard = r'(src|href)=["\']/?(assets|css|js|fonts|front)/([^"\']+)["\']'

    def replace_standard(match):
        attr = match.group(1)
        folder = match.group(2)
        path = match.group(3)
        full_match = match.group(0)
        if "{% static" in full_match:
            return full_match
        return f"{attr}=\"{{% static '{folder}/{path}' %}}\""

    content = re.sub(pattern_standard, replace_standard, content)

    # 2. Handle url(...) in style attributes
    # Matches url(assets/...) or url('assets/...')
    pattern_url = r'url\([\'"]?/?(assets|css|js|fonts|front)/([^)\'"]+)[\'"]?\)'

    def replace_url(match):
        folder = match.group(1)
        path = match.group(2)
        full_match = match.group(0)
        if "{% static" in full_match:
            return full_match
        return f"url('{{% static '{folder}/{path}' %}}')"

    content = re.sub(pattern_url, replace_url, content)

    # 3. Handle specific blog files (moved to css/ and js/)
    # blog-style.css -> css/blog-style.css
    content = content.replace(
        'href="/blog-style.css"', "href=\"{% static 'css/blog-style.css' %}\""
    )
    content = content.replace(
        'href="blog-style.css"', "href=\"{% static 'css/blog-style.css' %}\""
    )

    # blog-script.js -> js/blog-script.js
    content = content.replace(
        'src="/blog-script.js"', "src=\"{% static 'js/blog-script.js' %}\""
    )
    content = content.replace(
        'src="blog-script.js"', "src=\"{% static 'js/blog-script.js' %}\""
    )

    with open(filepath, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Processed {filepath}")


def main():
    for root, dirs, files in os.walk(TEMPLATE_DIR):
        for file in files:
            if file.endswith(".html"):
                update_file(os.path.join(root, file))


if __name__ == "__main__":
    main()
