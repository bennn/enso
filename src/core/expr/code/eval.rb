require 'core/expr/code/dispatch'

module EvalExprIntern

  def eval_EBinOp(op, e1, e2, args=nil)
    Kernel::eval("#{e1.eval.inspect} #{op} #{e2.eval.inspect}")
  end

  def eval_EUnOp(op, e, args=nil)
    Kernel::eval("#{op} #{e.eval.inspect}")
  end

  def eval_EField(e, fname, args=nil)
    var = e.eval
    var.nil? ? nil : var.send(fname)
  end

  def eval_EVar(name, args=nil)
    args[:env][name]
  end

  def eval_EStrConst(val, args=nil)
    val
  end

  def eval_EIntConst(val, args=nil)
    val
  end

  def eval_EBoolConst(val, args=nil)
    val
  end

  def eval_ERealConst(val, args=nil)
    val
  end
end

module EvalExpr

  def eval_EBinOp(op, e1, e2, args=nil)
    Kernel::eval("#{self.eval(e1, args)} #{op} #{self.eval(e2, args)}")
  end

  def eval_EUnOp(op, e, args=nil)
    Kernel::eval("#{op} #{self.eval(e, args).inspect}")
  end

  def eval_EField(e, fname, args=nil)
    var = self.eval(e, args)
    var.nil? ? nil : var.send(fname)
  end

  def eval_EVar(name, args=nil)
    args[:env][name]
  end

  def eval_EConst(val, args=nil)
    val
  end
end
