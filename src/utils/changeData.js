const filterDataByPrice = (data, priceMin = 1, priceMax = 10000) => {
  return data.filter(
    (item) => item.price >= priceMin && item.price <= priceMax
  );
};

const filterDataByCategories = (data, categories) => {
  return data.filter(
    (item) =>
      item.category &&
      Array.isArray(item.category) &&
      categories.some((category) => item.category.includes(category))
  );
};

export { filterDataByPrice, filterDataByCategories };
