var ffi = require('ffi');
var ref = require('ref');
var int = ref.types.int;

var platform = process.platform;

getPlatform = function(platform) {
    if (platform === 'win32'){
        return './mathlib.dll';
    }else if(platform === 'linux'){
        return './mathlib.so';
    }else if(platform === 'darwin'){
        return './mathlib.dylib';
    }else{
        throw new Error('unsupported plateform for mathlibLoc');
    }
    return false;
};

var math = ffi.Library(getPlatform(platform), {
    "add2": [int, [int]],
    "mult": [int, [int, int]],
    "rag": ["string", [int]]
});

module.exports = math;