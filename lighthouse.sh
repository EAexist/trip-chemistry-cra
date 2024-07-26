for var in 1
do
    lighthouse http://localhost:3000 --output-path=lighthouse/$1/index.html --quiet --form-factor=mobile --only-categories=[performance] --preset experimental
done
# lighthouse http://localhost:3000 --quiet --output-path=lighthouse/$1/index.html
# lighthouse http://localhost:3000/login --quiet --output-path=lighthouse/$1/login.html
# lighthouse http://localhost:3000/result/hanni --quiet --output-path=lighthouse/$1/result_hanni.html
# lighthouse http://localhost:3000/chemistry/sample --quiet --output-path=lighthouse/$1/chemistry_sample.html
# lighthouse http://localhost:3000/test --quiet --output-path=lighthouse/$1/test.html
# lighthouse http://localhost:3000/result --quiet --output-path=lighthouse/$1/result.html
# lighthouse http://localhost:3000/myChemistry --quiet --output-path=lighthouse/$1/myChemistry.html