define([
],
function() {
  var Interpreter ;
  var DynamicPropertyStack = MakeClass("DynamicPropertyStack", null, [],
    function() {
    },
    function(super$) {
      this.initialize = function() {
        var self = this; 
        self.$.current = new EnsoHash ( { } );
        return self.$.stack = [];
      };

      this._get = function(name) {
        var self = this; 
        return self.$.current._get(name);
      };

      this._bind = function(field, value) {
        var self = this; 
        var old;
        old = self.$.current._get(field);
        self.$.stack.push([field, old]);
        return self.$.current._set(field, value);
      };

      this._pop = function(n) {
        var self = this; 
        if (n === undefined) n = 1;
        var parts;
        while (n > 0) {
          parts = self.$.stack.pop();
          self.$.current._set(parts._get(0), parts._get(1));
          n = n - 1;
        }
      };

      this.to_s = function() {
        var self = this; 
        return self.$.current.to_s();
      };
    });

  var Dispatcher = MakeMixin([], function() {
    this._ = function() { return this.$._ };
    this.set__ = function(val) { this.$._  = val };

    this.dynamic_bind = function(block, fields) {
      var self = this; 
      var result;
      if (! self.$.D) {
        self.$.D = DynamicPropertyStack.new();
      }
      fields.each(function(key, value) {
        return self.$.D._bind(key, value);
      });
      result = block();
      self.$.D._pop(fields.size());
      return result;
    };

    this.dispatch = function(operation, obj) {
      var self = this; 
      var type, method, params;
      type = obj.schema_class();
      method = S(operation, "_", type.name()).to_s();
      if (! self.respond_to_P(method)) {
        method = self.find(operation, type);
      }
      if (! method) {
        method = S(operation, "_?").to_s();
        if (! self.respond_to_P(method)) {
          self.raise(S("Missing method in interpreter for ", operation, "_", type.name(), "(", obj, ")"));
        }
        val = self.send(method, type, obj, self.$.D);
      } else {
        params = type.fields().map(function(f) {
          return obj._get(f.name());
        });
        val = self.send.apply(self, [method].concat( params ));
      }
      puts("CALL " + obj + "." + operation + "=" + val);
      return val;
    };

    this.dispatch_obj = function(operation, obj) {
      var self = this; 
      var type, method;
      type = obj.schema_class();
      method = S(operation, "_", type.name()).to_s();
      if (! self.respond_to_P(method)) {
        method = self.find(operation, type);
      }
      if (! method) {
        method = S(operation, "_?").to_s();
        if (! self.respond_to_P(method)) {
          self.raise(S("Missing method in interpreter for ", operation, "_", type.name(), "(", obj, ")"));
        }
      }
      return self.send(method, obj);
    };

    this.find = function(operation, type) {
      var self = this; 
      var method;
      method = S(operation, "_", type.name()).to_s();
      if (self.respond_to_P(method)) {
        return method;
      } else {
        return type.supers().find_first(function(p) {
          return self.find(operation, p);
        });
      }
    };
  });

  Interpreter = {
    DynamicPropertyStack: DynamicPropertyStack,
    Dispatcher: Dispatcher,

  };
  return Interpreter;
})
