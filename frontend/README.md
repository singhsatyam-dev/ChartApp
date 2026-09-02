Backend-
I have used the combined GHI data file from the Question 1 and made a Rest API with the url-"http://localhost:5000/api/ghi" in the backend which fetches all the data of the combinedGHI.csv file in the form of an array in which all the Date and GHI fata is sored.

Frontend-
The frontend fetches the data from the API and represents it in the form of chart data. It has 3 formats - 1 Day, 7 Days and 30 Days whith the maximum , minimum and average GHI data in the time range.

Tech Used-

1. Node.js, Rest API, Express.js, csv-parser, cors in the Backend.
2. React.js, Chart.js, Vite in the Frontend.

How to Run -

1. Run "node server.js" in the backend folder intergrated terminal.
2. First Run "npm install" then Run "npm run dev" in the frontend folder integrated terminal.
