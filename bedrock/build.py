"""
Python script to build common files. https://github.com/marketplace/actions/build-mcpack-action
"""

from behaviors.build import build as build_bp
from resources.build import build as build_rp


def build():
    """
    Entrypoint for the build script.
    """
    build_bp()
    build_rp()


if __name__ == "__main__":
    build()
