#!/usr/bin/env python3
import os
import sys

if __name__ == "__main__":
    if "DJANGO_POSTGRES_PASSWORD" in os.environ:
        os.environ.setdefault("DJANGO_SETTINGS_MODULE", "Haedrian_Website.settings.production")
    else:
        os.environ.setdefault("DJANGO_SETTINGS_MODULE", "Haedrian_Website.settings.development")

    from django.core.management import execute_from_command_line

    execute_from_command_line(sys.argv)
