REPORT_TITLE=$1

set REPORT_TITLE=$REPORT_TITLE && npm run start-craco
lighthouse http://localhost:3000/home --output-path report/$REPORT_TITLE/home.html