document.addEventListener("DOMContentLoaded", function () {
    const factura = document.getElementById("factura");
    const total = document.getElementById("total");
    const agregarItemBtn = document.getElementById("agregarItem");
    const cliente = document.getElementById("cliente");
    const resetearBtn = document.getElementById("resetear");
    const exportarCSVBtn = document.getElementById("exportarCSV");

    agregarItemBtn.addEventListener("click", agregarItem);

    function agregarItem() {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td><input type="number" class="cantidad" value="1"></td>
            <td><input type="text" class="descripcion" value="Descripción del producto"></td>
            <td><input type="number" class="precio" value="0.00"></td>
            <td><button class="eliminarItem">Eliminar</button></td>
        `;
        factura.appendChild(row);

        const inputs = row.querySelectorAll("input");
        inputs.forEach(input => {
            input.addEventListener("input", calcularTotal);
        });

        const deleteButton = row.querySelector(".eliminarItem");
        deleteButton.addEventListener("click", eliminarItem);

        calcularTotal();
    }

    function eliminarItem(event) {
        const fila = event.target.closest("tr");
        fila.remove();
        calcularTotal();
    }

    function calcularTotal() {
        const filas = factura.querySelectorAll("tr");
        let totalFactura = 0;

        filas.forEach(fila => {
            const cantidad = parseFloat(fila.querySelector(".cantidad").value);
            const precio = parseFloat(fila.querySelector(".precio").value);
            totalFactura += cantidad * precio;
        });

        total.textContent = `Total: $${totalFactura.toFixed(2)}`;
    }

    cliente.addEventListener("input", function () {
        const nombreCliente = cliente.textContent;
        document.title = `Ventas Hexagonian - ${nombreCliente}`;
    });

    resetearBtn.addEventListener("click", function () {
        factura.innerHTML = '';
        total.textContent = 'Total: $0.00';
        cliente.textContent = 'Escribe el nombre del cliente';
        document.title = 'Ventas Hexagonian';
    });

    exportarCSVBtn.addEventListener("click", exportarCSV);

    function exportarCSV() {
        const filas = factura.querySelectorAll("tr");
        let csv = 'Cantidad,Descripción,Precio\n';

        filas.forEach(fila => {
            const cantidad = fila.querySelector(".cantidad").value;
            const descripcion = fila.querySelector(".descripcion").value;
            const precio = fila.querySelector(".precio").value;
            csv += `${cantidad},"${descripcion}",${precio}\n`;
        });

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'factura.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
});
