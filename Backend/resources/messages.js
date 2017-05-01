var messages = {
	teams: {
		popup: '<h4>Team: {name} ({id})</h4><p><strong>Snelheid: </strong>{current_speed} km/h</p><p><strong>Finish-tijd: </strong>{finish_time}</p>',
		window: '<a href="#" data-uuid="{id}" class="list-group-item team-item"><h4 class="list-group-item-heading">Team: {name} ({id})</h4><p class="list-group-item-text"><strong>Snelheid: </strong>{current_speed} km/h<br><strong>Finish-tijd: </strong>{finish_time}<br></p></a>'
	},
	locations: {
		popup: '<h4>Reporter: {device_name}</h4><p><strong>Snelheid: </strong>{speed} km/h</p><p><strong>Laatste update: </strong>{last_modified}</p>',
		window: '<a href="#" data-uuid="{device_id}" class="list-group-item location-item"><h4 class="list-group-item-heading">Reporter: {device_name}</h4><p class="list-group-item-text"><strong>Snelheid: </strong>{speed} km/h<br><strong>Laatste update: </strong>{last_modified}<br><strong>Coördinaten: </strong>{latitude}, {longitude}<br></p></a>'
	},
	doorkomsten: {
		popup: '<h4>{name}</h4><p><strong>Coordinaten: </strong>{lat}, {lng}</p>',
		window: '<a href="#" data-uuid="{id}" class="list-group-item doorkomst-item"><h4 class="list-group-item-heading">{name}</h4><p class="list-group-item-text"><strong>Coordinaten: </strong>{lat}, {lng}</p></a>'
	}
};