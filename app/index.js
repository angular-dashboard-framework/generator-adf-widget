'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  initializing: function () {
    this.pkg = require('../package.json');
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the phenomenal ' + chalk.red('AdfWidget') + ' generator!'
    ));

    var prompts = [{
      name: 'widgetName',
      message: 'What is the name of the widget?',
      validate: function(input){
        return input.length > 2;
      }
    }];

    this.prompt(prompts, function (props) {
      this.widgetName = props.widgetName;

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      var ctx = {
        widgetName: this.widgetName
      };
      this.template('_package.json', 'package.json', ctx);
      this.template('_bower.json', 'bower.json', ctx);
      this.template('_gulpfile.js', 'gulpfile.js', ctx);
      this.template('src/_script.js', 'src/' + this.widgetName + '.js', ctx);
      this.template('sample/_index.html', 'sample/index.html', ctx);
      this.fs.copy(
        this.templatePath('src/view.html'),
        this.destinationPath('src/view.html')
      );
      this.fs.copy(
        this.templatePath('src/edit.html'),
        this.destinationPath('src/edit.html')
      );
    },

    projectfiles: function () {
      this.fs.copy(
        this.templatePath('editorconfig'),
        this.destinationPath('.editorconfig')
      );
      this.fs.copy(
        this.templatePath('jshintrc'),
        this.destinationPath('.jshintrc')
      );
      this.fs.copy(
        this.templatePath('gitignore'),
        this.destinationPath('.gitignore')
      );
      this.fs.copy(
        this.templatePath('bowerrc'),
        this.destinationPath('.bowerrc')
      );
    }
  },

  install: function () {
    this.installDependencies({
      skipInstall: this.options['skip-install']
    });
  }
});
