////////// //////////////////////////////////////////////////////////////
//  API Details 
/////////////////////////////////////////////////////////////////////////
// API @ https://rapidapi.com/kaylanhusband/api/nba-player-individual-stats/
const API_URL = '[API URL]';
const API_HOST = '[API HOST]';
const API_KEY = '[API KEY]';


////////// //////////////////////////////////////////////////////////////
//  ON Form Submit 
/////////////////////////////////////////////////////////////////////////
document.getElementById('get-team-players').addEventListener("submit", function(e) {
  
  // Prevent Default 
  e.preventDefault();

  // teamName = Select field value 
  let teamName = document.getElementById('team-name').value;


  /////////////////////////////////////////////////////////////////////////
  //  FETCH
  /////////////////////////////////////////////////////////////////////////
  fetch(API_URL + "/players/team?name=" + teamName, {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": API_HOST,
      "x-rapidapi-key": API_KEY
    }
  })
    
  /////////////////////////////////////////////////////////////////////////
  //  THEN 
  /////////////////////////////////////////////////////////////////////////
  .then(response => {
    //console.log(response.json());
    response.json().then(json => {
      
      /////////////////////////////////////////////////////////////////////////
      // Player Age 
      /////////////////////////////////////////////////////////////////////////
      function playerAge(dateOfBirth) {
        // Split Player DOB String @ /
        let playerDOB = dateOfBirth.split("/");
        // Get year from split array
        let playerBirthYear = playerDOB[2]
        
        // Return Current Full Year - Player Birth Year
        return new Date().getFullYear() - playerBirthYear + ' years old';
      }
      
      /////////////////////////////////////////////////////////////////////////
      // Player Weight - Convert from Pounds To Kilograms 
      /////////////////////////////////////////////////////////////////////////
      function playerWeightConvert(weightPounds) {
        // Remove lbs from string
        let playerWeightPounds = weightPounds.replace('lbs', '');
        // Divide Weight In LBS For KG 
        let playerWeightKilos =  playerWeightPounds/2.2046;
        
        // Return Rounded Weight
        return Math.round(playerWeightKilos) + 'KG';
      }

      /////////////////////////////////////////////////////////////////////////
      //  Player Card Template
      /////////////////////////////////////////////////////////////////////////
      function playerTemplate(player) {
        return `
          <div class="player-card">
            <div class="player-img">
              <p class="player-jersey">${player.jerseyNumber}</p>
              <img class="img" src="${player.headShotUrl ? `${player.headShotUrl}` : "assets/player-not-found.jpg" }" alt="">
            </div>
            <div class="player-content">
              <h2>${player.firstName} ${player.lastName}</h2>
              <p class="details">${player.team}</p>
              <p class="details">${player.position}</p>
              <p class="details">${playerAge(player.dateOfBirth)}</p>
              <p class="details">${playerWeightConvert(player.weight)}</p>
              <a class="btn-link" href="https://en.wikipedia.org/wiki/${player.firstName}_${player.lastName}" target="_blank">Get player bio</a>
            </div>
          </div>
        `
      }
  
      let output = document.getElementById("output");
      output.innerHTML = `
      ${json.map(playerTemplate).join(' ')}
      `
    });
  })
  .catch(err => {
    console.error(err);
  });

});