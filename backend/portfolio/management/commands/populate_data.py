from django.core.management.base import BaseCommand
from portfolio.models import Profile, SocialLink, Project, TechStack

class Command(BaseCommand):
    help = 'Populate the database with sample portfolio data'

    def handle(self, *args, **options):
        # Create or get profile
        profile, created = Profile.objects.get_or_create(
            name="Pratik",
            defaults={
                'tagline': 'dev, analyst, designer, creator',
                'bio': "I'm a developer and analyst who loves turning tricky problems into clever solutions—whether it's models, dashboards, or full-on experiments. I thrive on learning, building, and the occasional debugging adventure.",
                'profile_image_url': './src/assets/mypic.png'  # Update this path
            }
        )

        # Create social links
        social_links_data = [
            {'platform': 'github', 'url': 'https://github.com/CodeBunny09', 'order': 1},
            {'platform': 'linkedin', 'url': 'https://linkedin.com/in/pratik-c', 'order': 2},
            {'platform': 'twitter', 'url': 'https://twitter.com/your-handle', 'order': 3},
            {'platform': 'blog', 'url': 'https://yourblog.com', 'order': 4},
        ]

        for link_data in social_links_data:
            SocialLink.objects.get_or_create(
                profile=profile,
                platform=link_data['platform'],
                defaults=link_data
            )

        # Create tech stack
        tech_data = [
            {'name': 'React', 'category': 'frontend', 'color': '#61DAFB'},
            {'name': 'Python', 'category': 'backend', 'color': '#3776AB'},
            {'name': 'TensorFlow', 'category': 'ml', 'color': '#FF6F00'},
            {'name': 'D3.js', 'category': 'frontend', 'color': '#F9A03C'},
            {'name': 'Node.js', 'category': 'backend', 'color': '#339933'},
            {'name': 'MongoDB', 'category': 'database', 'color': '#47A248'},
            {'name': 'Stripe', 'category': 'service', 'color': '#008CDD'},
            {'name': 'Pandas', 'category': 'data', 'color': '#150458'},
            {'name': 'Matplotlib', 'category': 'data', 'color': '#11557c'},
            {'name': 'SQL', 'category': 'database', 'color': '#336791'},
            {'name': 'Figma', 'category': 'design', 'color': '#F24E1E'},
        ]

        tech_objects = {}
        for tech in tech_data:
            tech_obj, created = TechStack.objects.get_or_create(
                name=tech['name'],
                defaults=tech
            )
            tech_objects[tech['name']] = tech_obj

        # Create sample projects
        projects_data = [
            {
                'title': 'AI Data Dashboard',
                'description': 'Interactive dashboard for analyzing ML model performance with real-time metrics.',
                'project_type': 'github',
                'github_url': 'https://github.com/yourusername/project1',
                'featured_image_url': '/assets/project1.png',
                'is_featured': True,
                'github_stars': 45,
                'github_forks': 12,
                'tech_stack': ['React', 'Python', 'TensorFlow', 'D3.js'],
                'order': 1
            },
            {
                'title': 'Market Analysis Report',
                'description': 'Emerging market trends using advanced statistical modeling and predictive analytics.',
                'project_type': 'linkedin',
                'linkedin_post_url': 'https://linkedin.com/posts/yourprofile/post1',
                'featured_image_url': '/assets/project2.png',
                'is_featured': True,
                'linkedin_likes': 156,
                'linkedin_comments': 23,
                'tech_stack': ['Python', 'Pandas', 'Matplotlib', 'SQL'],
                'order': 2
            },
            {
                'title': 'Full-Stack E-commerce',
                'description': 'E-commerce app with payments, inventory management, and analytics.',
                'project_type': 'github',
                'github_url': 'https://github.com/yourusername/project3',
                'featured_image_url': '/assets/project3.png',
                'is_featured': True,
                'github_stars': 78,
                'github_forks': 21,
                'tech_stack': ['Node.js', 'React', 'MongoDB', 'Stripe'],
                'order': 3
            },
            {
                'title': 'UX Design Case Study',
                'description': 'Mobile banking app redesign focused on accessibility and UX.',
                'project_type': 'linkedin',
                'linkedin_post_url': 'https://linkedin.com/posts/yourprofile/post2',
                'featured_image_url': '/assets/project4.png',
                'is_featured': True,
                'linkedin_likes': 89,
                'linkedin_comments': 15,
                'tech_stack': ['Figma'],
                'order': 4
            }
        ]

        for project_data in projects_data:
            tech_names = project_data.pop('tech_stack', [])
            project, created = Project.objects.get_or_create(
                title=project_data['title'],
                defaults=project_data
            )
            
            # Add tech stack
            for tech_name in tech_names:
                if tech_name in tech_objects:
                    project.tech_stack.add(tech_objects[tech_name])

        self.stdout.write(
            self.style.SUCCESS('Successfully populated portfolio data!')
        )