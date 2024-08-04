# Build To ../tripchemistry/

# commitMessage = $1

# npm run build
cp -r ./build/. ../tripchemistry
cd ../tripchemistry
git add .
# git commit -m "commitMessage"
git commit
git push