warlockbrawl.com
======

This repository is the source code to the warlockbrawl.com website. Its primary function is for the team to collaborate
on site content, but feel free to submit pull requests or
[open a issue](https://github.com/warlockbrawl/warlockbrawl.com/issues). An automatic deploy process may be added later on.

Todo
------------

This is an early build, nothing really to see here yet.

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
