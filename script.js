// Write your JavaScript code here!
window.addEventListener("load",function(){
	let pilotStatusId = document.getElementById("pilotStatus");
	let copilotStatusId = document.getElementById("copilotStatus");
	let fuelStatusId = document.getElementById("fuelStatus");
	let cargoStatusId = document.getElementById("cargoStatus");
	let faultyItemsId = document.getElementById("faultyItems");
	let launchStatusId = document.getElementById("launchStatus");
	let launchStatusCheckId = document.getElementById("launchStatusCheck")
	
	let form = document.querySelector("form");
	let button = document.getElementById("formSubmit");
	
	let pilotNameInput = document.querySelector("input[name = pilotName]");
	let copilotNameInput = document.querySelector("input[name = copilotName]");
	let fuelLevelInput = document.querySelector("input[name = fuelLevel]");
	let cargoMassInput = document.querySelector("input[name = cargoMass]");
		
	button.addEventListener("click",function(event){
		if(pilotNameInput.value === "" || copilotNameInput.value === "" || fuelLevelInput.value === "" || cargoMassInput.value === ""){
			alert("All fields are required");
			event.preventDefault();
		} else if(!isNaN(pilotNameInput.value) || !isNaN(copilotNameInput.value)){
			alert("Make sure to enter valid information for each field.");
			event.preventDefault();
		} else if(isNaN(fuelLevelInput.value) ||  isNaN(cargoMassInput.value)){
			alert("Make sure to enter valid information for each field.");
			event.preventDefault();
		} else {
			pilotStatus(pilotNameInput.value);
			copilotStatus(copilotNameInput.value);
			status();
			event.preventDefault();
		}
	});
	
	function pilotStatus(name){
		document.getElementById('pilotStatus').innerHTML = `Pilot ${name} is ready.`;	
	}
	
	function copilotStatus(name){
		document.getElementById('copilotStatus').innerHTML = `Co-pilot ${name} is ready.`;
	}
	
	function status(){
		faultyItemsId.style.visibility = "visible";
		if(fuelLevelInput.value < 10000){
			fuelStatusId.innerHTML = "Not enough fuel for the journey";
		} else{
			fuelStatusId.innerHTML = "Fuel level high enough for launch";
		}
		
		if(cargoMassInput.value > 10000){
			cargoStatusId.innerHTML = "Too much mass for the shuttle to take off";
		} else{
			cargoStatusId.innerHTML = "Cargo mass low enough for launch";		
		}
		
		if(fuelLevelInput.value < 10000 || cargoMassInput.value > 10000){
			launchStatusId.innerHTML = "Shuttle Not Ready for Launch";
			launchStatus.style.color ="red";
		}
		else {
			launchStatusId.innerHTML = "Shuttle Ready for Launch";
			launchStatus.style.color ="green";
		}
	}
	
	function getRandomNumber(min, max){
		return Math.floor(Math.random() * (max-min) + min);
	}

 //This block of code shows how to format the HTML once you fetch some planetary JSON!
	const fetchPromise = fetch("https://handlers.education.launchcode.org/static/planets.json");
	fetchPromise.then(function(response){
		const jsonPromise = response.json();
		jsonPromise.then(function(json){
			const div = document.getElementById("missionTarget");
			let index = getRandomNumber(0, json.length);
			div.innerHTML = 
				`<h2>Mission Destination</h2>
					<ol>
				   		<li>Name: ${json[index].name}</li>
				   		<li>Diameter: ${json[index].diameter}</li>
				   		<li>Star: ${json[index].star}</li>
				   		<li>Distance from Earth: ${json[index].distance}</li>
				   		<li>Number of Moons: ${json[index].moons}</li>
					</ol>
				<img src="${json[index].image}">`;

		});
	});
});