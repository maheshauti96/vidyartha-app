### Running The Project

You must have npm installed on your system. From the root project directory, run these commands, from the command line:

<code>
  npm install
</code>

This will install all dependencies. (refer package.json for dependencies)

To build the project, first, run this command:

<code>
  npm run dev
 </code>

This will perform an initial build and start a watcher process that will update bundle.js with any changes you wish to make. (This will start to compile and reflect the change just after saving the file)


### Deployment (Create optimized build)

For Creating an optimized production build run following command:

<code>
  npm run build
</code>

this command will create a build directory with a production build of the app.
Inside the build/static directory will be your JavaScript and CSS files. Each filename inside of build/static will contain a unique hash of the file contents. This hash in the file name enables long term caching techniques.


### Git

<code>
  git clone https://github.com/maheshauti96/vidyartha-app
</code>

<code>
  git pull origin main
</code>

<code>
  git push origin main
</code>
