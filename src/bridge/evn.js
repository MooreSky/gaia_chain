var self = __thread_call_this;
console.log(__thread_call_this);
var window = self;
var global = self;
self.TextDecoder = TextDecoder;
self.TextEncoder = TextEncoder;
function setTimeout(f, ms){
    var _$index = callbacks.register(f);
    return NativeObject.call(3964336770,[ ms, _$index]);
}

function clearTimeout(index){
    if(!index){
        return;
    }
    NativeObject.call(1432682371,[index]);
}