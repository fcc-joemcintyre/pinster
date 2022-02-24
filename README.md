# Pinster - Share your Images

The Internet is full of images to share and comment on with your friends,
Pinster lets you show off the ones you like and see the ones other people
like.

This application is built using *React (16.x)*, *Redux*, *react-router*
and *styled-components* on the client. The server uses *Nodejs (15.x)*,
*Express* and *Passport*. The database is *MongoDB (4.x)*.

## Live instance

The application can be used at https://pinster-jm.herokuapp.com

## Development setup

Clone the *Github* repo, then install the dependencies.

```
git clone https://github.com/fcc-joemcintyre/pinster.git
cd pinster
npm i
```

The database supported is *MongoDB*. This can be a local or hosted instance (you
can also choose to use a local instance for dev/test and a hosted instance for
deployment). The database name for the application is *pinster*. The database
name used by the test runner is *pinsterTest*.

### Build (Development)

There are two build processes for development, one for the server and one for
the client.

In one terminal,

```
npm run dev:server
```

In a second terminal,

```
npm run dev:client
```

These development builds are continuous build - they will set up watches
and rerun build elements as file changes are saved.

### Build (Production)

There is one build command that runs both server and client production builds.

In a terminal,

```
npm run build
```

This production build is a single step process, it is not continuous build.

## Testing

Run unit tests using,

```
npm test
```

Run automated API tests using,

```
npm run postman:run
```

To use Postman client interactively, start the API test server using,

```
npm run postman:server
```

### Server

In a terminal, continuous server operation, updating on changes,
can be activated with

```
npm start
```

The *nodemon* utility provides restart on update.

### Client

After starting a server instance, open a browser and then access the
application at http://localhost:3000

## Deployment

The build process creates the *dist* directory containing all the deployment
files.

The entry point for the server is *main.js*.
The port number for the server can be passed on the command (-p/--port) or using
the PORT environment variable. For hosted environments, the PORT environment
variable provided by the hosting service is used.

The application also uses the following environment variables,

- SESSION_SECRET

HTTP Session secret (any text string).

- TWITTER_CONSUMER_KEY
- TWITTER_CONSUMER_SECRET

Twitter API access values, provided by Twitter.

## License
MIT
