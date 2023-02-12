const { parse } = require("csv-parse");
const fs = require("fs");

const habitablePlanets = [];

function isHabitablePlanet(planet) {
    return planet['koi_disposition'] === 'CONFIRMED' //status of the planet 
        && planet['koi_insol'] > 0.36 && planet['koi_insol'] < 1.11 //stellar flux - amount of light
        && planet['koi_prad'] < 1.6; //Planetary Radius
}

fs.createReadStream("kepler_data.csv") //stream of bytes
  .pipe(parse({
    comment: '#',
    columns: true //key value pairs
  })) //connects readable stream source to writable stream destination
  .on("data", (data) => {
    if (isHabitablePlanet(data)) { // only push data if isHabitablePlanet is true
        habitablePlanets.push(data)
    }
  })
  .on("error", (err) => {
    console.log(err);
  })
  .on("end", () => {
    console.log(habitablePlanets.map((planet) => {
        return planet['kepler_name'] //filtering 
    }))
    console.log(`Habitable planets: ${habitablePlanets.length}`);
  });


