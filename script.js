function drawSheetName(searchTerm = '') {
  let queryString = 'SELECT A, B, C';
  const query = new google.visualization.Query(
    'https://docs.google.com/spreadsheets/d/1e2ATE15gsPn9RFk7aGmcPmi2yH2l1w4kQBYKritBnEk/edit?usp=sharing'
  );
  query.send(response => handleQueryResponse(response, searchTerm));
}

function handleQueryResponse(response, searchTerm) {
  if (response.isError()) {
    console.error('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
    return;
  }

  const data = response.getDataTable();
  const controlDeInventario = document.getElementById('control-de-inventario');
  controlDeInventario.innerHTML = '';

  let found = false;

  for (let i = 0; i < data.getNumberOfRows(); i++) {
    const nombre = data.getValue(i, 0);
    const numero = data.getValue(i, 1);
    const descripcion = data.getValue(i, 2);

    // Convertir valores a cadena y manejar valores null
    const nombreStr = nombre ? nombre.toString().toLowerCase() : '';
    const numeroStr = numero ? numero.toString().toLowerCase() : '';
    const descripcionStr = descripcion ? descripcion.toString().toLowerCase() : '';

    if (
      searchTerm &&
      !nombreStr.includes(searchTerm.toLowerCase()) &&
      !numeroStr.includes(searchTerm.toLowerCase()) &&
      !descripcionStr.includes(searchTerm.toLowerCase())
    ) {
      continue;
    }

    found = true;
    const card = document.createElement('div');
    card.className = 'card';

    const details = document.createElement('div');
    details.className = 'card-details';

    const nombreDiv = document.createElement('div');
    nombreDiv.textContent = `Nombre: ${nombre}`;

    const numeroDiv = document.createElement('div');
    numeroDiv.textContent = `Número: ${numero}`;

    const descripcionDiv = document.createElement('div');
    descripcionDiv.textContent = `Descripción: ${descripcion}`;

    details.appendChild(nombreDiv);
    details.appendChild(numeroDiv);
    details.appendChild(descripcionDiv);
    card.appendChild(details);
    controlDeInventario.appendChild(card);
  }

  if (!found) {
    alert('No se encuentra el item');
  }
}

google.charts.load('current', { 'packages': ['corechart', 'table'] });
google.charts.setOnLoadCallback(() => drawSheetName());