# CATCH QR

This project includes a simple 2 page react app & express server dockerized for deployment on Google Cloud Run.


## Deployment Steps 
1.  `docker build . -t <IMAGE_NAME>`
2.  `docker tag <IMAGE_NAME> gcr.io/<PROJ_NAME>/<TAG_NAME>>`
3.  `docker push gcr.io/<PROJ_NAME>/<TAG_NAME>`
4.  `gcloud run deploy <IMAGE_NAME> --platform managed --image gcr.io/<PROJ_NAME>/<TAG_NAME>` 

## Local Testing
Ensure the application works locally before deploying via `PORT=8080 && docker run -p 9090:${PORT} -e PORT=${PORT} gcr.io/<PROJ_NAME/<TAG_NAME>:latest`


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Python Script

Bulk insert of data into firestore script is also provided in /scripts.

To run, a .env file with the following information must be filled out and placed in the root directory in the following format: 

```bash
gcloud_credentials_prod=<NAME_OF_JSON_SERVICE_ACCOUNT>
COLLECTION_NAME_KIT=<FIRESTORE_COLLECTION_NAME>
CSV_FILE_NAME=<IMPORT_CSV>
```
For ease of use, create a virtualenv to run the python file
1. `python3 -m venv <name>`
2. `source <name>/bin/activate`
3. `pip install -r requirements.txt`
4. `python insert.py`

Note: a service account json must be generated with adequate permissions before running

## Npm Scripts

In the project directory, you can run:

### `npm run dev`

Starts the Express server and REACT app locally in tandem. Open http://localhost:3000 to view in browser. Requests are proxied.

### `npm run server`

Starts the Express server running by default on http://localhost:8080

### `npm start`

Runs the REACT app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
