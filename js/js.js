//definicion de variables
let botonMaso1 = document.querySelector("#maso_1"); //elegir tipo de maso
let botonMaso2 = document.querySelector("#maso_2"); //elegir tipo de maso
let botonMaso3 = document.querySelector("#maso_3"); //elegir tipo de maso
let botonTirada1 = document.querySelector("#tirada_1"); //elegir tirada
let botonTirada2 = document.querySelector("#tirada_2"); //elegir tirada
let botonRepartir = document.querySelector("#repartir"); //repartir el maso
let botonElegir = document.querySelector("#elegir"); //seleccionar carta individualmente
let botonMezclar = document.querySelector("#mezclar"); //hacer una tirada con cartas aleatorias o mezclar el maso
let botonLimpiar = document.querySelector("#limpiar"); //limpiar el tablero
let botonGirar = document.querySelector("#girar"); //girar todas las cartas en el tablero
let tablero = document.getElementById("container"); //tablero contenedor de cartas
let inputTirada1 = document.querySelector("#content_tirada1");
let inputTirada2 = document.querySelector("#content_tirada2");

//creación del objeto maso
let maso = {
	tipo: "",
	cantidadMaso: 0,
	cantidadTirada: 0,
	tirada: "",
	cartas: [],
	armarMaso() {
		aplicarClass();
		let cartas = "";
		for (let i = 1; i < maso.cantidadTirada + 1; i++) {
			cartas = `
				<div class="card_${maso.tipo} ${maso.tipo}_${
				maso.tirada
			}" name="carta" id="card_${i}">
					<div class="card__back ${maso.tirada}" style="--img: url(../img/${
				maso.tipo
			}/back.jpg);" id="_${i}">${i}</div>
					<div class="card__front ${maso.tirada}" style="--img: url(../img/${maso.tipo}/${
				maso.cartas[i - 1]
			}.jpg);" id="carta_${i}"><div class="baner"></div></div>
				</div>${cartas}`;
			tablero.innerHTML = cartas;
		}
		botonMaso1.classList.remove("selected");
		botonMaso2.classList.remove("selected");
		botonMaso3.classList.remove("selected");
		botonMezclar.classList.remove("selected");
	},
};

//funciones de escucha
botonMaso1.addEventListener("click", maso1);
botonMaso2.addEventListener("click", maso2);
botonMaso3.addEventListener("click", maso3);
botonTirada1.addEventListener("click", tirada_1);
botonTirada2.addEventListener("click", tirada_2);
botonRepartir.addEventListener("click", repartir);
botonElegir.addEventListener("click", elegir);
botonMezclar.addEventListener("click", mezclar);
botonLimpiar.addEventListener("click", limpiar);
botonGirar.addEventListener("click", girar);
tablero.addEventListener("click", seleccionarCarta);

//funciones para armar distintos masos
function maso1() {
	botonMaso2.classList.remove("selected");
	botonMaso3.classList.remove("selected");
	botonMaso1.classList.toggle("selected");
	maso.tipo = "maso_1";
	maso.tirada = "completo";
	maso.cantidadMaso = 65;
	maso.cantidadTirada = 65;
	maso.cartas = [];
	for (let i = 0; i < maso.cantidadMaso; i++) {
		maso.cartas[i] = i + 1;
	}
}
function maso2() {
	botonMaso1.classList.remove("selected");
	botonMaso3.classList.remove("selected");
	botonMaso2.classList.toggle("selected");
	maso.tipo = "maso_2";
	maso.tirada = "completo";
	maso.cantidadMaso = 80;
	maso.cantidadTirada = 80;
	maso.cartas = [];
	for (let i = 0; i < maso.cantidadMaso; i++) {
		maso.cartas[i] = i + 1;
	}
}
function maso3() {
	botonMaso1.classList.remove("selected");
	botonMaso2.classList.remove("selected");
	botonMaso3.classList.toggle("selected");
	maso.tipo = "maso_3";
	maso.tirada = "completo";
	maso.cantidadMaso = 20;
	maso.cantidadTirada = 20;
	maso.cartas = [];
	for (let i = 0; i < maso.cantidadMaso; i++) {
		maso.cartas[i] = i + 1;
	}
}
//función para girar todas las cartas que esten repartidas en el tablero
function girar() {
	let carta = document.getElementsByName("carta");
	for (let i = 0; i < maso.cantidadTirada + 1; i++) {
		carta[i].classList.toggle("girado");
	}
}
//funciones para configurar las distintas tiradas
function tirada_1() {
	botonTirada2.classList.remove("selected");
	botonTirada1.classList.toggle("selected");
	maso.cantidadTirada = 3;
	maso.tirada = "tirada_1";
}
function tirada_2() {
	botonTirada1.classList.remove("selected");
	botonTirada2.classList.toggle("selected");
	maso.cantidadTirada = 6;
	maso.tirada = "tirada_2";
}
//funciones para repartir el maso
function repartir() {
	maso.armarMaso();
	botonTirada1.classList.remove("selected");
	botonTirada2.classList.remove("selected");
}
function elegir() {
	botonMezclar.classList.remove("selected");
	botonElegir.classList.toggle("selected");
	maso.tirada = "completo";
	maso.cantidadTirada = maso.cantidadMaso;
	maso.armarMaso();
	maso.cartas = [];
}
function mezclar() {
	botonElegir.classList.remove("selected");
	botonMezclar.classList.toggle("selected");
	for (let i = 0; i < maso.cantidadTirada; i++) {
		let aux = Math.floor(Math.random() * (maso.cantidadMaso - 1) + 1);
		maso.cartas[i] = aux;
	}
}
//función para aplicar las clases correspondientes al tablero de acuerdo ala tirada seleccionada
function aplicarClass() {
	tablero.classList.remove(
		"container_tirada_1_maso_1",
		"container_tirada_1_maso_2",
		"container_tirada_1_maso_3",
		"container_tirada_2_maso_1",
		"container_tirada_2_maso_2",
		"container_tirada_2_maso_3",
		"container_completo_maso_1",
		"container_completo_maso_2",
		"container_completo_maso_3"
	);
	tablero.classList.add(`container_${maso.tirada}_${maso.tipo}`);
	mostrarInputs();
}
//funcion para seleccionar y agrandar cartas
function seleccionarCarta(e) {
	console.log(e.target);
	//pregunta si el click se hizo click sobre una carta
	if (e.target.classList.contains("card__back", "card__front")) {
		let carta = document.querySelector(`#${e.target.id}`); //trae la información de la carta selecionada
		let cartaSeleccionada = document.querySelector(`#card${carta.id}`);
		let cartaSeleccionadaClass = cartaSeleccionada.classList.contains("selected");
		if (botonElegir.classList.value == "selected") {
			cartaSeleccionada.classList.toggle("selected");
			if (cartaSeleccionadaClass) {
				let cartaIndex = maso.cartas.indexOf(cartaSeleccionada.textContent.trim());
				maso.cartas.splice(cartaIndex, 1);
			} else if (maso.cartas.length < maso.cantidadTirada) {
				maso.cartas.push(cartaSeleccionada.id.slice(5));
			}
			if (botonTirada1.classList.value == "selected") {
				maso.tirada = "tirada_1";
				maso.cantidadTirada = 3;
			}
			if (botonTirada2.classList.value == "selected") {
				maso.tirada = "tirada_2";
				maso.cantidadTirada = 6;
			}
			if (maso.cartas.length == maso.cantidadTirada) {
				mostrarInputs();
				botonElegir.classList.remove("selected");
				botonTirada1.classList.remove("selected");
				botonTirada2.classList.remove("selected");
				maso.armarMaso();
			}
		} else if (cartaSeleccionadaClass !== true) {
			mostrarGrande(cartaSeleccionada);
		}
	}
}

function mostrarGrande(carta) {
	carta.classList.toggle(`agrandar_${maso.tipo}`);
}
function limpiar() {
	tablero.innerHTML = ``;
	tablero.classList.remove(
		"container_maso_1",
		"container_maso_2",
		"container_maso_3",
		"completo",
		"tirada_1",
		"tirada_2"
	);
	inputTirada1.classList.remove("content_tirada1");
	inputTirada2.classList.remove("content_tirada2");
	botonMaso1.classList.remove("selected");
	botonMaso2.classList.remove("selected");
	botonMaso3.classList.remove("selected");
	botonTirada1.classList.remove("selected");
	botonTirada2.classList.remove("selected");
	botonElegir.classList.remove("selected");
	botonMezclar.classList.remove("selected");
}
function mostrarInputs() {
	botonTirada1.classList.contains("selected")
		? inputTirada1.classList.add("content_tirada1_visible")
		: botonTirada2.classList.contains("selected")
		? inputTirada2.classList.add("content_tirada2_visible")
		: "ninguna seleccionada";
}
