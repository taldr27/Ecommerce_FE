const filterDataByPrice = (data, priceMin = 1, priceMax = 10000) => {

    return data.filter((item) => item.precio >= priceMin && item.precio <= priceMax);
}

const filterDataByCategories = (data, categories) => {

    return data.filter((item) => 
        item.categoria && Array.isArray(item.categoria) &&
        categories.some((category) => item.categoria.includes(category))
    );
}

export {
    filterDataByPrice,
    filterDataByCategories
}