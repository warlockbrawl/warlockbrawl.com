#!/bin/bash
set -e # exit with nonzero exit code if anything fails

# Deploy script for Travis CI to push to GitHub Pages.
#rm -rf public || exit 0; the public dir should already exist (containing images/videos only)
#mkdir public;

gulp build

cd public
echo "${GH_CNAME}" > CNAME
git init

git config user.name "travis-ci"
git config user.email "travis@travis"

git add .
git commit -m "Deploy to GitHub Pages"

# Force push from the current repo's master branch to the remote
# repo's gh-pages branch. (All previous history on the gh-pages branch
# will be lost, since we are overwriting it.) We redirect any output to
# /dev/null to hide any sensitive credential data that might otherwise be exposed.
git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:gh-pages > /dev/null 2>&1
