
from django.test import TestCase, RequestFactory
from django.template.loader import render_to_string
from bs4 import BeautifulSoup
from hypothesis import given, strategies as st, settings, HealthCheck
from hypothesis.extra.django import TestCase as HypothesisTestCase

from web.views import OurTeamView
from web.models import AboutTeam

class TeamMemberDisplayPropertyTest(HypothesisTestCase):
    """
    Property-based tests for Property 6: Team Member Complete Display.
    Validates: Requirements 2.1, 2.2, 2.4
    """

    def setUp(self):
        self.factory = RequestFactory()
        self.view = OurTeamView()

    @given(
        st.lists(
            st.fixed_dictionaries({
                'name': st.text(min_size=1, max_size=100).filter(lambda x: x.strip()),
                'role': st.text(min_size=1, max_size=100).filter(lambda x: x.strip()),
                'bio': st.text(min_size=10, max_size=500).filter(lambda x: x.strip() and not any(c in x for c in '\r\n\t')),
                'image': st.just('team/default.jpg'), # Placeholder for image path
                'facebook': st.one_of(st.just(''), st.just('https://facebook.com/profile')),
                'twitter': st.one_of(st.just(''), st.just('https://twitter.com/profile')),
                'linkedin': st.one_of(st.just(''), st.just('https://linkedin.com/profile')),
            }),
            min_size=1,
            max_size=5
        ).map(lambda members: [
            {**member, 'name': f"{member['name']}_{i}"} 
            for i, member in enumerate(members)
        ])  # Ensure unique names
    )
    @settings(max_examples=50, suppress_health_check=[HealthCheck.filter_too_much], deadline=None)
    def test_team_member_complete_display_property(self, team_members_data):
        """
        Property 6: Team Member Complete Display.
        Asserts that all active team members are displayed with complete profile information,
        including social media links and bio.
        """
        AboutTeam.objects.all().delete() # Clear existing data

        active_team_members = []
        for member_data in team_members_data:
            member = AboutTeam.objects.create(**member_data)
            # Assuming all created members are active for this test
            active_team_members.append(member)

        response = self.client.get('/ourteam.html')
        rendered_html = response.content.decode('utf-8')
        soup = BeautifulSoup(rendered_html, 'html.parser')

        team_member_elements = soup.find_all('div', class_='team-one__single')

        self.assertEqual(len(team_member_elements), len(active_team_members),
                         "Number of displayed team members does not match active members.")

        for member in active_team_members:
            found_member = False
            for element in team_member_elements:
                name_element = element.find('h3', class_='team-one__name')
                position_element = element.find('p', class_='team-one__title')
                bio_element = element.find('p', class_='team-one__text')
                
                if name_element and name_element.text.strip() == member.name.strip():
                    found_member = True
                    self.assertEqual(position_element.text.strip(), member.role.strip())
                    # Normalize whitespace for bio comparison
                    expected_bio = ' '.join(member.bio.split())
                    actual_bio = ' '.join(bio_element.text.split())
                    self.assertEqual(actual_bio, expected_bio)

                    # Check social media links
                    social_links = element.find('div', class_='team-one__social')
                    if social_links:
                        if member.facebook:
                            self.assertIsNotNone(social_links.find('a', href=member.facebook),
                                                 f"Facebook link for {member.name} not found.")
                        if member.twitter:
                            self.assertIsNotNone(social_links.find('a', href=member.twitter),
                                                 f"Twitter link for {member.name} not found.")
                        if member.linkedin:
                            self.assertIsNotNone(social_links.find('a', href=member.linkedin),
                                                 f"LinkedIn link for {member.name} not found.")
                    break
            self.assertTrue(found_member, f"Team member {member.name} not found in rendered HTML.")

    def test_no_team_members_handling(self):
        """
        Test graceful handling when no team members exist.
        """
        AboutTeam.objects.all().delete() # Clear existing data

        response = self.client.get('/ourteam.html')
        rendered_html = response.content.decode('utf-8')
        soup = BeautifulSoup(rendered_html, 'html.parser')

        team_member_elements = soup.find_all('div', class_='team-one__single')
        self.assertEqual(len(team_member_elements), 0, "No team members should be displayed.")
        # Optionally, check for a specific "no team members" message if implemented in template
