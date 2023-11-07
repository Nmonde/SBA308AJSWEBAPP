// const url = 'https://baseball4.p.rapidapi.com/v1/mlb/schedule?date=2021-07-30';
// const options = {
// 	method: 'GET',
// 	headers: {
// 		'X-RapidAPI-Key': 'aec229dc06mshf05d14bb489908ap15379ejsn4e753392de96',
// 		'X-RapidAPI-Host': 'baseball4.p.rapidapi.com'
// 	}
// };

// async function fetchData(){
// try {
// 	const response = await fetch('https://baseball4.p.rapidapi.com/v1/mlb/schedule?date=2021-07-30', options);
// 	const result = await response.json();
// 	console.log(result);
// } catch (error) {
// 	console.error(error);
// }
// }
// fetchData();
//This works. The code above was used to find if object in console. 

async function fetchData() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;

    const url = `https://baseball4.p.rapidapi.com/v1/mlb/schedule?date=${formattedDate}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'aec229dc06mshf05d14bb489908ap15379ejsn4e753392de96',
            'X-RapidAPI-Host': 'baseball4.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const data = await response.json();

        if (data && data.body && data.body.length > 0) {
            const displayData = document.getElementById('displayData');
            displayData.innerHTML = ''; // Clear the content before displaying new data

            // Extract the date from the meta object
            const date = data.meta.date;
            const dateDisplay = document.createElement('p');
            dateDisplay.textContent = `Date: ${date}`;
            displayData.appendChild(dateDisplay);

            // Iterate through each game and display information
            data.body.forEach(game => {
                const gameInfo = document.createElement('div');
                gameInfo.className = 'game-info';
                gameInfo.innerHTML = `
                    <p>Game PK: ${game.gamePk}</p>
                    <p>Game Type: ${game.gameType}</p>
                    <p>Season: ${game.season}</p>
                    <p>Game Date: ${game.gameDate}</p>
                    <p>Status: ${game.status.detailedState}</p>
                    <p>Teams:</p>
                    <p>Away Team: ${game.teams.away.team.name}</p>
                    <p>Home Team: ${game.teams.home.team.name}</p>
                    <p>Venue: ${game.venue.name}</p>
                    <p>Is Tie Game: ${game.isTie}</p>
                `;
                displayData.appendChild(gameInfo);

                const separator = document.createElement('hr');
                displayData.appendChild(separator);
            });
        } else {
            const displayData = document.getElementById('displayData');
            //displayData.innerHTML = 'No games found for the specified date.';
        }
    } catch (error) {
        console.error(error);
    }
}

fetchData();
