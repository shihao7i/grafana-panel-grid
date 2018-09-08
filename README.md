# UI Grid Panel Plugin for Grafana

This is what I did in Hewlett Packard Enterprise Sunnyvale, CA. It's just a POC and eventually we made a dicision insteading of using Grafana, using React to buid our project, so I decided to upload this on my personal Github, wish it can hlep more people who want to know how to write a Grafana-plugin. I completed this alone in HPE, and we did't use grafana is our project, so I got permit to share my code. 

You need the lastest grafana build for Grafana 3.0 to enable plugin support. You can get it here : http://grafana.org/download/builds.html

Get Started

1. Clone this repo on Grafana data/plugins folder.

2. Remember to add path of dependencies in system.conf.js
	```javascript
	"ui.grid": "vendor/ui-grid/ui-grid.js"
	```
3. Remember to import module in app.ts (only need to import ui.grid)

 ```javascript
 import 'ui.grid'
 ```
4. Remember to add modules to module dependencies in app.ts

	```javascript
	this.ngModuleDependencies = [
      'grafana.core',
      'ngRoute',
      'ngSanitize',
      '$strap.directives',
      'ang-drag-drop',
      'grafana',
      'pasvaz.bindonce',
      'ui.bootstrap',
      'ui.bootstrap.tpls',
      'ui.grid',
      'ui.grid.pinning',
      'ui.grid.pagination',
      'ui.grid.moveColumns',
      'ui.grid.resizeColumns',
      'ui.grid.expandable',
      'ui.grid.selection',
      'ui.grid.treeView'
    ];
	```
5. If you've cloned this repository outside of Grafana data/plugins folder link the plug in conf/custom.ini

Overview

1. Dependencies are in package.json and will be installed into node_modules folder.

2. Grunt file is used to support ES6, which transpiles src folder and create dist folder which is picked by Grafana.

Setup

1. Run ` npm install`

2. Run ` grunt`

3. Running Grafana Locally. You can run a local instance of Grafana by running:
   ```
   ./bin/grafana-server
   ```

## About Angular UI Grid

Please go to [Angular UI Grid ](http://ui-grid.info/) website.
