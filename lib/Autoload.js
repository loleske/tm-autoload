var fs = require('fs');
var path = require('path');
var Autoload = {


  /**
   * Load all files in directory
   *
   * @param {string} directory -
   * @param {function} modifier - function to modify modules
   * @returns {boolean}
   */
  load: function (directory, modifier) {
    var fullPath = process.cwd() + path.sep + directory + path.sep;
    var files = fs.readdirSync(fullPath);
    var modules = {};
    files.forEach(function (file) {
      var filePath = fullPath + file;
      var name = Autoload.getName(filePath);

      if (fs.lstatSync(filePath).isDirectory()) {
        modules[name] = Autoload.load(directory + path.sep + file);
      } else if (!Autoload.isJs(file)) {
        return false;
      } else if (!modifier) {
        modules[name] = Autoload.default(filePath);
      } else {
        modules[name] = Autoload.custom(filePath, modifier);
      }
    });
    return modules;
  },


  /**
   * Get the name of the given path
   *
   * @param {string} file -
   * @returns {string} name -
   */
  getName: function (file) {
    return path.basename(file, path.extname(file));
  },

  /**
   * Is the file is javascript
   *
   * @param {string} file -
   * @returns {boolean}
   */
  isJs: function (file) {
    return (path.extname(file) == '.js' || path.extname(file) == '.coffee');
  },

  /**
   * load the file and set it to global
   *
   * @param {string} file -
   * @returns true
   */
  default: function (file) {
    if (!Autoload.isJs(file)) {
      return false;
    }
    return require(file.replace(/\.[^/.]+$/, ""));
  },

  /**
   * load the file with modifier and set it to global
   *
   * @param {string} file -
   * @returns true
   */
  custom: function (file, modifier) {
    if (!Autoload.isJs(file)) {
      return false;
    }
    var obj = require(file.replace(/\.[^/.]+$/, ""))
    var name = Autoload.getName(file);
    return modifier(obj, name);
  },



};


module.exports = Autoload;
