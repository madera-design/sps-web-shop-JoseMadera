const BaseURL = 'https://api.escuelajs.co/api/v1/'

export const getProducts = async (limit = 0, offset = 0) =>{
    try {
        const response = await fetch(`${BaseURL}products?limit=${limit}&offset=${offset}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data
      } catch (error) {
        console.error('Error fetching products:', error);
      }
}

export const getCategories = async () =>{
  try {
      const response = await fetch(`${BaseURL}categories/`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      return data
    } catch (error) {
      console.error('Error fetching products:', error);
    }
}

export const getFilterProducts = async (title = '', minPrice = 0, maxPrice = 0) =>{
    try {
        const response = await fetch(`${BaseURL}products?title=${title}&price_min=${minPrice}&price_max=${maxPrice}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data
      } catch (error) {
        console.error('Error fetching products:', error);
      }
}

export const getFilterCategorieProducts = async (id) =>{
  try {
    const response = await fetch(`${BaseURL}categories/${id}/products?limit=10&offset=0`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

export const getAllProducts = async () =>{
  try {
    const response = await fetch(`${BaseURL}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}