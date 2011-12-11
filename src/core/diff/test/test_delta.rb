
require 'test/unit'

require 'core/system/load/load'
require 'core/schema/tools/print'
require 'core/grammar/render/layout'
require 'core/diff/code/delta'
require 'core/diff/code/diff'
require 'core/schema/code/factory'

class DeltaTest < Test::Unit::TestCase
  def setup
    @point_schema = Loader.load('diff-point.schema')
    @point_grammar = Loader.load('diff-point.grammar')
    @delta_schema = Loader.load('deltaschema.schema')
  end
  
  def test_delta
    deltaCons = DeltaERB.delta(@point_schema)
    assert(Equals.equals(@delta_schema, deltaCons))
  end
  
end
