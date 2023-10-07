
/**
 * If value is true, return random array value,
 * else return random array index.
 * @param array 
 * @param value 
 * @returns 
 */
export const arrayRand = (array: any[], value = true) => {
    const index = Math.floor(Math.random()*array.length);

    if(!value) return index;
    else return array[index];
}