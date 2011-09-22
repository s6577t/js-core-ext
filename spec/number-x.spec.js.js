describe('number extensions', function () {
  describe('ordinalize()', function () {
    var examples = [
      [0, '0th'],
      [1, '1st'],
      [2, '2nd'],
      [3, '3rd'],
      [4, '4th'],
      [5, '5th'],
      [6, '6th'],
      [7, '7th'],
      [8, '8th'],
      [9, '9th'],
      [10, '10th'],
      [11, '11th'],
      [12, '12th'],
      [13, '13th'],
      [14, '14th'],
      [21, '21st'],
      [22, '22nd'],
      [100, '100th'],
      [101, '101st'],
      [111, '111th'],
      [1001, '1001st'],
      [1012, '1012th'],
    ];
    
    it('should correctly ordinalize numbers', function () {
      examples.forEach(function (example) {
        expect(example[0].ordinalize()).toBe(example[1]);
      })
    });
    
    it('should ordinalize floats not to ordinalize', function () {
      expect((2.25).ordinalize()).toBe('2.25');
    })
  })
})