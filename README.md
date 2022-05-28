# AJL Financials - fundemental-stock-analysis

Note: This could not be deployed due to timeout restrictions on Heroku/Vercel. 

Note 2: The fetch request only takes 20 seconds due to a hard coded wait time - this is to get around the API limit on Alpha Vantage of 5 requests per minute. With a paid version of Alpha Vantage API it would likely take a few seconds to compare 5 tickers compared to >60s that it currently takes.



------

NextJS website parsing data from Alpha Vantage API and Yahoo Finance API to allow a user to compare up to 5 stock tickers of their choice. Follow below steps to install this locally:

1 - Either clone this repository or download the source files

2 - Ensure Node version 16.13.1 or higher is installed (may work with previous versions although untested)

3 - In the home directory (where the node_modules folder is) run the node command "npm install" in a cmd to install node packages

4 - Once packages are installed run the node command "npm run dev"

5 - Server should run at http://localhost:3000

6 - Navigate to local host and UI should appear. Mostcommon US/UK tickers work (i.e. MSFT, AAPL, GSK, ADBE); however, more obscure tickers may throw an error

7 - Allow around 20 to 30 seconds per ticker as the API has to fetch the data

8 - Compare and Profit!


