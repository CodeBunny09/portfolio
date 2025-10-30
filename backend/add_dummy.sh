#!/bin/bash

# Usage: bash populate_dummy_projects.sh

echo "Populating 100 dummy Project entries..."

export DJANGO_SETTINGS_MODULE=backend.settings

python3 manage.py shell <<EOF
import random
import uuid
from datetime import datetime, timedelta
from portfolio.models import Project, TechStack

# Pre-fetch existing tech stacks (safe for 0 techs)
all_techs = list(TechStack.objects.all())
tech_count = len(all_techs)

project_types = ['github', 'linkedin', 'personal', 'client']
statuses = ['active', 'completed', 'archived', 'draft']
demo_urls = [
    'https://demo1.com', 'https://demo2.com', 'https://projectshowcase.net',
    'https://sampleapp.org', 'https://mysite.dev'
]
github_urls = [
    'https://github.com/user/repo1', 'https://github.com/user/repo2',
    'https://github.com/user/repo3'
]
linkedin_urls = [
    'https://linkedin.com/posts/123', 'https://linkedin.com/posts/456'
]
project_urls = [
    'https://portfolio.com/p1', 'https://portfolio.com/p2', 'https://portfolio.com/p3'
]
titles = [
    'Project Alpha', 'Beta Site', 'Gamma App', 'Delta Panel', 'Epsilon Demo', 'Zeta Dashboard', 'Omega Tool', 'Lambda Widget'
]

for i in range(1, 101):
    t = random.choice(project_types)
    s = random.choice(statuses)
    title = f"{random.choice(titles)} #{i}"
    desc = f"Description for {title} - randomly generated project."
    long_desc = f"Long description for {title}. Lorem ipsum cactus cheese fudge salmon."
    
    # Randomize URL fields (make sure each is a valid URL or None/null)
    demo_url = random.choice(demo_urls) if random.random() < 0.6 else None
    github_url = random.choice(github_urls) if t == 'github' else None
    linkedin_post_url = random.choice(linkedin_urls) if t == 'linkedin' else None
    project_url = random.choice(project_urls) if t in ['personal', 'client'] else None
    
    github_stars = random.randint(0, 500) if t == 'github' else 0
    github_forks = random.randint(0, 100) if t == 'github' else 0
    linkedin_likes = random.randint(0, 300) if t == 'linkedin' else 0
    linkedin_comments = random.randint(0, 100) if t == 'linkedin' else 0
    is_feat = random.random() < 0.12   # ~12% featured
    is_vis = random.random() > 0.04    # ~4% invisible
    order = random.randint(0, 40)
    proj_date = datetime.today().date() - timedelta(days=random.randint(0, 700))

    p = Project.objects.create(
        title=title,
        description=desc,
        long_description=long_desc,
        project_type=t,
        status=s,
        project_url=project_url,
        github_url=github_url,
        demo_url=demo_url,
        linkedin_post_url=linkedin_post_url,
        github_stars=github_stars,
        github_forks=github_forks,
        linkedin_likes=linkedin_likes,
        linkedin_comments=linkedin_comments,
        is_featured=is_feat,
        is_visible=is_vis,
        order=order,
        project_date=proj_date
    )
    # Assign some random tech stacks for each project
    if tech_count and random.random() < 0.94:
        k = random.randint(1, min(6, tech_count))
        techs = random.sample(all_techs, k)
        p.tech_stack.set(techs)
    p.save()

print("Done generating 100 dummy projects.")
EOF

echo "Finished!"
