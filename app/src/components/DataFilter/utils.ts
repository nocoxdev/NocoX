import { Operator } from './type';

export function applyCondition(left: any, right: any, operator?: Operator) {
  if (!operator) {
    return true;
  }

  switch (operator) {
    case Operator.Equal:
      return left === right;
    case Operator.NotEqual:
      return left !== right;
    case Operator.Contain:
      return left?.includes(right);
    case Operator.NotContain:
      return !left?.includes(right);
    case Operator.GreaterThan:
      return left > right;
    case Operator.GreaterThanEqual:
      return left >= right;
    case Operator.LessThan:
      return left < right;
    case Operator.LessThanEqual:
      return left <= right;
    case Operator.StartWith:
      return left?.startsWith(right);
    case Operator.EndWith:
      return left?.endsWith(right);
    default:
      return true;
  }
}
