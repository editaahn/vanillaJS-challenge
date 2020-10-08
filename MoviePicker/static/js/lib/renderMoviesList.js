//render options
export const renderMoviesList = (list,movieSelector) => {
  movieSelector.innerHTML = '';
  list.forEach((v,i)=> {
    const opt = document.createElement('option')
    opt.value = i
    opt.text = 
    `${v.title} (${v.ageLimit ? v.ageLimit+'세' : '전체'} 관람가, ${v.price}원)`;
    movieSelector.add(opt)
  });
}