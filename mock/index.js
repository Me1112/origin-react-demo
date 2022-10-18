const mockjs = require('mockjs');
const path = require('path');
const paths = require('../config/paths');
const delay = require('mocker-api/utils/delay');
const glob = require('glob');
const isFunction = require('lodash/isFunction');

/**
 * @name getRequirePath
 * @param {*} from:String
 * @param {*} to:String
 * 获取require方法可以使用的相对路径
 */
let getRequirePath = (from, to) =>
  `./${path.relative(from, to).replace(/\\/g, '/')}`;

/**
 * @description 动态获取./api目录下所有mock js文件并加载
 */
let mockObject = glob
  .sync(getRequirePath(paths.appPath, path.resolve(__dirname, './api/**/*.js')))
  .map(pathStr => {
    let subMockUrl = getRequirePath(
      __dirname,
      path.resolve(paths.appPath, pathStr)
    );
    let mockItem = require(subMockUrl);
    return isFunction(mockItem) ? mockItem(mockjs) : mockItem;
  })
  .reduce((a, b) => ({ ...a, ...b }), {});

module.exports = delay(mockObject, 1000);
