const wildcard = (req = request, res = response) => {
const resultado = `404 | Pagina no encontrada`;
res.status(404).json(resultado);
}

module.exports={
    wildcard
}