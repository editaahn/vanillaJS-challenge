// - [ ] 엔터 시 검색 실행
const searchBtn = document.getElementById('search');
const keyword = document.getElementById('keyword');
const listContainer = document.getElementById('listContainer');
const announce = document.getElementById('announce');
const articleContainer = document.getElementById('articleContainer');


let state = [];

searchBtn.addEventListener('click', e => makeList() );
keyword.addEventListener('keyup', e => e.keyCode == 13 && makeList() );

listContainer.addEventListener('click', e => 
  e.target.className == 'toClick' && renderRecipe(e.target.parentNode.id) 
);

listContainer.addEventListener('mouseover', e => {
  e.target.className == 'toHover' && e.target.classList.toggle('on')
});


// - [ ] API연결: input value를 쿼리에 넣어서 GET 방식으로 fetch
const makeList = () => {
  listContainer.innerHTML = '';
  articleContainer.innerHTML = '';
  announce.style.display = 'none';

  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword.value}`)
    .then(res => {
      if (res.status >= 200 && res.status < 300) return res.json();
      else return Promise.reject(new Error('검색에 실패했습니다.')); 
    })
    .then(data => {
      if (data.meals) {
        const list = document.createElement('ul')
        data.meals.sort().forEach((v,i) => {
          list.innerHTML += `
            <li id=${v.idMeal}><span class="toClick">${v.strMeal}</span><img src="${v.strMealThumb}" alt=${v.strMeal} class="toHover"></li>`
          listContainer.append(list);
          keyword.value = '';
        })
      } else {
        listContainer.innerHTML += '<p>검색결과가 없습니다.</p>'
      }
    })
    .catch(e => {
      console.log(e)
    });
}

const renderRecipe = (id) => {
  articleContainer.innerHTML = '';
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(res => {
      if (res.status >= 200 && res.status < 300) return res.json();
      else return Promise.reject(new Error('검색에 실패했습니다.')); 
    })
    .then(data => {
      const result = data.meals[0]
      articleContainer.innerHTML += `
        <div class="recipeInfo">
          <h2>${result.strMeal}</h2>
          <img src="${result.strMealThumb}" alt="${result.strMeal}">
          <small>종류: ${result.strCategory}</small><br/>
          <small>지역: ${result.strArea}</small>
        </div>
        <div class="recipeIngredients">
          <h3>Ingredients</h3>
          <ul>${MakeIngrdntsOl(result)}</ul>
        </div>
        <div class="recipeArticle">
          <h3>Recipe</h3>
          <ol>${makeArticleOl(result.strInstructions)}</ol>
        </div>
        `
    })
}

const makeArticleOl = instructions => {
  return instructions.split('. ').map(v => `<li>${v}</li>`).join('')
};
const MakeIngrdntsOl = obj => {
  const newArr = Object.keys(obj).reduce((acc,prop) => {
    if (prop.search('strIngredient') > -1 && obj[prop] !== "") {
      measure = 'strMeasure' + prop.charAt(prop.length-1)
      acc.push(`${obj[prop]} ${obj[measure]}`)
    } 
    return acc
  }, [])
  return newArr.map(v => `<li>${v}</li>`).join('')
};