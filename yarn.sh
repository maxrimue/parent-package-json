#!/bin/bash

if [[ $TRAVIS_PULL_REQUEST_BRANCH != *"greenkeeper"* ]]; then
	# Not a GreenKeeper Pull Request, aborting
	exit 0
fi

git checkout $TRAVIS_PULL_REQUEST_BRANCH

# Run yarn to create/update lockfile
yarn

# Commit and push yarn.lock file
git add yarn.lock
git commit -m "chore: update yarn.lock"
git push "https://"$PUSH_TOKEN"@github.com/"$TRAVIS_REPO_SLUG".git"
