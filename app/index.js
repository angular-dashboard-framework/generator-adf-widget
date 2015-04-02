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
    },{
      name: 'widgetTitle',
      message: 'What is the title of the widget?',
      validate: function(input){
        return input.length > 0;
      }
    },{
      name: 'widgetDescription',
      message: 'Please enter a description for your widget?',
      validate: function(input){
        var value = input.length > 0 && input.length <= 140;
        if (!value){
          value = "description must be > 0 and < 140";
        }
        return value;
      }
    }];

    this.prompt(prompts, function (props) {
      this.widgetName = props.widgetName;
      this.widgetTitle = props.widgetTitle;
      this.widgetDescription = props.widgetDescription;

      done();
    }.bind(this));
  },

  writing: {
    app: function () {
      var ctx = {
        widgetName: this.widgetName,
        widgetTitle: this.widgetTitle,
        widgetDescription: this.widgetDescription
      };
      this.template('_README.md', 'README.md', ctx);
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
