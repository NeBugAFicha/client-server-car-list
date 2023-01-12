export type Type = {
    findAll: {
        query: {
            sort: string,
            sortKind: 'ASC' | 'DESC'
        }
    },
    create: {
        body: {
            brand: number,
            name: string,
            prodYear: number,
            price: number
        },
    },
    delete: {
        params: {
            id: number,
        },
    },
}