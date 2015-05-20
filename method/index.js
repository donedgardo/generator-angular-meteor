var yeoman = require('yeoman-generator');
var fs = require('fs');
var path = require('path');
var _ = require('underscore.string');
var _i = require('underscore.inflection');
var genUtils = require('../util.js');

module.exports = yeoman.generators.Base.extend({
  init: function() {
    this.argument('compname', {type: String, required: true});
    this.compname = _.slugify(_.humanize(this.compname));
  },
  info: function() {
    //this.log(this.yeoman);
  },
  checkForConfig: function() {
    var cb = this.async();
    if(this.config.get('filters')) {
      this.filters = this.config.get('filters');
      this.filters.appname = this.config.get('appname') + 'App';
      this.filters.projectname = this.config.get('appname');
      this.filters.compname = _.camelize(this.compname);
      this.filters.compnameSingular = _i.singularize(this.compname);
      this.filters.compnameSlugged = this.compname;
      this.filters.compnameSluggedSingular = _i.singularize(this.filters.compnameSlugged);
      this.filters.compnameCapped = _.capitalize(this.filters.compname);
      this.filters.compnameCappedSingular = _i.singularize(this.filters.compnameCapped);
    }
    else {
      this.log('Cannot find the config file (.yo-rc.json)');
      return;
    }
    cb();
  },
  write: function() {
    this.sourceRoot(path.join(__dirname, './templates'));
    this.dir = 'methods';
    this.destinationRoot(path.join(process.cwd(), this.dir));
    genUtils.write(this, this.filters);
  }
});