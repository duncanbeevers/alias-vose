class Runner {
  static function main() {

    // We took a vote amongst a few friends for which activity
    // they wanted to do and tallied up the results.
    // 
    // Now we want to pick one randomly, using the vote counts
    // as weightings.
    //
    // Haxe lets us declare literal Maps that are strongly-typed
    var activities = [
      "Pillow fight"      => 4.0,
      "Silent disco"      => 9.0,
      "Trampolining"      => 2.0,
      "Police ride-along" => 1.0
    ];

    var picker = new AliasVose(activities);

    // Map initial values are undefined
    // Iterate through keys and set accumulators to 0
    var results = new Map();
    for (name in activities.keys())
      results[name] = 0;

    // Generate a bunch of random picks, tally them up
    for (i in 0...10000)
      results[picker.rand()] += 1;

    // Report the tallies
    trace(results);
  }
}
