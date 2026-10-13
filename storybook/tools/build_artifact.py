"""Build artifact.html: index.html without its document wrapper, for publishing as a claude.ai Artifact
(the Artifact tool adds the doctype, head and body). Run after editing index.html:
    python tools/build_artifact.py
"""
import os, re
SB = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
h = open(os.path.join(SB, "index.html"), encoding="utf-8").read()
head = re.search(r"<head>(.*?)</head>", h, re.S).group(1)
body = re.search(r"<body>(.*?)</body>", h, re.S).group(1)
head = re.sub(r'\s*<meta (charset|name="viewport")[^>]*>', "", head)
title = re.search(r"<title>.*?</title>", head).group(0)
head = head.replace(title, "")
open(os.path.join(SB, "artifact.html"), "w", encoding="utf-8").write(title + "\n" + head.strip() + "\n" + body.strip() + "\n")
print("wrote artifact.html")
