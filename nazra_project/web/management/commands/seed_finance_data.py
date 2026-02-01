import json
from django.core.management.base import BaseCommand
from django.db import transaction
from django.utils import timezone
from web.models import FiscalYear, FinanceProject, FinancialMetrics, PortfolioStatus

class Command(BaseCommand):
    help = 'Seeds initial financial data into the database'

    def handle(self, *args, **kwargs):
        self.stdout.write(self.style.NOTICE('Seeding financial data...'))

        # Clear existing data to prevent duplicates on re-runs
        FiscalYear.objects.all().delete()
        FinanceProject.objects.all().delete()
        FinancialMetrics.objects.all().delete()
        PortfolioStatus.objects.all().delete()
        self.stdout.write(self.style.WARNING('Cleared existing financial data.'))

        # Static data from final.js
        financial_years_static = [
            { 'year': '2020/21', 'turnover': 247500679 },
            { 'year': '2021/22', 'turnover': 258134782 },
            { 'year': '2022/23', 'turnover': 142378986 },
            { 'year': '2023/24', 'turnover': 150345685 },
            { 'year': '2024/25', 'turnover': 1068648056 },
        ]

        projects_static = [
            {
                'id': 'palace-pavement',
                'title': 'Palace Rigid Pavement & Drainage Works',
                'description': 'Construction of rigid pavement with drainage, curbs, and associated works for offices, gas station, and other service facilities',
                'value': 1300945000,
                'contractDate': 'Feb 14, 2017 E.C.',
                'status': 'Priority',
                'progress': 95,
                'client': 'FDRE Palace Administration',
                'isOutstanding': True,
                'fiscalYear': '2020/21', # Assign to an arbitrary fiscal year for seeding
            },
            {
                'id': 'jimma-corridor-c',
                'title': 'Jimma Road Corridor Segment C',
                'description': 'Construction of road corridor including asphalt overlay, smart poles, walkway, bike lane, and greenery works (Hassen Garage – Honey Land Hotel, Segment C)',
                'value': 108840001.82,
                'contractDate': 'Jan 2025',
                'status': 'Priority',
                'progress': 90,
                'client': 'Jimma City Administration',
                'isOutstanding': True,
                'fiscalYear': '2021/22',
            },
            {
                'id': 'special-forces-dorm',
                'title': 'Special Forces Dormitory & Monuments',
                'description': 'Construction of dormitory for special forces; landscape works; monumental renovations',
                'value': 208602621.17,
                'contractDate': 'Feb 2024',
                'status': 'Completed',
                'client': 'FDRE Palace Administration',
                'isOutstanding': False,
                'fiscalYear': '2022/23',
            },
            {
                'id': 'health-center',
                'title': 'Health Center & Laboratory Complex',
                'description': 'Construction of health center, administrative and laboratory blocks',
                'value': 92197229.64,
                'contractDate': '2018 E.C.',
                'status': 'Completed',
                'client': 'Link Community Development, Wolita Damot Sore Werda',
                'isOutstanding': False,
                'fiscalYear': '2023/24',
            },
            {
                'id': 'jimma-water',
                'title': 'Jimma Water Supply Infrastructure',
                'description': 'Construction, supply and installation of pipes, reservoir and other structural works for Jimma Town water supply and sewerage service',
                'value': 224615967.41,
                'contractDate': 'Feb 2023',
                'status': 'Completed',
                'client': 'Jimma Town Water Supply and Sewerage Service Enterprise',
                'isOutstanding': False,
                'fiscalYear': '2024/25',
            },
            {
                'id': 'palace-tower',
                'title': '2B+G+15 Tower Building',
                'description': 'Construction of 2B+G+15 building',
                'value': 205782322.17,
                'contractDate': 'Feb 2024',
                'status': 'Ongoing',
                'client': 'FDRE Palace Administration',
                'isOutstanding': False,
                'fiscalYear': '2024/25',
            },
            {
                'id': 'japanese-garden',
                'title': 'Japanese Garden & Greenery Works',
                'description': 'Construction and renovation of Japanese garden, walkway, and greenery works',
                'value': 83472586.43,
                'contractDate': 'Dec 2022',
                'status': 'Completed',
                'client': 'Oromia Coffee Farmers',
                'isOutstanding': False,
                'fiscalYear': '2022/23',
            },
            {
                'id': 'jimma-corridor-dev',
                'title': 'Jimma Corridor Development',
                'description': 'Jimma corridor development',
                'value': 30680690.80,
                'contractDate': 'Jun 2024',
                'status': 'Ongoing',
                'client': 'Addis Ababa City Construction Bureau',
                'isOutstanding': False,
                'fiscalYear': '2023/24',
            },
            {
                'id': 'jimma-agaro-road',
                'title': 'Jimma–Agaro–Dedessa River Road',
                'description': 'Jimma–Agaro–Dedessa river road upgrading project',
                'value': 62812384.35,
                'contractDate': 'Sept 2024',
                'status': 'Completed',
                'client': 'CRCC21',
                'isOutstanding': False,
                'fiscalYear': '2024/25',
            },
            {
                'id': 'national-palace',
                'title': 'National Palace Restoration Phase I',
                'description': 'Restoration and opening to the public of National Palace Phase I (Lot-5 Additional Works and Lot-4 Part A)',
                'value': 171601886.03,
                'contractDate': 'July 2023',
                'status': 'Completed',
                'client': 'FDRE Palace Administration',
                'isOutstanding': False,
                'fiscalYear': '2023/24',
            },
            {
                'id': 'shiromeda-commercial',
                'title': 'Shiromeda Commercial Center',
                'description': 'Shiromeda commercial center construction and renovation; fence and site works',
                'value': 84860169.32,
                'contractDate': 'Dec 2024',
                'status': 'Completed',
                'client': 'Ethiopia Education Materials Production Enterprise',
                'isOutstanding': False,
                'fiscalYear': '2024/25',
            },
        ]

        # Populate FiscalYear model
        fiscal_year_objects = {}
        for i, fy_data in enumerate(financial_years_static):
            fiscal_year = FiscalYear.objects.create(
                year=fy_data['year'],
                turnover=fy_data['turnover'],
                order=i,
                is_active=(i == len(financial_years_static) - 1) # Set the last one as active
            )
            fiscal_year_objects[fy_data['year']] = fiscal_year
            self.stdout.write(self.style.SUCCESS(f'Created FiscalYear: {fiscal_year.year}'))

        # Populate FinanceProject model
        for i, proj_data in enumerate(projects_static):
            fiscal_year = fiscal_year_objects.get(proj_data.get('fiscalYear'))
            FinanceProject.objects.create(
                title=proj_data['title'],
                description=proj_data['description'],
                client=proj_data['client'],
                value=proj_data['value'],
                status=proj_data['status'],
                progress=proj_data.get('progress', 0),
                fiscal_year=fiscal_year,
                is_outstanding=proj_data['isOutstanding'],
                contract_date=proj_data['contractDate'],
                order=i,
            )
            self.stdout.write(self.style.SUCCESS(f'Created FinanceProject: {proj_data["title"]}'))

        # Populate FinancialMetrics (using latest data for active record)
        latest_fy = FiscalYear.objects.order_by('-order').first()
        if latest_fy:
            total_projects = FinanceProject.objects.count()
            completed_projects = FinanceProject.objects.filter(status='Completed').count()
            ongoing_projects = FinanceProject.objects.filter(status='Ongoing').count()
            priority_projects = FinanceProject.objects.filter(status='Priority').count()
            
            total_portfolio_value = sum(p.value for p in FinanceProject.objects.all())

            # Calculate YoY growth if there's a previous year
            yoy_growth = 0
            if FiscalYear.objects.count() >= 2:
                latest_turnover = latest_fy.turnover
                previous_fy = FiscalYear.objects.order_by('-order')[1]
                previous_turnover = previous_fy.turnover
                if previous_turnover != 0:
                    yoy_growth = ((latest_turnover - previous_turnover) / previous_turnover) * 100

            FinancialMetrics.objects.create(
                current_turnover=latest_fy.turnover,
                current_turnover_year=latest_fy.year,
                total_projects=total_projects,
                portfolio_value=total_portfolio_value,
                completed_projects=completed_projects,
                active_works=ongoing_projects + priority_projects, # Active works are ongoing and priority
                yoy_growth=round(yoy_growth, 2),
                is_active=True
            )
            self.stdout.write(self.style.SUCCESS('Created active FinancialMetrics.'))

        # Populate PortfolioStatus (using latest data for active record)
        if latest_fy:
            completed_projects_value = sum(p.value for p in FinanceProject.objects.filter(status='Completed'))
            ongoing_projects_value = sum(p.value for p in FinanceProject.objects.filter(status='Ongoing'))
            priority_projects_value = sum(p.value for p in FinanceProject.objects.filter(status='Priority'))

            total_portfolio_value = sum(p.value for p in FinanceProject.objects.all())
            
            PortfolioStatus.objects.create(
                snapshot_date=timezone.now().date(), # Use current date for snapshot
                completed_count=completed_projects,
                completed_value=completed_projects_value,
                ongoing_count=ongoing_projects,
                ongoing_value=ongoing_projects_value,
                priority_count=priority_projects,
                priority_value=priority_projects_value,
                total_value=total_portfolio_value,
                is_active=True
            )
            self.stdout.write(self.style.SUCCESS('Created active PortfolioStatus.'))

        self.stdout.write(self.style.SUCCESS('Financial data seeding complete.'))
