class AliasVose {
  // Instance variables
  var labels : Array<String>;
  var probabilities : Map<String, Float>;
  var aliases : Map<String, String>;

  // Haxe classes have formal constructors,
  // much like ECMAScript Harmony
  // http://wiki.ecmascript.org/doku.php?id=strawman:maximally_minimal_classes
  public function new(weightings: Map<String, Float>) {
    // Instance variables can be assigned to implicitly
    labels        = new Array();
    probabilities = new Map();
    aliases       = new Map();

    // Closure-local functions can be declared in the same was as JavaScript
    // Return value types can often be inferred
    function _sum(num:Float, total:Float) { return total + num; };

    // Haxe ships with a robust Lambda library
    var totalWeight = Lambda.fold(weightings, _sum, 0),
        averageWeight = totalWeight / Lambda.count(weightings);

    // Arrays contain homogenous types...
    //   unless you specifically ask for something different...
    //     ...which you shouldn't
    //   var x:Array<Dynamic> = [1, "foo"];
    var labelsSmall = new Array(),
        labelsLarge = new Array();

    // Iterators are single-value, no destructuring
    for (label in weightings.keys()) {
      // Instance variables can also be read from implicitly
      labels.push(label);

      // You can use square-bracket syntax to access Map values
      // But keys can be any type of object
      if (weightings[label] < averageWeight)
        labelsSmall.push(label);
      else
        labelsLarge.push(label);

      // Arguments are pass-by-reference
      // so be careful not to clobber your inputs
      probabilities[label] = weightings[label];
    }

    // Array length is accessed as a property, just like JavaScript
    while (labelsSmall.length > 0 && labelsLarge.length > 0) {
      var labelLarge = labelsLarge.pop(),
          labelSmall = labelsSmall.pop();

      // Snip snip, this probability gets a haircut
      probabilities[labelLarge] -= averageWeight - probabilities[labelSmall];
      // And the hair fills up the probability bin
      aliases[labelSmall] = labelLarge;

      if (probabilities[labelLarge] >= averageWeight)
        labelsLarge.push(labelLarge);
      else
        labelsSmall.push(labelLarge);

    }

    // Scale weights to probabilities
    for (label in probabilities.keys())
      probabilities[label] /= averageWeight;

    while (labelsLarge.length > 0)
      probabilities[labelsLarge.pop()] = 1.0;

    while (labelsSmall.length > 0)
      probabilities[labelsSmall.pop()] = 1.0;
  }

  public function rand() {
    // Haxe come with a standard library with a number of
    // convenience functions.
    // Std.random returns a random integer between 0 and the provided value
    var label = labels[Std.random(labels.length)];
    var coinToss = Math.random() < probabilities[label];

    // Ternary syntax is supported
    return coinToss ? label : aliases[label];
  }
}
