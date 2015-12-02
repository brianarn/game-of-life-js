describe('Testing Game of Life', function(done){
  describe('Arena', function(){
    var Arena = require('./game');
    var arena;

    beforeEach(function () {
      arena = new Arena({
        initialState: [
          [false, false, false],
          [true, true, true],
          [false, false, false]
        ]
      });
    });

    it('loads the module', function(){
      chai.expect(typeof Arena).to.equal('function');
    });

    it('looks correct', function(){
      chai.expect(typeof arena.tick).to.equal('function');
      chai.expect(arena.width).to.equal(3);
      chai.expect(arena.height).to.equal(3);
    });

    it('counts neighbors', function(){
      chai.expect(arena.countNeighbors(1,1)).to.equal(2);
      chai.expect(arena.countNeighbors(0,1)).to.equal(3);
    });

    it('ticks correctly', function(){
      chai.expect(arena.state).to.deep.equal([
          [false, false, false],
          [true, true, true],
          [false, false, false]
      ]);
      arena.tick();
      chai.expect(arena.state).to.deep.equal([
          [false, true, false],
          [false, true, false],
          [false, true, false]
      ]);
      arena.tick();
      chai.expect(arena.state).to.deep.equal([
          [false, false, false],
          [true, true, true],
          [false, false, false]
      ]);
    });
  });
});
