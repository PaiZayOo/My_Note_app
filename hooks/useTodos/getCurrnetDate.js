export const getCurrentDate = () =>{
    const currentDate = new Date();
    const day = currentDate.getDate();
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    const seconds = currentDate.getSeconds();
  
    return `${day}, ${month}, ${year} | ${hours}:${minutes}:${seconds}`;
  }