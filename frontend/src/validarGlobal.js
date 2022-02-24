export function objetoVazio(objeto) {
	return Object.keys(objeto).length === 0 && objeto.constructor === Object;
}

export function éNumero(valor) {
	return Number(valor);
}

export default { objetoVazio, éNumero };
