warlockbrawl.com
======

[![Build Status](https://travis-ci.org/warlockbrawl/warlockbrawl.com.svg?branch=master)](https://travis-ci.org/warlockbrawl/warlockbrawl.com)

This repository is the source code to the warlockbrawl.com website. It's mostly here for the team to collaborate
on site content, but if you spot something feel free to submit a pull request or
[open a issue](https://github.com/warlockbrawl/warlockbrawl.com/issues). A live version of the latest build can be found on http://latest.warlockbrawl.com.

Building
-------------------------------------

The website is written in multiple different preprocessors and then built and assembled with gulp.

- Have [node + npm](https://nodejs.org/) installed
- ``npm install -g gulp bower``
- ``git clone https://github.com/warlockbrawl/warlockbrawl.com.git``
- ``cd warlockbrawl.com``
- ``npm install``
- ``bower install``
- ``gulp build``
- ``gulp watch`` will start a local webserver, watch and livereload
  your changes at http://localhost:8888/ (``gulp`` builds, then watches)
