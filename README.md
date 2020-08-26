# camel_case ePortfolio 
Project for COMP30022 IT Project 2020 Semester 2 (Umair's Team 1)

![](assets/camel_case.png)

[![Heroku App Status](http://heroku-shields.herokuapp.com/camelcase-itproject)](https://camelcase-itproject.herokuapp.com)

## Requirements
* [Heroku](https://www.heroku.com/home)
  * [command-line tools (CLI)](https://toolbelt.heroku.com)
* [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
* [Node.js](https://nodejs.org) (use LTS release)

## Team Members
Name | Student No | Email | GitHub
-- | -- | -- | --
Tuan Dung (Josh) Nguyen |	941806	| tuann6@student.unimelb.edu.au | joshnguyen99
Lawrence Leong	| 996300	|lsleong@student.unimelb.edu.au | Rexrover2
Liam Saliba	| 882039	|lsaliba@student.unimelb.edu.au | exradr
Chan Jie Ho	| 961948	| chanjieh@student.unimelb.edu.au | hochanjie
Yung Cheng Kong	| 1026205	 | yungchengk@student.unimelb.edu.au | yungchengK

**Supervisor**  
Umair Mawani (umawani) / umair.mawani@unimelb.edu.au / umawani@student.unimelb.edu.au

# Creating a local work environment
## Local Development

Because this app is made of two npm projects, there are two places to run `npm` commands:

1. **Node API server** at the root `./`  (but actually in `server/`)
1. **React UI** in `client/` directory.

### Run the API (express) server

In a terminal:

```bash
# Initial setup
npm install

# Start the server
npm start
```

#### Install new npm packages for Node
Note: server and client are *separate*.  `cd` to the correct directory (`/` or `client/`) before doing this.
```bash
npm install package-name --save
```


### Run the Client (React UI)

The React app is configured to proxy backend requests to the local Node server. (See [`"proxy"` config](client/package.json))

In a separate terminal from the API server, start the UI:

```bash
# Always change directory, first
cd client/

# Initial setup
npm install

# Start the server
npm start
```

#### Install new npm packages for React UI

```bash
# Always change directory, first
cd client/

npm install package-name --save
```

### Build react for deployment (testing)
Only needed if you're testing how Heroku will deploy the app.

Within project root `/`
```
# Run Heroku deployment from your own computer
heroku local web
```
At this point, http://localhost:5000 is running the server and api.  You can check http://localhost:5000/api and you'll probably see a JSON file.

But will 404 since the site files are not compiled within the `client/build/` directory.  To get react running locally (as Heroku does it), we need to build it.
```
# Compile react for deployment (will build to `client/build/` and served with `server/` express)
# run this in project root
npm run-script build
```
The above script can be found in `package.json`.

Now http://localhost:5000 will have the app.  Sweet.

### Deploying to Heroku
There's little reason to do this since `master` will automatically be deployed to Heroku upon any update.
This is here for documentation purposes.
```
# Add heroku as remote (will exist as heroku branch)
heroku git:remote -a camelcase-itproject

# Push branch to heroku
git push heroku master
```

---


# React Development

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
The stuff below is generated from that, and will be useful for development.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
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

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
