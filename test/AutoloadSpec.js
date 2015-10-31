var expect = require('chai').expect;
var assert = require('chai').assert;

var Autoload = require('../lib/Autoload');

var path = {
  js: '/a_Large/Complex/../file-pa th/AuthController.js',
  coffee: '/a/Complex/../file-pa th/AuthController.coffee',
  txt: '/a/Complex/../file-pa th/AuthController.txt',
}

module.exports = {
  test: 'test'
};

describe("Autoload Class", function () {

  beforeEach(function () {
    global = {};
  });

  it("should have load function", function () {
    assert.isFunction(Autoload.load);
  });
  it("should have getName function", function () {
    assert.isFunction(Autoload.getName);
  });
  it("should have isJs function", function () {
    assert.isFunction(Autoload.isJs);
  });
  it("should have custom function", function () {
    assert.isFunction(Autoload.isJs);
  });
  it("should have default function", function () {
    assert.isFunction(Autoload.isJs);
  });

  describe("#load", function () {
    it("should return valid object without modifications", function () {
      var files = Autoload.load('test');
      var file = require(__filename);
      expect(files.AutoloadSpec).to.be.equal(file);
    });
    it("should return valid object with modifications", function () {
      var file = require(__filename);
      file.test1 = 'test';
      var files = Autoload.load('test', function (mod) {
        mod.test1 = 'test';
        return mod;
      });
      expect(files.AutoloadSpec).to.be.equal(file);
    });
    it("should return valid object with depth", function () {
      var file = require("./fixtures/depth.js");
      var files = Autoload.load('test');
      expect(files.fixtures.depth).to.be.equal(file);
    });
  });

  describe("#default", function () {
    it("should return valid object", function () {
      var file = Autoload.default(__filename);
      expect(file).to.be.equal(require(__filename));
    });
  });

  describe("#custom", function () {
    it("should return valid object", function () {
      var file = Autoload.custom(__filename, function (mod) {
        return mod;
      });
      expect(file).to.be.equal(require(__filename));
    });
  });


  describe("#getName", function () {
    it("should return 'AuthController'", function () {
      expect(Autoload.getName(path.js)).to.be.equal('AuthController');
    })
  });

  describe("#isJs", function () {
    it("should return true for js", function () {
      expect(Autoload.isJs(path.js)).to.be.true;
    });

    it("should return true for coffee", function () {
      expect(Autoload.isJs(path.coffee)).to.be.true;
    });
    it("should return false for txt", function () {
      expect(Autoload.isJs(path.txt)).to.be.false;
    });
  });

});
