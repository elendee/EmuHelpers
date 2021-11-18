# Emu App
Emu is a collection of patterns and utitlities that I have settled on in all the node based web apps I've built.

It uses raw EC6 modules on the frontend with no Typescript or bundling.

The main reason for building it was the clientside Model class, which allows for generating 'create' and 'edit' forms automatically from whatever your Model is.


## Models - Client and Server:
Two javascript classes for passing objects easily through many forms on both client and server.
Use these two abstract classes for the basic needs of handling large amounts of user input very quickly.
The particular focus is on creating generic, unstyled clientside forms - CSS and extra bindings are up to you.

### Client Model
The client class mainly provides methods for building forms, accepting input, and posting to server.

#### `Model.build_form()`
- The generated form will `preventDefault` standard submit, and will fire the Model's `onsubmit` method (intended for user middleware) before firing it's own `submit`.

#### `Model.hydrate( type, source, overwrite )`
- enum `type` - 'data' or 'form'
- - data: hydrate from other objects or Models as `source`s
- - form: attempt to hydrate a Model from a given DOM form as `source`, or it's internal form if none is provided.

#### `Model.submit( endpoint, options )`
- post data directly from the model as opposed to from a form element


### Server Model
#### `Model.update( upsert )`
- a method for saving or updating, with a togglable `upsert` allowed boolean.

#### `Model.publish( private_fields )`
- return all fields marked as public info
- optionally return more private fields where server logic determines it's appropriate



## Utilities
Utilities are standalone modules with their css bundled directly into them so they are one-line includes in any module based app.  Examples are found commented at the top of each utility.

#### hal
A popup / system message (taken from 2001 Space Odyssey HAL)
#### spinner
A waiting spinner, easily targeted to individual elements or the whole page
#### fetch_wrap
A small wrapper around js `fetch`, returning a Promise that assumes you are either GET'ting a route of POST'ing JSON
#### charts
SVG pie charts that animate when scrolled to.  



## Apps using Emu tools / patterns:
These are apps I've built using the tools in Emu:
```
https://eccentricity.online
https://game-scry.online
https://coilconnect.org
https://emu.oko.nyc
``` 
