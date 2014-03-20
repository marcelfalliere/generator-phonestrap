'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var fs = require('fs');
var sys = require('sys');
var exec = require('child_process').exec;
var libxmljs = require('libxmljs');

var PhonestrapGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = yeoman.file.readJSON(path.join(__dirname, '../package.json'));

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.npmInstall();
        this.bowerInstall();
      }
    });
  },

  askFor: function () {
    var done = this.async();

    // have Yeoman greet the user
    console.log(this.yeoman);

    // replace it with a short and sweet description of your generator
    console.log('');
    console.log(chalk.magenta('Phonestrap on biatch !'));
    console.log('');

    var prompts = [{
      name: 'foldername',
      message: 'Folder name ?',
      default: 'hello-phonestrap'
    },{
      name: 'packagename',
      message: 'Package ?',
      default: 'com.hellophonestrap'
    },
    {
      name: 'templatename',
      message: 'What template should I use ?',
      default: 'empty_app',
      choices: ['empty_app', 'master_detail']
    }];

    this.prompt(prompts, function (props) {
      this.templatename = props.templatename;
      this.foldername = props.foldername;

      exec('cordova create '+props.foldername+' '+props.packagename+' '+props.foldername, function (error, stdout, stderr) {
        exec('cp '+props.foldername+'/config.xml config.xml');
        exec('cp -r '+props.foldername+'/hooks hooks');
        exec('cp -r '+props.foldername+'/merges merges');
        exec('cp -r '+props.foldername+'/platforms platforms');
        exec('cp -r '+props.foldername+'/plugins plugins');
        exec('rm -rf '+props.foldername);
        
        done();
      });

    }.bind(this));
  },

  app: function () {
    this.template('_package.json', 'package.json');

    this.mkdir('www');
    
    this.mkdir('www/images');
    this.mkdir('www/js');
    this.mkdir('www/js/app');
    this.mkdir('www/js/app/collections');
    this.mkdir('www/js/app/models');
    this.mkdir('www/js/app/regions');
    this.mkdir('www/js/app/views');
    this.mkdir('www/styles');

    this.template(this.templatename+'/index.html', 'www/index.html');

    this.template(this.templatename+'/js/app/main.js', 'www/js/app/main.js');
    this.template(this.templatename+'/js/app/router.js', 'www/js/app/router.js');
    this.template(this.templatename+'/js/app/regions/contentRegion.js', 'www/js/app/regions/contentRegion.js');
    this.template(this.templatename+'/js/app/regions/headerRegion.js', 'www/js/app/regions/headerRegion.js');
    this.template(this.templatename+'/js/app/views/headerView.js', 'www/js/app/views/headerView.js');
    this.template(this.templatename+'/js/app/views/homeVC.js', 'www/js/app/views/homeVC.js');

    this.template(this.templatename+'/styles/all.less', 'www/styles/all.less');
    this.template(this.templatename+'/styles/reset.less', 'www/styles/reset.less');
    this.template(this.templatename+'/styles/phonestrap-config.less', 'www/styles/phonestrap-config.less');
    this.template(this.templatename+'/styles/phonestrap-content.less', 'www/styles/phonestrap-content.less');
    this.template(this.templatename+'/styles/phonestrap-header.less', 'www/styles/phonestrap-header.less');
    this.template(this.templatename+'/styles/phonestrap-transitions.less', 'www/styles/phonestrap-transitions.less');

    this.copy('bowerrc', '.bowerrc');
    this.copy('_bower.json', 'bower.json');
    this.copy('Gruntfile.js', 'Gruntfile.js');


  },

  projectfiles: function () {
    fs.readFile('config.xml', 'utf8', function (err,data) {
      if (err) throw err;
      
      var xmlDoc = libxmljs.parseXml(data);
      
      /*
        <preference name="DisallowOverscroll" value="true" />
        <preference name="webviewbounce" value="false" />
      */
      
      var DisallowOverscroll = new libxmljs.Element(xmlDoc, 'preference');
      DisallowOverscroll.attr({'name':'DisallowOverscroll', 'value':'true'});
      var webviewbounce = new libxmljs.Element(xmlDoc, 'preference');
      webviewbounce.attr({'name':'webviewbounce', 'value':'false'});

      xmlDoc.root().addChild(DisallowOverscroll)
      xmlDoc.root().addChild(webviewbounce)

      fs.writeFile('config.xml', xmlDoc.toString(), function(err){
        if (err) throw err;
        console.log('config.xml saved')
      })
      
    });

  }
});

module.exports = PhonestrapGenerator;