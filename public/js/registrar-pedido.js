
document.addEventListener('DOMContentLoaded', function () {

    (async function Load() {
        const elems = document.querySelectorAll('.modal')
        const instanceModal = M.Modal.init(elems)

        document.querySelector("#agregar-producto").addEventListener('click', function () {
            const content = document.querySelector("#detalle tbody").innerHTML

            let count = document.querySelectorAll("#detalle tbody tr").length
            count += 1
            const nuevaFila = `<td>${count}</td>
            <td>
                <div class='input-field' style='margin-right: 10px;'>
                    <input type="text" id="nompro" name="nompro" value="">
                    <input type="hidden" id="idProducto" value="">
                </div>
            </td>
            <td>
                        <div class='input-field' style='margin-right: 10px;'>
                            <input type="number" id="cantidad" name="cantidad" value="">
                        </div>
                    </td>
                    <td>
                        <div class="input-field input-field-select">
                            <select id="empresa" name="empresa" class="browser-default">
                                <option value="" disabled="" selected="">--</option>
                                <option value="" selected="true">122 PU</option>
                            </select>
                        </div>
                    </td>
                    <td>
                        <div class='input-field' style='margin-right: 10px;'>
                            <input type="number" id="total" name="total" step="0.01" value="">
                        </div>
                    </td>
                    <td>
                        <div class='input-field' style='margin-right: 10px;'>
                            <input type="number" id="desc" name="desc" step="0.01" value="">
                        </div>
                    </td>
                    <td>
                        <button class="btn-small waves-effect red lighten-2" type="submit" name="action"> Eliminar
                            <i class="material-icons left">delete</i>
                        </button>
                    </td>
            `
            document.querySelector("#detalle tbody").innerHTML = content + nuevaFila
        })



    })()
})

