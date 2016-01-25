#!/bin/bash

# This is for running Voatotype locally. Simply install Jekyll and run this command.
# GitHub builds Jekyll itself with the settings in _config.yml. These settings also apply to the local build, except as overridden here.

# --host 0.0.0.0    allows other devices on the local network to connect
# --baseurl ""      host at localhost:4000/ rather than localhost:4000/Voatotype/

jekyll serve --host 0.0.0.0 --baseurl ""
