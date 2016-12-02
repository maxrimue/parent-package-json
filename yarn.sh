#!/bin/bash

if [[ $TRAVIS_PULL_REQUEST_BRANCH != *"greenkeeper"* ]]; then
	# Not a GreenKeeper Pull Request, aborting
	exit 0
fi

# See if commit message includes "update"
git log --name-status HEAD^..HEAD | grep "update" || exit 0

git reset --hard origin/"$TRAVIS_PULL_REQUEST_BRANCH"

# Run yarn to create/update lockfile
yarn

# Commit and push yarn.lock file
git config --global user.email "no@no.com"
git config --global user.name "Travis CI"
git config --global push.default simple

git add yarn.lock
git commit -m "chore: update yarn.lock"
git push "https://"$PUSH_TOKEN"@github.com/"$TRAVIS_REPO_SLUG".git" "HEAD:"$TRAVIS_PULL_REQUEST_BRANCH
