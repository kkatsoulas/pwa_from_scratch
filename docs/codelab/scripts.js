const API_ROOT = "https://reqres.in/api/";
const api = name => API_ROOT + name;

let nbAttendees = 10,
	nbMaxAttendees = 30;

function fetchAttendees() {
	return fetch(api(`users?per_page=${nbAttendees}`))
		.then(res => res.json())
		.then(res => res.data || [])
}

function renderAttendees(attendees) {
	const section = document.getElementById("attendees");
	section.innerHTML = `
	<h1>Attendees: ${nbAttendees} / ${nbMaxAttendees}</h1>
	<ul>
		${attendees.map(user => `
		<li class='card'>
			<img src="${user.avatar}" alt="Avatar" class="avatar">
			<p>
				<span class="firstname">${user.first_name}</span>
				<br>
				<span class="lastname">${user.last_name}</span>
			</p>
		</li>
		`).join('')}
	</ul>
	`
	updateRegisterForm();
}

function updateRegisterForm() {
	const section = document.getElementById("register");
	const isFull = (nbAttendees >= nbMaxAttendees);
	section.querySelectorAll("input, button").forEach(elm => {
		elm.disabled = isFull
	});
	section.querySelector(".status").innerHTML = isFull ?
		`Sorry, this event is full.` :
		`Some places are still available for you to register for this event.`
}

document.addEventListener("DOMContentLoaded", () => {
	fetchAttendees().then(attendees => renderAttendees(attendees));

	//TODO: Etape 2 - Installation du Service Worker au chargement du document
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker
			.register('sw.js', {
				scope: '.' // <--- THIS BIT IS REQUIRED
			}).then(function (serviceWorker) {
				console.log('Service Worker registered: ' + serviceWorker);
			})
			.catch(function (error) {
				console.log('Error registering the Service Worker: ' + error);
			});
	}

	//TODO: Etape 4 - Réception de messages depuis le Service Worker
});