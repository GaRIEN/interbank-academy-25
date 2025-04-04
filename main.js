const fs = require("fs"); // Para trabajar con el sistema de archivos
const path = require("path"); // Para manejar rutas de archivos

// Definimos la ruta del archivo CSV
const FILE_PATH = path.join(__dirname, "data.csv");

// Función principal que procesa las transacciones del archivo CSV
function procesarTransacciones(filePath) {
  try {
    // Leemos el archivo CSV completo como texto
    const data = fs.readFileSync(filePath, "utf-8");

    // Dividimos el contenido en líneas y eliminamos espacios extra
    const lineas = data.trim().split("\n");

    // Ignoramos la primera línea (cabecera) y procesamos el resto
    const transacciones = lineas.slice(1).map((linea) => {
      const [id, tipo, monto] = linea.split(",");
      // Convertimos los valores a los tipos adecuados
      return { id: parseInt(id), tipo: tipo.trim(), monto: parseFloat(monto) };
    });

    // Inicializamos variables para el balance total, la transacción de mayor monto y el conteo por tipo
    let balance = 0;
    let transaccionMayor = { id: null, monto: 0 };
    let conteo = { Crédito: 0, Débito: 0 };

    // Recorremos todas las transacciones para procesar la información
    transacciones.forEach(({ id, tipo, monto }) => {
      // Sumamos o restamos el monto según el tipo de transacción
      if (tipo === "Crédito") {
        balance += monto;
        conteo.Crédito++;
      } else if (tipo === "Débito") {
        balance -= monto;
        conteo.Débito++;
      }

      // Verificamos si esta es la transacción de mayor monto
      if (monto > transaccionMayor.monto) {
        transaccionMayor = { id, monto };
      }
    });

    // Mostramos los resultados 
    console.log("Reporte de Transacciones");
    console.log("---------------------------------------------");
    console.log(`Balance Final: ${balance.toFixed(2)}`);
    console.log(
      `Transacción de Mayor Monto: ID ${
        transaccionMayor.id
      } - ${transaccionMayor.monto.toFixed(2)}`
    );
    console.log(
      `Conteo de Transacciones: Crédito: ${conteo.Crédito} Débito: ${conteo.Débito}`
    );
  } catch (error) {
    // Capturamos y mostramos cualquier error 
    console.error("Error al leer el archivo:", error.message);
  }
}

// Llamamos a la función pasando la ruta del archivo CSV
procesarTransacciones(FILE_PATH);
