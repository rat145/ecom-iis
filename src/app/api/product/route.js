import product from './product.json'
import { NextResponse } from "next/server";

export async function GET(request) {

    const searchParams = request?.nextUrl?.searchParams
    const queryCategory = searchParams.get('category')
    const querySortBy = searchParams.get('sortBy')
    const querySearch = searchParams.get('search')
    let products = product?.data || []
    // Note:- we have covered only few filters as demo purpose

    if (querySortBy || queryCategory || querySearch) {
        products = product?.data?.filter(product => (
            queryCategory && product?.categories?.length &&
            product?.categories?.some(category => queryCategory?.split(',')?.includes(category.slug))
        ))
        products = products.length ? products : product?.data;

        if (querySortBy === 'asc') {
            products = products.sort((a, b) => {
                if (a.id < b.id) {
                    return -1;
                } else if (a.id > b.id) {
                    return 1;
                }
                return 0;
            })
        } else if (querySortBy === 'desc') {
            products = products.sort((a, b) => {
                if (a.id > b.id) {
                    return -1;
                } else if (a.id < b.id) {
                    return 1;
                }
                return 0;
            })
        } else if (querySortBy === 'a-z') {
            products = products.sort((a, b) => {
                if (a.name < b.name) {
                    return -1;
                } else if (a.name > b.name) {
                    return 1;
                }
                return 0;
            })
        } else if (querySortBy === 'z-a') {
            products = products.sort((a, b) => {
                if (a.name > b.name) {
                    return -1;
                } else if (a.name < b.name) {
                    return 1;
                }
                return 0;
            })
        } else if (querySortBy === 'low-high') {
            products = products.sort((a, b) => {
                if (a.sale_price < b.sale_price) {
                    return -1;
                } else if (a.price > b.price) {
                    return 1;
                }
                return 0;
            })
        } else if (querySortBy === 'high-low') {
            products = products.sort((a, b) => {
                if (a.sale_price > b.sale_price) {
                    return -1;
                } else if (a.price < b.price) {
                    return 1;
                }
                return 0;
            })
        }

        if (querySearch) {
            products = products.filter(product => product.name.toLowerCase().includes(querySearch.toLowerCase()))
        }
    }


    products = products?.length ? products : product?.data;
    return NextResponse.json(products)
}