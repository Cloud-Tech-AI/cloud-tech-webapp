#!/bin/sh
set -e

for cmd in "$@"; do
    echo "Executing command: $cmd"
    eval "$cmd"
done