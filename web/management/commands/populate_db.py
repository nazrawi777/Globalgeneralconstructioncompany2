from django.core.management.base import BaseCommand
from web.models import (
    HomeSlider,
    Service,
    AboutTeam,
    Testimonial,
    Project,
    BlogPost,
    JobVacancy,
    Partner,
    VideoGalleryItem,
)
from django.core.files import File
from django.conf import settings
import os
from datetime import date


class Command(BaseCommand):
    help = "Populate the database with static data"

    def handle(self, *args, **kwargs):
        self.stdout.write("Populating database...")

        def get_file(path):
            full_path = os.path.join(settings.BASE_DIR, "web", "static", path)
            if os.path.exists(full_path):
                return File(open(full_path, "rb"), name=os.path.basename(full_path))
            return None

        # 1. HomeSlider
        sliders = [
            {
                "title": "Building the Future with Innovation",
                "tagline": "Global General Construction Company",
                "image": "assets/images/resources/main-slider-three-1-1.jpg",
            },
            {
                "title": "Excellence in Every Detail",
                "tagline": "Quality Construction Services",
                "image": "assets/images/resources/main-slider-three-1-2.jpg",
            },
            {
                "title": "Sustainable Infrastructure for Ethiopia",
                "tagline": "Committed to Quality",
                "image": "assets/images/resources/main-slider-three-1-3.jpg",
            },
        ]
        for s in sliders:
            obj, created = HomeSlider.objects.get_or_create(
                title=s["title"], tagline=s["tagline"], defaults={"is_active": True}
            )
            if s.get("image"):
                img_file = get_file(s["image"])
                if img_file:
                    obj.image.save(os.path.basename(s["image"]), img_file, save=True)

        # 2. Partners
        partners = [
            {"name": "Partner 1", "logo": "assets/images/brand/brand-1-1.png"},
            {"name": "Partner 2", "logo": "assets/images/brand/brand-1-2.png"},
            {"name": "Partner 3", "logo": "assets/images/brand/brand-1-3.png"},
            {"name": "Partner 4", "logo": "assets/images/brand/brand-1-4.png"},
            {"name": "Partner 5", "logo": "assets/images/brand/brand-1-5.png"},
            {"name": "Partner 6", "logo": "assets/images/brand/brand-1-6.png"},
        ]
        for p in partners:
            obj, created = Partner.objects.get_or_create(name=p["name"])
            if p.get("logo"):
                img_file = get_file(p["logo"])
                if img_file:
                    obj.logo.save(os.path.basename(p["logo"]), img_file, save=True)

        # 3. Services
        services = [
            {
                "title": "Harmony Interiors",
                "description": "We provide high-quality interior design services.",
                "icon": "icon-interior-design",
                "image": "assets/images/services/services-1-1.jpg",
                "badge": "Core Service",
                "tags": "commercial, institutional, project-management",
            },
            {
                "title": "Evolve Space Designs",
                "description": "Innovative space planning and design.",
                "icon": "icon-space",
                "image": "assets/images/services/services-1-2.jpg",
                "badge": "Local Works",
                "tags": "residential, renovation, finishes",
            },
            {
                "title": "Eden Home Styling",
                "description": "Professional home styling and decoration.",
                "icon": "icon-home",
                "image": "assets/images/services/services-1-3.jpg",
                "badge": "Specialist",
                "tags": "structural, engineering, safety",
            },
            {
                "title": "Urban Design",
                "description": "Sustainable urban planning and development.",
                "icon": "icon-urban",
                "image": "assets/images/services/services-2-1.jpg",
                "badge": "Sustainability",
                "tags": "sustainable, retrofit, efficiency",
            },
            {
                "title": "Landscape Design",
                "description": "Beautiful and functional landscape solutions.",
                "icon": "icon-landscape",
                "image": "assets/images/services/services-2-2.jpg",
                "badge": "Infrastructure",
                "tags": "site, civil, infrastructure",
            },
            {
                "title": "Construction Management",
                "description": "Expert management of construction projects.",
                "icon": "icon-construction",
                "image": "assets/images/services/services-2-3.jpg",
                "badge": "Foundations",
                "tags": "concrete, foundation, QA",
            },
        ]
        for s in services:
            obj, created = Service.objects.get_or_create(
                title=s["title"],
                defaults={
                    "description": s["description"],
                    "icon": s["icon"],
                    "badge": s.get("badge", ""),
                    "tags": s.get("tags", ""),
                },
            )
            if s.get("image"):
                img_file = get_file(s["image"])
                if img_file:
                    obj.image.save(os.path.basename(s["image"]), img_file, save=True)

        # 4. Projects
        projects = [
            {
                "title": "National Palace Restoration",
                "subtitle": "Phase I Restoration",
                "category": "building",
                "location": "Addis Ababa",
                "year": 2024,
                "description": "Restoring the National Palace: Lessons from Phase I",
                "image": "assets/images/project/projects-1-1.jpg",
            },
            {
                "title": "Jimma Corridor upgrade",
                "subtitle": "Urban Greening",
                "category": "corridor",
                "location": "Jimma",
                "year": 2024,
                "description": "Walkways, Bike Lanes & Urban Greening",
                "image": "assets/images/project/projects-1-2.jpg",
            },
            {
                "title": "Water Infrastructure",
                "subtitle": "Reservoirs & Pipes",
                "category": "water",
                "location": "Various",
                "year": 2023,
                "description": "Construction Resilience: Reservoirs, Pipes and Flood Prevention",
                "image": "assets/images/project/projects-1-3.jpg",
            },
            {
                "title": "2B+G+15 Tower",
                "subtitle": "High-Rise Delivery",
                "category": "building",
                "location": "Addis Ababa",
                "year": 2024,
                "description": "Practical case study on delivering a 2B+G+15 reinforced concrete building",
                "image": "assets/images/project/projects-1-4.jpg",
            },
        ]
        for p in projects:
            obj, created = Project.objects.get_or_create(
                title=p["title"],
                defaults={
                    "subtitle": p["subtitle"],
                    "category": p["category"],
                    "location": p["location"],
                    "year": p["year"],
                    "description": p["description"],
                },
            )
            if p.get("image"):
                img_file = get_file(p["image"])
                if img_file:
                    obj.image.save(os.path.basename(p["image"]), img_file, save=True)

        # 5. Blog Posts
        blog_posts = [
            {
                "title": "Restoring the National Palace: Lessons from Phase I",
                "content": "Detailed case study of the National Palace Phase I restoration...",
                "category": "Projects",
                "date": date(2024, 7, 18),
                "author": "Eng. Kedir Hassen",
                "image": "assets/images/blog/blog-1-1.jpg",
            },
            {
                "title": "Digital Construction: BIM, Surveying & Project Controls",
                "content": "How Building Information Modeling, modern surveying and robust project controls...",
                "category": "Technology",
                "date": date(2024, 10, 12),
                "author": "PMO Team",
                "image": "assets/images/blog/blog-1-2.jpg",
            },
        ]
        for b in blog_posts:
            obj, created = BlogPost.objects.get_or_create(
                title=b["title"],
                defaults={
                    "content": b["content"],
                    "category": b["category"],
                    "date": b["date"],
                    "author": b["author"],
                },
            )
            if b.get("image"):
                img_file = get_file(b["image"])
                if img_file:
                    obj.image.save(os.path.basename(b["image"]), img_file, save=True)

        # 6. Testimonials
        testimonials = [
            {
                "client_name": "Madriya Merin",
                "client_role": "Spatial Design",
                "review": "Arrangements are made to transport cargo by sea to meet customers’ international transportation needs.",
                "rating": 5,
                "image": "assets/images/testimonial/testimonial-one-client-1-1.jpg",
            },
            {
                "client_name": "Mike Hardson",
                "client_role": "Spatial Design",
                "review": "Arrangements are made to transport cargo by sea to meet customers’ international transportation needs.",
                "rating": 5,
                "image": "assets/images/testimonial/testimonial-one-client-1-2.jpg",
            },
        ]
        for t in testimonials:
            obj, created = Testimonial.objects.get_or_create(
                client_name=t["client_name"],
                defaults={
                    "client_role": t["client_role"],
                    "review": t["review"],
                    "rating": t["rating"],
                },
            )
            if t.get("image"):
                img_file = get_file(t["image"])
                if img_file:
                    obj.image.save(os.path.basename(t["image"]), img_file, save=True)

        # 7. Team Members
        team = [
            {
                "name": "David Mitchell",
                "role": "Project Manager",
                "image": "assets/images/team/team-1-1.jpg",
            },
            {
                "name": "Sarah Johnson",
                "role": "Secretary",
                "image": "assets/images/team/team-1-2.jpg",
            },
            {
                "name": "Michael Chen",
                "role": "Construction Engineer",
                "image": "assets/images/team/team-1-3.jpg",
            },
        ]
        for m in team:
            obj, created = AboutTeam.objects.get_or_create(
                name=m["name"],
                defaults={
                    "role": m["role"],
                    "linkedin": f"https://linkedin.com/in/{m['name'].lower().replace(' ', '')}",
                },
            )
            if m.get("image"):
                img_file = get_file(m["image"])
                if img_file:
                    obj.image.save(os.path.basename(m["image"]), img_file, save=True)

        # 8. Job Vacancies
        jobs = [
            {
                "title": "Site Foreman",
                "type": "Permanent",
                "location": "Addis Ababa",
                "salary_range": "10,000 - 15,000 ETB/mo",
                "description": "Experienced site foreman required for building projects.",
            },
            {
                "title": "Skilled Mason",
                "type": "Temporary",
                "location": "Mekelle",
                "salary_range": "10,000 - 15,000 ETB/mo",
                "description": "Skilled mason needed for stone work.",
            },
        ]
        for j in jobs:
            JobVacancy.objects.get_or_create(
                title=j["title"],
                defaults={
                    "type": j["type"],
                    "location": j["location"],
                    "salary_range": j["salary_range"],
                    "description": j["description"],
                },
            )

        # 9. Video Gallery
        videos = [
            {
                "title": "Construction Excellence",
                "image": "assets/images/resources/video-one-thumb-img-1-1.jpg",
                "video_url": "https://www.youtube.com/watch?v=Get7rqXYrbQ",
            },
            {
                "title": "Modern Infrastructure",
                "image": "assets/images/resources/video-one-thumb-img-1-2.jpg",
                "video_url": "https://www.youtube.com/watch?v=Get7rqXYrbQ",
            },
        ]
        for v in videos:
            obj, created = VideoGalleryItem.objects.get_or_create(
                title=v["title"], defaults={"video_url": v["video_url"]}
            )
            if v.get("image"):
                img_file = get_file(v["image"])
                if img_file:
                    obj.image.save(os.path.basename(v["image"]), img_file, save=True)

        self.stdout.write(self.style.SUCCESS("Successfully populated database"))
