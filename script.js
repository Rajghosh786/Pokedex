const searchbar = document.querySelector('.searchbar')
const searchbtn = document.querySelector('.searchbtn')

const p_image = document.querySelector('.image')
const p_name = document.querySelector('.name')
const p_abilities = document.querySelector('.abilities')
const p_cries = document.querySelector('.cries')
const p_height = document.querySelector('.heights')
const p_baseexperience = document.querySelector('.baseexperience')
const p_id = document.querySelector('.id')
const p_stats = document.querySelector('.stats')
const p_types = document.querySelector('.types')
const p_weight = document.querySelector('.weight')
const divcontainer = document.querySelector('.divcontainer')
const unorderlist = document.querySelector('.unorderlist')


window.addEventListener('load',loaded)
    function loaded(){
    fetch(`https://pokeapi.co/api/v2/pokemon/?limit=1302`)
        .then(response => response.json())
        .then(data => {        
            const pokemonlist = data.results
            const random = Math.floor(Math.random() * pokemonlist.length)
            const randompokemon = pokemonlist[random]
            const randomname = randompokemon.name
            // console.log(randomname)
            searchbar.value = randomname
           
                fetch(`https://pokeapi.co/api/v2/pokemon/${randomname}`)
                .then(response => response.json())
                // .then(data => console.log(data))
                searchbtn.click()
        })
}


searchbar.addEventListener('keyup',function(key){
    if(key.which === 13 && searchbar.value){       
        fetching()
    }
})

searchbtn.addEventListener('click',function(){
    if(searchbar.value){
        divcontainer.classList.remove('divcontainerunhide')
        fetching()        
    }
})

function fetching(){
    const pokesearch = searchbar.value
    // console.log(pokesearch)
	searchbar.value = ''
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokesearch}`)
        .then(response => response.json())
        .then(data => {
            // console.log(data.forms[0])
            // console.log(data)

            const {name} = data.forms[0];

            const {id, height,weight,base_experience} = data

            p_name.textContent = name
            p_height.textContent = height
            p_weight.textContent = weight
            p_image.src = data.sprites.other['official-artwork'].front_default
            p_types.textContent = data.types[0].type.name
            ;
            // p_types1.textContent = data.types[1].type.name
            // ;
            // p_id.textContent = id;
            p_baseexperience.textContent = base_experience;
            p_abilities.textContent = data.abilities[0].ability.name;
            p_stats.textContent = data.stats[0].base_stat;
            color()
            uppercase()
        })
    }


const color = () =>{
    const main = document.querySelector('.main')
    if(p_types.textContent === 'normal'){
        main.style.background = "white"
        searchbar.style.border = "2px solid black"
        searchbtn.style.border = "2px solid black"
    }if(p_types.textContent === 'fire'){
        main.style.background = "linear-gradient(-30deg, white 50%, red 50%)"
    }if(p_types.textContent === 'water'){
        main.style.background = "#81cffc"
    }if(p_types.textContent === 'electric'){
        main.style.background = "#f4dc26"
    }if(p_types.textContent === 'rock'){
        main.style.background = "grey"
    }if(p_types.textContent === 'poison'){
        main.style.background = "#985fd4"
    }if(p_types.textContent === 'fighting'){
        main.style.background = "#d49b5f"
    }if(p_types.textContent === 'ground'){
        main.style.background = "#45290c"
    }if(p_types.textContent === 'ice'){
        main.style.background = "#b9e8ea"
    }if(p_types.textContent === 'psychic'){
        main.style.background = "#875575"
    }if(p_types.textContent === 'ghost'){
        main.style.background = "purple"
    }if(p_types.textContent === 'dark'){
        main.style.background = "#132e15"
    }if(p_types.textContent === 'grass' || p_types.textContent === 'grass'){
        main.style.background = "green"
    }if(p_types.textContent === 'fairy'){
        main.style.background = "lightpink"
    }if(p_types.textContent === 'steel'){
        main.style.background = "#e0e5e5"
    }if(p_types.textContent === 'dragon'){
        main.style.background = "#d8c266"
    }
}
function uppercase(){
    p_types.textContent = p_types.textContent.toUpperCase();
    p_abilities.textContent = p_abilities.textContent.toUpperCase();
    p_name.textContent = p_name.textContent.toUpperCase()
}

searchbar.addEventListener('keyup',filtering)
    
function filtering() {
        fetch('https://pokeapi.co/api/v2/pokemon/?limit=1302')
        .then(resp => resp.json())
        .then(data => {           
            const onlynames = data.results
            const searchvalue = searchbar.value
            let result = []
            result = onlynames.filter(e=>{
                // console.log(e.name)
                const naming = e.name
                return naming.toLowerCase().includes(searchvalue.toLowerCase())
            })
            mapfiltering(result)
        })
    }
    function mapfiltering(rec){
        const searchvalue = searchbar.value;
        if(searchvalue === ''){
            divcontainer.classList.remove('divcontainerunhide')
        }
        divcontainer.classList.add('divcontainerunhide')
        divcontainer.innerHTML = '';
    rec.map(e => {
       const list = document.createElement('li')
        list.classList.add('list')
        list.textContent = e.name  
        divcontainer.appendChild(list)
        list.addEventListener('click',function(){
            searchbar.value = list.textContent;            
            searchbtn.click();
            divcontainer.classList.remove('divcontainerunhide')
            
          })        
})

}



