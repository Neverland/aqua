#!/usr/bin/env bash

npm run build

git add .
git ci -m "auto commit"
git pr
git push
