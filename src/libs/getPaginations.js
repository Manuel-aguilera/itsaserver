export const getPagination = (page, size) => {
    const limit = size ? +size : 3; //limite de documentos (objetos) por pagina
    const offset = page ? page * limit : 0;
    return {limit, offset};
}