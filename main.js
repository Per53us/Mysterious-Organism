// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

//factory function:
const pAequorFactory = (number, array) => {
  return {
    specimenNum: number,
    dna: array,
    mutate() {
      let randomIndex = Math.floor(Math.random() * array.length);
      const randBase = returnRandBase();
      while (this.dna[randomIndex] !== randBase) { //this while loop ensures that our random generation will repeat until it comes up with a unique iteration.
        this.dna[randomIndex] = returnRandBase();
      }
      return this.dna;
    },
    compareDNA (object) {
      let counter = 0;
      for (let i=0; i<15; i++) {
        if (this.dna[i] === object.dna[i]) { //since the loop index (i) is the same through each iteration of the loop, it can be used for both this. and the argument object.
          counter++;
        } 
      }
      let percentage = (counter/15)*100;
      console.log(`Specimen #${this.specimenNum} and Specimen #${object.specimenNum} share %${percentage} DNA in common.`)
    },
    willLikelySurvive () {
      let chance = 0;
      for (let i = 0; i < 15; i++) {
        if (this.dna[i] === 'C' || this.dna === 'G') {
          chance++
        }
      }
      if (chance >= 9) {//we could also program in the percentages here, but since 60% of 15 is 9, we can just cut to the chase with a simple conditional.
        return true;
      } else {
        return false;
      };
    },
    complimentStrand () {
      let strand = [];
      for (let i = 0;i < 15; i++) {
        switch (this.dna[i]) {
          case 'A':
            strand.push('T');
            break;
          case 'T':
            strand.push('A');
            break;
          case 'C':
            strand.push('G');
            break;
          default: //typing out the last case is not necessary, as "default:" covers the only remaining possibility.
            strand.push('C');
        }
      }
      return strand;
    }
  }
};

//function to create 30 naturally-viable pAequor specimens:
const generateSpecimens = () => {
  let heartySpecimens = [];
let i = 3; //I chose to start with the number 3, as I use 1 and 2 as examples in my testing statement.
while (heartySpecimens.length < 30) {
  let organism = pAequorFactory(i, mockUpStrand());
  if (organism.willLikelySurvive()) {
    heartySpecimens.push(organism) //I chose to include the whole object, instead of just .dna; this way, you can see how many iterations it takes to get a viable instance!
  }
  i++;
}
return heartySpecimens;
}

//Testing statements:
const example1 = pAequorFactory(1, mockUpStrand());
const example2 = pAequorFactory(2, mockUpStrand());
console.log(example1.dna);
example1.mutate();
console.log(example1.dna);
console.log(example2.dna);
example1.compareDNA(example2);
console.log(example2.willLikelySurvive());
console.log(example2.complimentStrand());
console.log(generateSpecimens());





