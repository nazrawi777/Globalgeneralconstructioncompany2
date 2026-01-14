from django import forms
from .models import JobApplication


class JobApplicationForm(forms.ModelForm):
    class Meta:
        model = JobApplication
        fields = [
            "name",
            "email",
            "phone",
            "job_title",
            "job_type",
            "description",
            "cv",
        ]
        widgets = {
            "name": forms.TextInput(
                attrs={
                    "class": "form-control",
                    "placeholder": "First Name :",
                    "id": "name2",
                }
            ),
            "email": forms.EmailInput(
                attrs={
                    "class": "form-control",
                    "placeholder": "Your email :",
                    "id": "email2",
                }
            ),
            "phone": forms.TextInput(
                attrs={
                    "class": "form-control",
                    "placeholder": "Your phone no. :",
                    "id": "number2",
                    "type": "number",
                }
            ),
            "job_title": forms.TextInput(
                attrs={
                    "class": "form-control",
                    "placeholder": "Title :",
                    "id": "subject2",
                }
            ),
            "job_type": forms.Select(
                attrs={"class": "form-control form-select", "id": "Sortbylist-Shop"}
            ),
            "description": forms.Textarea(
                attrs={
                    "class": "form-control",
                    "placeholder": "Describe the job :",
                    "rows": 4,
                    "id": "comments2",
                }
            ),
            "cv": forms.FileInput(attrs={"class": "form-control", "id": "formFile"}),
        }
