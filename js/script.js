// variables
const form = document.querySelector(".form");
const containerCard = document.querySelector(".container");
const formFilter = document.querySelector("#buscador");
const anio = document.querySelector(".year #year");
const marcas = document.querySelector(".marca #marca");
const precioMin = document.querySelector(".precio_min #minimo");
const precioMax = document.querySelector(".precio_max #maximo");
const puerta = document.querySelector(".puertas #puertas");
const transmision = document.querySelector(".transmision #transmision");
const color = document.querySelector(".Color #color");

const max = new Date().getFullYear();
const min = max - 10;

const infoBusqueda = {
  img: "",
  marca: "",
  year: "",
  minimo: "",
  maximo: "",
  puertas: "",
  transmision: "",
  color: "",
};

cargarEventListeners();
function cargarEventListeners() {
  // muestra el form de los filtros
  document.querySelector("#filter").onclick = () => {
    form.classList.toggle("active");
  };

  //   mostrando los autos
  mostrarAuto();

  //   llenando el select de year
  llenarSelectYear();

  //   llenando el select de marca
  llenarSelectMarca();

  //   llenando el precio minimo
  llenarSelectPrecioMinimo();

  //   llenando el precio maximo
  llenarSelectPrecioMaximo();

  //   llenando las puertas
  llenarSelectPuertas();

  //   llenar el select de transmision
  llenarSelectTransimision();

  //   llenar el select de color
  llenarSelectColor();

  //   aplicando filtros
  formFilter.addEventListener("change", (e) => {
    infoBusqueda[e.target.id] = e.target.value;

    filtrarAutos();
  });
}

// funciones
function mostrarAuto() {
  autos.forEach((auto) => {
    const { img, marca, modelo, year, precio, puertas, color, transmision } =
      auto;

    // creando el card
    const cardcar = document.createElement("div");
    cardcar.classList.add("card-car");

    // agregando el contenedor de la img
    const imgContent = document.createElement("div");
    imgContent.classList.add("img");

    // llenado de la imagen en el HTML
    const imagen = document.createElement("IMG");
    imagen.setAttribute("src", img);

    // agregando la img al contenedor
    imgContent.append(imagen);

    // creando el 'content' de las info
    const content = document.createElement("div");
    content.classList.add("content");

    // creando el contenedor de la izq
    const infoIzq = document.createElement("div");
    infoIzq.classList.add("info-izq");

    // creando la info para el izq
    const marcaP = document.createElement("p");
    marcaP.innerHTML = marca;
    const modeloP = document.createElement("p");
    modeloP.innerHTML = modelo;
    const yearP = document.createElement("p");
    yearP.innerHTML = year;
    const precioP = document.createElement("p");
    precioP.innerHTML = "$" + precio;

    // insertando los elementos en el izq
    infoIzq.append(marcaP, modeloP, yearP, precioP);

    const infoDer = document.createElement("DIV");
    infoDer.classList.add("info-der");

    // creando y agrengo la info para el izq
    const puertaP = document.createElement("p");
    puertaP.innerHTML = puertas;
    const colorP = document.createElement("p");
    colorP.innerHTML = color;
    const transimisionP = document.createElement("p");
    transimisionP.innerHTML = transmision;

    infoDer.append(puertaP, colorP, transimisionP);

    content.append(infoIzq, infoDer);

    cardcar.append(imgContent, content);

    containerCard.appendChild(cardcar);
  });
}

function llenarSelectYear() {
  for (let i = max; i >= min; i--) {
    const opc = document.createElement("option");
    opc.value = i;
    opc.textContent = i;
    anio.appendChild(opc);
  }
}

function llenarSelectMarca() {
  const marcasSet = new Set();
  for (let auto of autos) {
    marcasSet.add(auto.marca);
  }

  //   llenar el select con las marcas únicas
  for (const marca of marcasSet) {
    const opc = document.createElement("option");
    opc.value = marca;
    opc.textContent = marca;
    marcas.appendChild(opc);
  }
}

function llenarSelectPrecioMinimo() {
  const setPrecio = new Set();

  for (let precio of precioMini) {
    setPrecio.add(precio.precio);
  }

  for (const preciomin of setPrecio) {
    const opc = document.createElement("option");
    opc.value = preciomin;
    opc.textContent = preciomin;
    precioMin.appendChild(opc);
  }
}

// llenando el máximo price
function llenarSelectPrecioMaximo() {
  const setPrecio = new Set();

  for (let precio of precioMaxi) {
    setPrecio.add(precio.precio);
  }

  for (const preciomaxi of setPrecio) {
    const opc = document.createElement("option");
    opc.value = preciomaxi;
    opc.textContent = preciomaxi;
    precioMax.appendChild(opc);
  }
}

function llenarSelectPuertas() {
  const setPuerta = new Set();

  for (let puerta of autos) {
    setPuerta.add(puerta.puertas);
  }

  for (let puertaa of setPuerta) {
    const opc = document.createElement("option");
    opc.value = puertaa;
    opc.textContent = puertaa;
    puerta.appendChild(opc);
  }
}

function llenarSelectTransimision() {
  const setTransmision = new Set();

  for (let transmision of autos) {
    setTransmision.add(transmision.transmision);
  }

  for (let transm of setTransmision) {
    const opc = document.createElement("option");
    opc.value = transm;
    opc.textContent = transm;
    transmision.appendChild(opc);
  }
}

function llenarSelectColor() {
  const setColor = new Set();

  for (let color of autos) {
    setColor.add(color.color);
  }

  for (let colore of setColor) {
    const opc = document.createElement("option");
    opc.value = colore;
    opc.textContent = colore;
    color.appendChild(opc);
  }
}

function filtrarAutos() {
  const result = autos.filter(filtrarDatos);
  monstrarResultados(result);
}

function filtrarDatos(auto) {
  const { img, marca, year, minimo, maximo, puertas, transmision, color } =
    infoBusqueda;

  // verificamos cada criterio de búsqueda individualmente y los comparamos con el auto actual
  const cumpleImg = img === "" || auto.img === img;
  const cumpleMarca = marca === "" || auto.marca === marca;
  const cumpleYear = year === "" || auto.year === parseInt(year);
  const cumplePrecio =
    (minimo === "" || auto.precio >= parseInt(minimo)) &&
    (maximo === "" || auto.precio <= parseInt(maximo));
  const cumplePuertas = puertas === "" || auto.puertas === parseInt(puertas);
  const cumpleTransmision =
    transmision === "" || auto.transmision === transmision;
  const cumpleColor = color === "" || auto.color === color;

  //   luego se retorna todo los criterios si se llegan a cumplir
  return (
    cumpleImg &&
    cumpleMarca &&
    cumpleYear &&
    cumplePrecio &&
    cumplePuertas &&
    cumpleTransmision &&
    cumpleColor
  );
}

function monstrarResultados(result) {
  // limpiamos resultados anteriores
  containerCard.innerHTML = "";

  const mensaje = document.createElement("p");

  if (result.length === 0) {
    mensaje.textContent = "No se encontraron autos que cumplan con su criterio";
    mensaje.classList.add("mensaje");
  } else {
    result.forEach((auto) => {
      const { img, marca, modelo, year, precio, puertas, color, transmision } =
        auto;

      // creando el card
      const cardcar = document.createElement("div");
      cardcar.classList.add("card-car");

      // agregando el contenedor de la img
      const imgContent = document.createElement("div");
      imgContent.classList.add("img");

      // llenado de la imagen en el HTML
      const imagen = document.createElement("IMG");
      imagen.setAttribute("src", img);

      // agregando la img al contenedor
      imgContent.append(imagen);

      // creando el 'content' de las info
      const content = document.createElement("div");
      content.classList.add("content");

      // creando el contenedor de la izq
      const infoIzq = document.createElement("div");
      infoIzq.classList.add("info-izq");

      // creando la info para el izq
      const marcaP = document.createElement("p");
      marcaP.innerHTML = marca;
      const modeloP = document.createElement("p");
      modeloP.innerHTML = modelo;
      const yearP = document.createElement("p");
      yearP.innerHTML = year;
      const precioP = document.createElement("p");
      precioP.innerHTML = precio;

      // insertando los elementos en el izq
      infoIzq.append(marcaP, modeloP, yearP, precioP);

      const infoDer = document.createElement("DIV");
      infoDer.classList.add("info-der");

      // creando y agrengo la info para el izq
      const puertaP = document.createElement("p");
      puertaP.innerHTML = puertas;
      const colorP = document.createElement("p");
      colorP.innerHTML = color;
      const transimisionP = document.createElement("p");
      transimisionP.innerHTML = transmision;

      infoDer.append(puertaP, colorP, transimisionP);

      content.append(infoIzq, infoDer);

      cardcar.append(imgContent, content);

      containerCard.appendChild(cardcar);
    });
  }

  containerCard.appendChild(mensaje);
}
